/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { inject, Injectable, NgZone } from '@angular/core';
import type { SolicitacoesAtendimentosDto } from '../../../modules/atendente/features/chat-atendimento/models/SolicitacoesAtendimentosDto';
import type { SolicitacaoRemovidaDto } from '../../../modules/atendente/features/chat-atendimento/models/SolicitacaoRemovidaDto';
import { TokenService } from '../../../core/services/token-service';
import { environment } from '../../../core/environments/environment-dev';
import type { StompSubscription } from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';
import { Subject } from 'rxjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class SolicitacoesAtendimentoWsService {
  private tokenService = inject(TokenService);
  private zone = inject(NgZone);
  private env = environment;

  private client?: Client;
  private conectado = false;
  private assinaturaNovas?: StompSubscription;
  private assinaturaRemovidas?: StompSubscription;

  private novaSolicitacaoSubject = new Subject<SolicitacoesAtendimentosDto>();
  novaSolicitacao$ = this.novaSolicitacaoSubject.asObservable();

  private solicitacaoRemovidaSubject = new Subject<SolicitacaoRemovidaDto>();
  solicitacaoRemovida$ = this.solicitacaoRemovidaSubject.asObservable();

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
      this.assinarTopicos();
    };

    this.client.onStompError = (frame) =>
      console.error(
        'STOMP erro (solicitacoes-atendimento):',
        frame.headers['message'],
        frame.body,
      );

    this.client.activate();
  }

  private assinarTopicos(): void {
    this.assinaturaNovas?.unsubscribe();
    this.assinaturaNovas = this.client?.subscribe(
      '/topic/chat-atendimento/solicitacoes',
      (frame) => {
        const solicitacao = JSON.parse(frame.body) as SolicitacoesAtendimentosDto;
        this.zone.run(() => this.novaSolicitacaoSubject.next(solicitacao));
      },
    );

    this.assinaturaRemovidas?.unsubscribe();
    this.assinaturaRemovidas = this.client?.subscribe(
      '/topic/chat-atendimento/solicitacoes/removidas',
      (frame) => {
        const removida = JSON.parse(frame.body) as SolicitacaoRemovidaDto;
        this.zone.run(() => this.solicitacaoRemovidaSubject.next(removida));
      },
    );
  }

  disconnect(): void {
    this.assinaturaNovas?.unsubscribe();
    this.assinaturaRemovidas?.unsubscribe();
    this.client?.deactivate();
    this.conectado = false;
    // Sem isso, connect() nunca recriava o client após um disconnect (guard
    // "if (this.client) return"), obrigando a recarregar a aplicação.
    this.client = undefined;
  }
}
