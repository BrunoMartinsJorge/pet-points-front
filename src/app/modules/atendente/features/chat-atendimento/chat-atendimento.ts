import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { MessageService } from 'primeng/api';
import type { SolicitacoesAtendimentosDto } from './models/SolicitacoesAtendimentosDto';
import { AtendimentosAtendenteeService } from './services/atendimentos-atendentee-service';
import type { ChatAtendimentoDto } from './models/ChatAtendimentoDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-atendimento',
  imports: [PrimeNGModule],
  templateUrl: './chat-atendimento.html',
  styleUrl: './chat-atendimento.scss',
})
export class ChatAtendimento implements OnInit {
  private readonly service = inject(AtendimentosAtendenteeService);
  private readonly toast = inject(MessageService);
  private readonly router = inject(Router);

  public listaSolicitacoesAtendimentos: SolicitacoesAtendimentosDto[] = [];
  public carregandoSolicitacoesAtendimentos = false;

  public listaAtendimentos: ChatAtendimentoDto[] = [];
  public carregandoAtendimentos = false;

  public ngOnInit(): void {
    this.buscarAtendimentos();
    this.buscarSolicitacoesAtendimentos();
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
        this.buscarSolicitacoesAtendimentos();
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
