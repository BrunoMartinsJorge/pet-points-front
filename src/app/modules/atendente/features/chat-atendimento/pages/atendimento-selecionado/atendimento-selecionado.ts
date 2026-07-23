import type {
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AtendimentosAtendenteeService } from '../../services/atendimentos-atendentee-service';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import type { ChatAtendimentoDto } from '../../models/ChatAtendimentoDto';
import { StatusAtendimentoEnum } from '../../../../../../shared/models/enums/StatusAtendimentoEnum';
import type { MensagemAtendimento } from '../../../../../../shared/models/ChatModels';
import { ChatAtendimentoWsService } from '../../../../../../shared/services/ws/chat-atendimento-ws-service';
import { firstValueFrom, type Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import type { AvaliacaoDto } from '../../../../../../shared/models/AvaliacaoDto';
import { Rating } from "primeng/rating";

@Component({
  selector: 'app-atendimento-selecionado',
  imports: [PrimeNGModule, ChartModule, Rating],
  templateUrl: './atendimento-selecionado.html',
  styleUrl: './atendimento-selecionado.scss',
})
export class AtendimentoSelecionado implements OnInit, OnDestroy, OnChanges {
  private readonly service = inject(AtendimentosAtendenteeService);
  private readonly ws = inject(ChatAtendimentoWsService);
  private readonly router = inject(ActivatedRoute);
  private readonly cd = inject(ChangeDetectorRef);

  private wsSub?: Subscription;
  private statusSub?: Subscription;

  private idChat: number | null = null;
  public mensagem = '';
  private primeiraMensagem: MensagemAtendimento | undefined = undefined;
  public dadosGrafico = {
    dados: {},
    opcoes: {},
  };
  public avaliacaoAtendimento: AvaliacaoDto | null = null;

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
    this.wsSub = this.ws.mensagens$.subscribe((m) => {this.mensagens = m;
      this.gerarGraficoMensagensPorUsuario();
      this.cd.detectChanges();
    });
    this.statusSub = this.ws.status$.subscribe((evento) => {
      if (!evento || !this.atendimentoSelecionado) return;
      if (evento.idChat !== this.atendimentoSelecionado.chatId) return;
      // Cliente finalizou (ou outro atendente assumiu): refletir na tela sem reload.
      this.atendimentoSelecionado = {
        ...this.atendimentoSelecionado,
        status: evento.status as StatusAtendimentoEnum,
      };
      this.buscarAvaliacao();
    });
    this.idChat = this.getIdAtendimento;
    if (!this.idChat) return;
    const historico = await firstValueFrom(
      this.service.buscarMensagensPorChat(this.idChat),
    );
    this.ws.abrirChat(this.idChat, historico, this.primeiraMensagem);
    this.gerarGraficoMensagensPorUsuario();
    this.buscarAvaliacao();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['mensagens']) {
      this.gerarGraficoMensagensPorUsuario();
    }
  }

  public get mensagensDivididas(): { minhas: number; cliente: number } {
    return {
      minhas: this.mensagens.filter((m) => m.enviadoPorVoce).length,
      cliente: this.mensagens.filter((m) => !m.enviadoPorVoce).length,
    };
  }

  private gerarGraficoMensagensPorUsuario(): void {
    if (!this.atendimentoSelecionado) return;
    this.dadosGrafico = {
      dados: {},
      opcoes: {},
    };
    this.dadosGrafico.dados = {
      labels: ['Pelo Cliente', 'Por Você'],
      datasets: [
        {
          data: [
            this.mensagensDivididas.cliente,
            this.mensagensDivididas.minhas,
          ],
          backgroundColor: ['#42A5F5', '#66BB6A'],
          hoverBackgroundColor: ['#64B5F6', '#81C784'],
        },
      ],
    };
    this.dadosGrafico.opcoes = {
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
    };
    this.cd.markForCheck();
  }

  private buscarAvaliacao(): void {
    if (!this.atendimentoSelecionado) return;
    this.avaliacaoAtendimento = null;
    this.service
      .buscarAvaliacao(this.atendimentoSelecionado.chatId)
      .subscribe((avaliacao) => (this.avaliacaoAtendimento = avaliacao));
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
    return (
      this.atendimentoSelecionado?.status === StatusAtendimentoEnum.FINALIZADO
    );
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
