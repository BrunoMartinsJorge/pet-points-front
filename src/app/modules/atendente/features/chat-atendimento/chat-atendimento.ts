import type { OnDestroy, OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { MessageService } from 'primeng/api';
import type { SolicitacoesAtendimentosDto } from './models/SolicitacoesAtendimentosDto';
import { AtendimentosAtendenteeService } from './services/atendimentos-atendentee-service';
import type { ChatAtendimentoDto } from './models/ChatAtendimentoDto';
import { Router } from '@angular/router';
import { SolicitacoesAtendimentoWsService } from '../../../../shared/services/ws/solicitacoes-atendimento-ws-service';
import { Subscription } from 'rxjs';
import type { SolicitacaoRemovidaDto } from './models/SolicitacaoRemovidaDto';
import type { CardsAtendimentoAtendenteDto } from './models/CardsAtendimentoAtendenteDto';

@Component({
  selector: 'app-chat-atendimento',
  imports: [PrimeNGModule],
  templateUrl: './chat-atendimento.html',
  styleUrl: './chat-atendimento.scss',
})
export class ChatAtendimento implements OnInit, OnDestroy {
  private readonly service = inject(AtendimentosAtendenteeService);
  private readonly toast = inject(MessageService);
  private readonly router = inject(Router);
  private readonly solicitacoesWs = inject(SolicitacoesAtendimentoWsService);

  public listaSolicitacoesAtendimentos: SolicitacoesAtendimentosDto[] = [];
  public carregandoSolicitacoesAtendimentos = false;

  public listaAtendimentos: ChatAtendimentoDto[] = [];
  public carregandoAtendimentos = false;

  public cardsAtendimentos: CardsAtendimentoAtendenteDto = {
    atendimentosEmAndamento: 0,
    atendimentosFinalizadas: 0,
    pontuacaoMedia: 0,
  }

  private readonly subscriptions = new Subscription();

  public ngOnInit(): void {
    this.buscarAtendimentos();
    this.buscarSolicitacoesAtendimentos();
    this.escutarSolicitacoesEmTempoReal();
    this.buscarCards();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.solicitacoesWs.disconnect();
  }

  private buscarCards(): void {
    this.cardsAtendimentos = {
      atendimentosEmAndamento: 0,
      atendimentosFinalizadas: 0,
      pontuacaoMedia: 0
    };
    this.service.buscarCardsAtendente().subscribe({
      next: (response: CardsAtendimentoAtendenteDto) => {
        this.cardsAtendimentos = response;
      },
    });
  }

  /**
   * Assina a fila compartilhada de solicitações: uma nova solicitação aparece
   * automaticamente na tela, e quando outro atendente assume uma, ela some da lista.
   */
  private escutarSolicitacoesEmTempoReal(): void {
    this.solicitacoesWs.connect();

    this.subscriptions.add(
      this.solicitacoesWs.novaSolicitacao$.subscribe({
        next: (solicitacao: SolicitacoesAtendimentosDto) => {
          const jaExiste = this.listaSolicitacoesAtendimentos.some(
            (s) => s.id === solicitacao.id,
          );
          if (jaExiste) return;
          this.listaSolicitacoesAtendimentos = [
            solicitacao,
            ...this.listaSolicitacoesAtendimentos,
          ];
          this.toast.add({
            severity: 'info',
            summary: 'Nova solicitação',
            detail: `${solicitacao.solicitante} abriu uma nova solicitação de atendimento!`,
          });
        },
      }),
    );

    this.subscriptions.add(
      this.solicitacoesWs.solicitacaoRemovida$.subscribe({
        next: (removida: SolicitacaoRemovidaDto) => {
          this.listaSolicitacoesAtendimentos =
            this.listaSolicitacoesAtendimentos.filter(
              (s) => s.id !== removida.id,
            );
        },
      }),
    );
  }

  private buscarAtendimentos(): void {
    this.listaAtendimentos = [];
    this.carregandoAtendimentos = true;
    this.service.listarMeusAtendimentos().subscribe({
      next: (response: ChatAtendimentoDto[]) => {
        this.listaAtendimentos = response;
        this.carregandoAtendimentos = false;
      },
    });
  }

  private buscarSolicitacoesAtendimentos(): void {
    this.listaSolicitacoesAtendimentos = [];
    this.carregandoSolicitacoesAtendimentos = true;
    this.service.listarSolicitacoesAtendimentos().subscribe({
      next: (solicitacoes) => {
        this.listaSolicitacoesAtendimentos = solicitacoes;
        this.carregandoSolicitacoesAtendimentos = false;
      },
    });
  }

  public aceitarSolicitacaoAtendimento(idSolicitacao: number): void {
    this.service.idAtendimentoSelecionado = null;
    this.service.aceitarSolicitacaoAtendimento(idSolicitacao).subscribe({
      next: (response: ChatAtendimentoDto) => {
        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Solicitação de atendimento aceita com sucesso!',
        });
        // Remoção imediata na tela de quem aceitou; os demais atendentes recebem
        // o evento de remoção pelo WebSocket.
        this.listaSolicitacoesAtendimentos =
          this.listaSolicitacoesAtendimentos.filter(
            (s) => s.id !== idSolicitacao,
          );
        this.service.idAtendimentoSelecionado = response.chatId;
        this.router.navigate([
          'atendente/atendimento-selecionado/',
          response.chatId,
        ]);
      },
    });
  }

  public acessarChatAtendimento(chat: ChatAtendimentoDto): void {
    this.service.idAtendimentoSelecionado = chat.chatId;
    this.router.navigate(['atendente/atendimento-selecionado/', chat.chatId]);
  }
}