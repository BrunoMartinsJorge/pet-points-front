/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { inject, Injectable, NgZone } from '@angular/core';
import { Client, type StompSubscription } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import SockJS from 'sockjs-client';
import { environment } from '../../../environments/environment';
import { TokenService } from '../../../core/services/token-service';
import type { MensagemInterna } from '../../models/ChatModels';

/**
 * WebSocket do chat interno. Mesmo padrão do NotificacoesWsService:
 * conecta uma única vez e assina o tópico dentro do onConnect.
 * Endpoint: /ws/chat-interno | envia: /app/chat-interno/send
 * recebe:  /topic/chat-interno/{idChat}
 */
@Injectable({ providedIn: 'root' })
export class ChatInternoWsService {
  private tokenService = inject(TokenService);
  private zone = inject(NgZone);
  private env = environment;

  private client!: Client;
  private conectado = false;
  private idChatAtual: number | null = null;
  private assinatura?: StompSubscription;

  // Fonte única de verdade das mensagens do chat aberto (como o notificacoes$).
  private mensagensSubject = new BehaviorSubject<MensagemInterna[]>([]);
  mensagens$ = this.mensagensSubject.asObservable();

  connect(): void {
    if (this.client) return; // já criado -> não recria (evita conexões duplicadas)

    const token = this.tokenService.getToken;

    this.client = new Client({
      webSocketFactory: () => new SockJS(`${this.env.apiUrl}/ws/chat-interno`),
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
      console.error('STOMP erro (chat-interno):', frame.headers['message'], frame.body);

    this.client.activate();
  }

  /** Abre um chat: semeia o histórico e assina o tópico. */
  abrirChat(idChat: number, historico: MensagemInterna[] = []): void {
    this.idChatAtual = idChat;
    this.mensagensSubject.next(historico);
    if (this.conectado) this.assinarTopico(idChat);
    // se ainda não conectou, o onConnect assina sozinho
  }

  private assinarTopico(idChat: number): void {
    this.assinatura?.unsubscribe();
    this.assinatura = this.client.subscribe(`/topic/chat-interno/${idChat}`, (frame) => {
      const msg = JSON.parse(frame.body) as MensagemInterna;
      this.zone.run(() =>
        this.mensagensSubject.next([...this.mensagensSubject.value, msg]),
      );
    });
  }

  enviar(payload: { idChat: number | null; idDestinatario: number; mensagem: string }): void {
    if (!payload.mensagem?.trim()) return;
    if (!this.client?.connected) {
      console.warn('WebSocket do chat interno ainda não conectado.');
      return;
    }
    this.client.publish({
      destination: '/app/chat-interno/send',
      body: JSON.stringify(payload),
    });
  }

  disconnect(): void {
    this.assinatura?.unsubscribe();
    this.client?.deactivate();
    this.conectado = false;
  }
}
