/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { inject, Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { environment } from '../../../../environments/environment';
import SockJS from 'sockjs-client';
import { TokenService } from '../../../core/services/token-service';
import { NotificacoesService } from '../notificacoes-service';
import type { TiposNotificacoesEnum } from '../../models/enums/TiposNotificacoesEnum';

export interface NotificacaoDto {
  id: number;
  titulo: string;
  mensagem: string;
  data: string;
  lida: boolean;
  tipo: TiposNotificacoesEnum;
}

@Injectable({
  providedIn: 'root',
})
export class NotificacoesWsService {
  private client!: Client;
  private lastMessageId?: number;
  private env = environment;
  private subscribed = false;
  private lastMessageText?: string;

  private tokenService = inject(TokenService);
  private notificacoesService = inject(NotificacoesService);

  connect(): void {
    const token = this.tokenService.getToken;
    const idUsuario = this.tokenService.getTokenPayload?.idUsuario;

    if (!idUsuario) {
      console.error('ID do usuário não encontrado no token');
      return;
    }

    this.client = new Client({
      webSocketFactory: () => new SockJS(`${this.env.apiUrl}/ws/notificacoes`),
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.client.onConnect = () => {
      if (!this.subscribed) {
        this.client.subscribe(`/topic/notificacoes/${idUsuario}`, (frame) => {
          const data = JSON.parse(frame.body);

          if (Array.isArray(data)) {
            this.notificacoesService.limparNotificacoes();
            data.forEach((n: NotificacaoDto) =>
              this.notificacoesService.adicionarNotificacao(n),
            );
            return;
          }

          const msg = data as NotificacaoDto;

          if (!msg?.mensagem?.trim()) return;
          if (msg.id === this.lastMessageId) return;
          if (!msg.id) return;

          this.lastMessageId = msg.id;
          this.lastMessageText = msg.mensagem;

          this.notificacoesService.adicionarNotificacao(msg);
        });

        this.buscarNotificacoes();
        this.subscribed = true;
      }
    };

    this.client.activate();
  }

  public buscarNotificacoes(): void {
    this.client.publish({
      destination: '/app/listar',
      body: '',
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public novaMensagem(mensagem: any): void {
    if (mensagem == null) return;
    this.client.publish({
      destination: '/app/send',
      body: JSON.stringify(mensagem),
    });
  }

  public disconnect(): void {
    if (this.client) this.client.deactivate();
    this.subscribed = false;
  }
}
