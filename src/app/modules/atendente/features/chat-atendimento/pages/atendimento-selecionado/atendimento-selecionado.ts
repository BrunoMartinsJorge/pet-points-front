import type { OnDestroy, OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { AtendimentosAtendenteeService } from '../../services/atendimentos-atendentee-service';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import type { ChatAtendimentoDto } from '../../models/ChatAtendimentoDto';
import { StatusAtendimentoEnum } from '../../../../../../shared/models/enums/StatusAtendimentoEnum';
import type { MensagemAtendimento } from '../../../../../../shared/models/ChatModels';
import { ChatAtendimentoWsService } from '../../../../../../shared/services/ws/chat-atendimento-ws-service';
import { firstValueFrom, type Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-atendimento-selecionado',
  imports: [PrimeNGModule],
  templateUrl: './atendimento-selecionado.html',
  styleUrl: './atendimento-selecionado.scss',
})
export class AtendimentoSelecionado implements OnInit, OnDestroy {
  private readonly service = inject(AtendimentosAtendenteeService);
  private readonly ws = inject(ChatAtendimentoWsService);
  private readonly router = inject(ActivatedRoute);

  private wsSub?: Subscription;
  private statusSub?: Subscription;

  private idChat: number | null = null;
  public mensagem = '';
  private primeiraMensagem: MensagemAtendimento | undefined = undefined;

  private get getIdAtendimento(): number | null {
    let id;
    this.router.paramMap.subscribe((params) => {
      id = Number(params.get('id') || null);
    });
    return id || null;
  }

  public atendimentoSelecionado: ChatAtendimentoDto | null = null;
  public mensagens: MensagemAtendimento[] = [];

  public async ngOnInit(): Promise<void> {
    await this.buscarAtendimentoSelecionado();
    this.ws.connect();
    this.wsSub = this.ws.mensagens$.subscribe((m) => (this.mensagens = m));
    this.statusSub = this.ws.status$.subscribe((evento) => {
      if (!evento || !this.atendimentoSelecionado) return;
      if (evento.idChat !== this.atendimentoSelecionado.chatId) return;
      // Cliente finalizou (ou outro atendente assumiu): refletir na tela sem reload.
      this.atendimentoSelecionado = {
        ...this.atendimentoSelecionado,
        status: evento.status as StatusAtendimentoEnum,
      };
    });
    this.idChat = this.getIdAtendimento;
    if (!this.idChat) return;
    const historico = await firstValueFrom(
      this.service.buscarMensagensPorChat(this.idChat),
    );
    this.ws.abrirChat(this.idChat, historico, this.primeiraMensagem);
  }

  async buscarAtendimentoSelecionado(): Promise<void> {
    const chatId = this.getIdAtendimento;
    if (chatId == null) return;
    this.service.buscarAtendimentoSelecioando(chatId).subscribe((chat) => {
      this.atendimentoSelecionado = chat;
      this.idChat = this.getIdAtendimento;
      this.primeiraMensagem = {
        id: chat.id,
        idChat: chat.chatId,
        mensagem: chat.mensagem,
        enviadoEm: chat.solicitadoEm,
        enviadoPorVoce: false,
      };
    });
  }

  public ngOnDestroy(): void {
    this.wsSub?.unsubscribe();
    this.statusSub?.unsubscribe();
    this.ws.disconnect();
  }

  public get atendimentoFinalizado(): boolean {
    return this.atendimentoSelecionado?.status === StatusAtendimentoEnum.FINALIZADO;
  }

  public enviar(): void {
    const texto = this.mensagem.trim();
    if (!texto || !this.idChat || this.atendimentoFinalizado) return;

    this.ws.enviar({
      idChat: this.idChat,
      idDestinatario: this.idChat,
      mensagem: this.mensagem,
    });
    this.mensagem = '';
  }
}
