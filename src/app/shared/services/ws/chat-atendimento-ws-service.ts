/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { inject, Injectable, NgZone } from '@angular/core';
import { environment } from '../../../core/environments/environment-dev';
import { TokenService } from '../../../core/services/token-service';
import type { StompSubscription } from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import type {
  MensagemAtendimento,
  StatusAtendimentoEvento,
} from '../../models/ChatModels';

@Injectable({
  providedIn: 'root',
})
export class ChatAtendimentoWsService {
  private tokenService = inject(TokenService);
  private zone = inject(NgZone);
  private env = environment;

  private client?: Client;
  private conectado = false;
  private idChatAtual: number | null = null;
  private assinatura?: StompSubscription;
  private assinaturaStatus?: StompSubscription;

  // Fonte única de verdade das mensagens do chat aberto (como o notificacoes$).
  private mensagensSubject = new BehaviorSubject<MensagemAtendimento[]>([]);
  mensagens$ = this.mensagensSubject.asObservable();

  // Emite sempre que o atendimento aberto muda de status (aceito/finalizado),
  // permitindo que cliente e atendente reajam em tempo real, sem reload.
  private statusSubject = new BehaviorSubject<StatusAtendimentoEvento | null>(
    null,
  );
  status$ = this.statusSubject.asObservable();

  connect(): void {
    if (this.client) return; // já criado e ativo -> não recria (evita conexões duplicadas)

    const token = this.tokenService.getToken;

    this.client = new Client({
      webSocketFactory: () => new SockJS(`${this.env.api}/ws/chat-atendimento`),
      reconnectDelay: 5000,
      connectHeaders: { Authorization: `Bearer ${token}` },
    });

    this.client.onConnect = () => {
      this.conectado = true;
      // (re)assina o chat atual assim que a conexão estiver pronta
      if (this.idChatAtual != null) this.assinarTopicos(this.idChatAtual);
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

  /** Abre um chat: semeia o histórico e assina os tópicos de mensagens e de status. */
  abrirChat(
    idChat: number,
    historico: MensagemAtendimento[] = [],
    primeiraMensagem?: MensagemAtendimento,
  ): void {
    this.idChatAtual = idChat;
    this.mensagensSubject.next(historico);
    this.statusSubject.next(null);
    if (this.conectado) this.assinarTopicos(idChat, primeiraMensagem);
    if (primeiraMensagem != null)
      this.mensagensSubject.value.unshift(primeiraMensagem);
  }

  private assinarTopicos(
    idChat: number,
    primeiraMensagem?: MensagemAtendimento,
  ): void {
    this.assinarMensagens(idChat, primeiraMensagem);
    this.assinarStatus(idChat);
  }

  private assinarMensagens(
    idChat: number,
    primeiraMensagem?: MensagemAtendimento,
  ): void {
    this.assinatura?.unsubscribe();
    this.assinatura = this.client?.subscribe(
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

  /**
   * Assina o tópico de status do atendimento: é o que avisa o cliente quando o
   * atendente aceita (status vira EM_ANDAMENTO) e avisa o atendente quando o
   * cliente finaliza (status vira FINALIZADO) — tudo em tempo real.
   */
  private assinarStatus(idChat: number): void {
    this.assinaturaStatus?.unsubscribe();
    this.assinaturaStatus = this.client?.subscribe(
      `/topic/chat-atendimento/status/${idChat}`,
      (frame) => {
        const evento = JSON.parse(frame.body) as StatusAtendimentoEvento;
        this.zone.run(() => this.statusSubject.next(evento));
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
    this.assinaturaStatus?.unsubscribe();
    this.client?.deactivate();
    this.conectado = false;
    this.idChatAtual = null;
    // Sem isso, connect() nunca recriava o client após um disconnect (guard
    // "if (this.client) return"), obrigando a recarregar a aplicação para
    // conseguir enviar mensagens de novo.
    this.client = undefined;
  }
}
