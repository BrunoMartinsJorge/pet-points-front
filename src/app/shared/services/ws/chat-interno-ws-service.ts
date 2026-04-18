/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import SockJS from 'sockjs-client';
import { environment } from '../../../core/environments/environment-dev';

@Injectable({
  providedIn: 'root',
})
export class ChatInternoWsService {
  private client!: Client;
  private lastMessageId?: number;
  private lastSessionId?: number;
  private lastSessionText?: string;
  private lastMessageText?: string;
  private env = environment;

  private messagesSubject = new BehaviorSubject<any[]>([]);
  messages$ = this.messagesSubject.asObservable();

  private sessionSubject = new BehaviorSubject<any[]>([]);
  sessions$ = this.sessionSubject.asObservable();

  // constructor(private notif: NotificationService) {}

  private subscribed = false;

  connect() {
    const token = localStorage.getItem('token');

    this.client = new Client({
      webSocketFactory: () => new SockJS(`${this.env.api}/ws/cliente`),
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.client.onConnect = () => {
      if (!this.subscribed) {
        this.client.subscribe('/topic/cliente', (frame) => {
          const msg = JSON.parse(frame.body) as any;
          if (!msg || !msg.message || msg.message.trim() === '') {
            return;
          }
          if (msg.id && msg.id === this.lastMessageId) {
            return;
          }
          if (!msg.id && msg.message === this.lastMessageText) {
            return;
          }
          if (msg.id) {
            this.lastMessageId = msg.id;
          }
          this.lastMessageText = msg.message;
          const current = this.messagesSubject.value;
          this.messagesSubject.next([...current, msg]);
        });
        this.subscribed = true;
      }
    };

    this.client.activate();
  }

  public novaSessao(mensagem: string) {
    if (!mensagem || mensagem.trim() === '') return;
    this.client.publish({
      destination: '/app/cliente/nova-sessao',
      body: mensagem,
    });
  }

  sendMessage(message: any) {
    if (!message.mensagem || message.mensagem.trim() === '') return;
    this.client.publish({
      destination: '/app/cliente/send',
      body: JSON.stringify(message),
    });
  }

  disconnect() {
    if (this.client) this.client.deactivate();
    this.subscribed = false;
  }
}
