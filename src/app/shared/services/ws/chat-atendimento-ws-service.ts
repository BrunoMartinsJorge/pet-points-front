/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../core/environments/environment-dev';
import { TokenService } from '../../../core/services/token-service';
import type { StompSubscription } from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';
import type { MensagemAtendimento } from '../../models/ChatModels';

@Injectable({
  providedIn: 'root',
})
export class ChatAtendimentoWsService {
  private tokenService = inject(TokenService);
  private env = environment;
 
  private client!: Client;
  private conectado = false;
  private assinaturas = new Map<number, StompSubscription>();
 
  private mensagens$ = new Subject<MensagemAtendimento>();
  readonly onMensagem$ = this.mensagens$.asObservable();
 
  connect(): Promise<void> {
    if (this.conectado) return Promise.resolve();
    const token = this.tokenService.getToken;
 
    return new Promise((resolve) => {
      this.client = new Client({
        webSocketFactory: () => new SockJS(`${this.env.api}/ws/chat-atendimento`),
        connectHeaders: { Authorization: `Bearer ${token}` },
        reconnectDelay: 5000,
        onConnect: () => {
          this.conectado = true;
          resolve();
        },
      });
      this.client.activate();
    });
  }
 
  assinarChat(idChat: number): void {
    if (this.assinaturas.has(idChat)) return;
    const sub = this.client.subscribe(`/topic/chat-atendimento/${idChat}`, (frame) => {
      this.mensagens$.next(JSON.parse(frame.body) as MensagemAtendimento);
    });
    this.assinaturas.set(idChat, sub);
  }
 
  desassinarChat(idChat: number): void {
    this.assinaturas.get(idChat)?.unsubscribe();
    this.assinaturas.delete(idChat);
  }
 
  enviar(payload: { idChat: number; mensagem: string }): void {
    if (!payload.mensagem?.trim()) return;
    this.client.publish({
      destination: '/app/chat-atendimento/send',
      body: JSON.stringify(payload),
    });
  }
 
  disconnect(): void {
    this.assinaturas.forEach((s) => s.unsubscribe());
    this.assinaturas.clear();
    this.client?.deactivate();
    this.conectado = false;
  }
}
