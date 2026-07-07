/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { inject, Injectable, NgZone } from '@angular/core';
import { environment } from '../../../core/environments/environment-dev';
import { TokenService } from '../../../core/services/token-service';
import type { StompSubscription } from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import type { MensagemAtendimento } from '../../models/ChatModels';

@Injectable({
  providedIn: 'root',
})
export class ChatAtendimentoWsService {
  private tokenService = inject(TokenService);
  private zone = inject(NgZone);
  private env = environment;

  private client!: Client;
  private conectado = false;
  private idChatAtual: number | null = null;
  private assinatura?: StompSubscription;

  // Fonte única de verdade das mensagens do chat aberto (como o notificacoes$).
  private mensagensSubject = new BehaviorSubject<MensagemAtendimento[]>([]);
  mensagens$ = this.mensagensSubject.asObservable();

  connect(): void {
    if (this.client) return; // já criado -> não recria (evita conexões duplicadas)

    const token = this.tokenService.getToken;

    this.client = new Client({
      webSocketFactory: () => new SockJS(`${this.env.api}/ws/chat-atendimento`),
      reconnectDelay: 5000,
      connectHeaders: { Authorization: `Bearer ${token}` },
    });

    this.client.onConnect = () => {
      this.conectado = true;
      // (re)assina o chat atual assim que a conexão estiver pronta
      if (this.idChatAtual != null) this.assinarTopico(this.idChatAtual);
    };

    // Se a inscrição for recusada pelo back, o erro aparece aqui.
    this.client.onStompError = (frame) =>
      console.error(
        'STOMP erro (chat-atendimento):',
        frame.headers['message'],
        frame.body,
      );

    this.client.activate();
  }

  /** Abre um chat: semeia o histórico e assina o tópico. */
  abrirChat(
    idChat: number,
    historico: MensagemAtendimento[] = [],
    primeiraMensagem?: MensagemAtendimento,
  ): void {
    this.idChatAtual = idChat;
    this.mensagensSubject.next(historico);
    if (this.conectado) this.assinarTopico(idChat, primeiraMensagem);
    if (primeiraMensagem != null)
      this.mensagensSubject.value.unshift(primeiraMensagem);
  }

  private assinarTopico(
    idChat: number,
    primeiraMensagem?: MensagemAtendimento,
  ): void {
    this.assinatura?.unsubscribe();
    this.assinatura = this.client.subscribe(
      `/topic/chat-atendimento/${idChat}`,
      (frame) => {
        const msg = JSON.parse(frame.body) as MensagemAtendimento;
        const idLogado = this.tokenService.getTokenPayload?.idUsuario ?? null;
        msg.enviadoPorVoce = idLogado != null && msg.remetenteId === idLogado;
        if (primeiraMensagem != undefined) {
          this.zone.run(() =>
            this.mensagensSubject.next([
              ...this.mensagensSubject.value,
              msg,
              primeiraMensagem,
            ]),
          );
        } else {
          this.zone.run(() =>
            this.mensagensSubject.next([...this.mensagensSubject.value, msg]),
          );
        }
      },
    );
  }

  enviar(payload: {
    idChat: number | null;
    idDestinatario: number;
    mensagem: string;
  }): void {
    if (!payload.mensagem?.trim()) return;
    if (!this.client?.connected) {
      console.warn('WebSocket do chat atendimento ainda não conectado.');
      return;
    }
    this.client.publish({
      destination: '/app/chat-atendimento/send',
      body: JSON.stringify(payload),
    });
  }

  disconnect(): void {
    this.assinatura?.unsubscribe();
    this.client?.deactivate();
    this.conectado = false;
  }
}
