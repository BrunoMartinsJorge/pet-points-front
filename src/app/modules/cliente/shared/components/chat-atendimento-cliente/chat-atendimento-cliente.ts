import type { OnInit, OnDestroy } from '@angular/core';
import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../../shared/modules/prime-ng/prime-ng-module';
import { SelectButton } from 'primeng/selectbutton';
import type { MensagemAtendimento } from '../../../../../shared/models/ChatModels';
import { AtendimentosClienteService } from './services/atendimentos-cliente-service';
import type { ChatAtendimentoDto } from './models/ChatAtendimentoDto';
import { MessageService } from 'primeng/api';
import { ChatAtendimentoWsService } from '../../../../../shared/services/ws/chat-atendimento-ws-service';
import type { Subscription } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { RatingModule } from 'primeng/rating';
import type { StatusAtendimentoEnum } from '../../../../../shared/models/enums/StatusAtendimentoEnum';
import type { AvaliacaoForm } from '../../../../../shared/form/AvaliacaoForm';

@Component({
  selector: 'app-chat-atendimento-cliente',
  imports: [PrimeNGModule, SelectButton, RatingModule],
  providers: [MessageService],
  templateUrl: './chat-atendimento-cliente.html',
  styleUrl: './chat-atendimento-cliente.scss',
})
export class ChatAtendimentoCliente implements OnInit, OnDestroy {
  private readonly service = inject(AtendimentosClienteService);
  private readonly toast = inject(MessageService);

  public visibilidadeDialogChatAtendimento = true;
  public visibilidadeDialogFinalizarAtendimento = true;
  public atendimentos: ChatAtendimentoDto[] = [];
  public chatSelecionado: ChatAtendimentoDto | null = null;
  public modoAtendimento: 'SOLICITACAO' | 'LISTA' = 'LISTA';
  public mensagemChatSelecionado: MensagemAtendimento[] = [];

  public mensagemSolicitacaoAtendimento = '';
  public novaMensagem = "";

  public avaliacaoAtendimento = {
    pontuacao: 0,
    observacoes: '',
  };

  private buscarAtendimentosCliente(): void {
    this.atendimentos = [];
    this.service.buscarAtendimentosCliente().subscribe({
      next: (atendimentos: ChatAtendimentoDto[]) => {
        this.atendimentos = atendimentos;
      },
    });
  }

  public async selecionarAtendimento(
    atendimento: ChatAtendimentoDto,
  ): Promise<void> {
    this.chatSelecionado = atendimento;

    const historico = await firstValueFrom(
      this.service.buscarMensagensChatAtendimento(atendimento.chatId),
    );

    this.ws.abrirChat(atendimento.chatId, historico);
  }

  public enviarSolicitacaoAtendimento(): void {
    if (
      this.mensagemSolicitacaoAtendimento == null ||
      this.mensagemSolicitacaoAtendimento.trim() === ''
    ) {
      return;
    }

    this.service
      .solicitarAtendimento(this.mensagemSolicitacaoAtendimento)
      .subscribe({
        next: () => {
          this.toast.add({
            severity: 'success',
            summary: 'Solicitação enviada',
            detail: 'Sua solicitação de atendimento foi enviada com sucesso.',
          });
          this.mensagemSolicitacaoAtendimento = '';
          this.buscarAtendimentosCliente();
          this.modoAtendimento = 'LISTA';
        },
      });
  }

  public finalizarAtendimento(): void {
    if (!this.chatSelecionado) return;
    const payload: AvaliacaoForm = {
      pontuacao: this.avaliacaoAtendimento.pontuacao,
      observacoes: this.avaliacaoAtendimento.observacoes,
    };
    this.service
      .finalizarAtendimento(payload, this.chatSelecionado.chatId)
      .subscribe({
        next: () => {
          if (this.chatSelecionado)
            this.selecionarAtendimento(this.chatSelecionado);
          this.visibilidadeDialogFinalizarAtendimento = false;
          this.toast.add({
            severity: 'success',
            summary: 'Finalizado',
            detail: 'Seu atendimento foi finalizado com sucesso!.',
          });
        },
      });
  }

  private buscarMensagens(): void {
    if (!this.chatSelecionado) return;
    this.mensagemChatSelecionado = [];
    this.service
      .buscarMensagensChatAtendimento(this.chatSelecionado.chatId)
      .subscribe({
        next: (response: MensagemAtendimento[]) => {
          this.mensagemChatSelecionado = response;
        },
      });
  }

  private readonly ws = inject(ChatAtendimentoWsService);

  private wsSub?: Subscription;
  private statusSub?: Subscription;

  public async ngOnInit(): Promise<void> {
    this.ws.connect();
    this.buscarAtendimentosCliente();
    this.wsSub = this.ws.mensagens$.subscribe(
      (m) => (this.mensagemChatSelecionado = m),
    );
    this.statusSub = this.ws.status$.subscribe((evento) => {
      if (!evento || !this.chatSelecionado) return;
      if (evento.idChat !== this.chatSelecionado.chatId) return;
      // Atendente acabou de aceitar a solicitação: libera o envio de mensagens
      // imediatamente, sem precisar reabrir o chat ou recarregar a página.
      this.chatSelecionado = {
        ...this.chatSelecionado,
        status: evento.status as StatusAtendimentoEnum,
        atendente: evento.atendente ?? this.chatSelecionado.atendente,
      };
      this.atendimentos = this.atendimentos.map((atendimento) =>
        atendimento.chatId === evento.idChat
          ? {
              ...atendimento,
              status: evento.status as StatusAtendimentoEnum,
              atendente: evento.atendente ?? atendimento.atendente,
            }
          : atendimento,
      );
    });
    if (!this.chatSelecionado) return;
    const historico = await firstValueFrom(
      this.service.buscarMensagensChatAtendimento(this.chatSelecionado.chatId),
    );
    if (!this.chatSelecionado) return;
    this.ws.abrirChat(
      this.chatSelecionado.chatId,
      historico
    );
  }

  public ngOnDestroy(): void {
    this.wsSub?.unsubscribe();
    this.statusSub?.unsubscribe();
    this.ws.disconnect();
  }

  public voltarParaLista(): void {
    this.novaMensagem = "";
    this.modoAtendimento = "LISTA";
    this.chatSelecionado = null;
  }

  public abrirDialogFinalizarAtendimento(): void {
    this.visibilidadeDialogFinalizarAtendimento = true;
    this.avaliacaoAtendimento = {
      pontuacao: 0,
      observacoes: '',
    }
  }

  public enviar(): void {
    const texto = this.novaMensagem.trim();
    if (!texto || !this.chatSelecionado) return;

    this.ws.enviar({
      idChat: this.chatSelecionado.chatId,
      idDestinatario: this.chatSelecionado.chatId,
      mensagem: this.novaMensagem,
    });
    this.novaMensagem = '';
  }
}
