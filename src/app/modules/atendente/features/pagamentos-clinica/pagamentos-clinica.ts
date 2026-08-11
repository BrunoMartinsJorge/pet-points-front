import { Component, inject } from '@angular/core';
import type { OnInit } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { PagamentoClinicaService } from './service/pagamento-clinica-service';
import type { PagamentosClinicaDto } from './model/PagamentosClinicaDto';
import { ConfirmationService, MessageService } from 'primeng/api';
import type { CardsPagamentosClinica } from './model/CardsPagamentosClinica';
import type { DetalhesPagamentoClinicaDto } from './model/DetalhesPagamentoClinicaDto';
import { StatusPagamentoEnum } from '../../../../shared/models/enums/StatusPagamentoEnum';
import { TipoPagamentoEnum } from '../../../../shared/models/enums/TipoPagamentoEnum';

@Component({
  selector: 'app-pagamentos-clinica',
  imports: [PrimeNGModule],
  templateUrl: './pagamentos-clinica.html',
  styleUrl: './pagamentos-clinica.scss',
})
export class PagamentosClinica implements OnInit {
  private readonly service = inject(PagamentoClinicaService);
  private readonly confirmService = inject(ConfirmationService);
  private readonly toast = inject(MessageService);

  public cards: CardsPagamentosClinica | null = null;
  public carregandoCards = true;

  public pagamentos: PagamentosClinicaDto[] = [];
  public carregandoPagamentos = false;

  public pagamentosAtrasados: PagamentosClinicaDto[] = [];
  public carregandoPagamentosPendentes = true;

  public visibilidadeDialogDetalhesPagaemnto = false;
  public pagamentoSelecionado: PagamentosClinicaDto | null = null;

  public detalhesPagamento: DetalhesPagamentoClinicaDto | null = null;
  public carregandoDetalhes = false;
  public erroAoCarregarDetalhes = false;
  public etapaDetalhes = 0;
  public consultandoStatus = false;

  public visibilidadeDialogIndeferir = false;
  public motivoIndeferimento = '';
  public indeferindoPagamento = false;

  public ngOnInit(): void {
    this.buscarInformacoesCards();
    this.listarPagamentos();
    this.listarPagamentosPendentes();
  }

  public buscarInformacoesCards(): void {
    this.cards = null;
    this.carregandoCards = true;
    this.service.buscarCardsPagamentos().subscribe({
      next: (cards) => {
        this.cards = cards;
        this.carregandoCards = false;
      },
      error: () => (this.carregandoCards = false),
    });
  }

  private listarPagamentos(): void {
    this.pagamentos = [];
    this.carregandoPagamentos = true;
    this.service.buscarPagamentos().subscribe({
      next: (response: PagamentosClinicaDto[]) => {
        this.pagamentos = response;
        this.carregandoPagamentos = false;
      },
      error: () => (this.carregandoPagamentos = false),
    });
  }

  private listarPagamentosPendentes(): void {
    this.pagamentosAtrasados = [];
    this.carregandoPagamentosPendentes = true;
    this.service.buscarPendentesAtrasados().subscribe({
      next: (response: PagamentosClinicaDto[]) => {
        this.pagamentosAtrasados = response;
        this.carregandoPagamentosPendentes = false;
      },
      error: () => (this.carregandoPagamentosPendentes = false),
    });
  }

  public selecionarPagamento(pagamento: PagamentosClinicaDto): void {
    this.pagamentoSelecionado = pagamento;
    this.etapaDetalhes = 0;
    this.visibilidadeDialogDetalhesPagaemnto = true;
    this.buscarDetalhesPagamento();
  }

  public buscarDetalhesPagamento(): void {
    if (!this.pagamentoSelecionado) return;
    this.detalhesPagamento = null;
    this.erroAoCarregarDetalhes = false;
    this.carregandoDetalhes = true;
    this.service.buscarDetalhesPagamento(this.pagamentoSelecionado.id).subscribe({
      next: (detalhes) => {
        this.detalhesPagamento = detalhes;
        this.carregandoDetalhes = false;
      },
      error: () => {
        this.erroAoCarregarDetalhes = true;
        this.carregandoDetalhes = false;
      },
    });
  }

  public fecharDialogDetalhes(): void {
    this.pagamentoSelecionado = null;
    this.detalhesPagamento = null;
    this.erroAoCarregarDetalhes = false;
    this.etapaDetalhes = 0;
  }

  /**
   *
   * @description - Consulta o gateway de pagamento e sincroniza o status da transação
   */
  public consultarStatusTransacao(): void {
    if (!this.pagamentoSelecionado || this.consultandoStatus) return;
    this.consultandoStatus = true;
    this.service.consultarStatusTransacao(this.pagamentoSelecionado.id).subscribe({
      next: (detalhes) => {
        this.detalhesPagamento = detalhes;
        this.consultandoStatus = false;
        this.toast.add({
          severity: 'success',
          detail: 'Status da transação sincronizado com sucesso',
        });
        this.atualizarListagens();
      },
      error: () => {
        this.consultandoStatus = false;
      },
    });
  }

  public aprovarBaixaPagamento(): void {
    if (!this.pagamentoSelecionado) return;
    const idPagamento = this.pagamentoSelecionado.id;
    this.confirmService.confirm({
      message: 'Deseja aprovar a baixa desse pagamento?',
      header: 'Aprovar baixa',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        styleClass: 'p-button-success',
        label: 'Aprovar baixa',
      },
      rejectButtonProps: {
        styleClass: 'p-button-danger',
        label: 'Cancelar',
        outlined: true,
      },
      accept: () => {
        this.service.registrarPagamento(idPagamento).subscribe({
          next: () => {
            this.toast.add({
              severity: 'success',
              detail: 'Baixa do pagamento aprovada com sucesso',
            });
            this.visibilidadeDialogDetalhesPagaemnto = false;
            this.fecharDialogDetalhes();
            this.atualizarListagens();
          },
        });
      },
    });
  }

  public abrirDialogIndeferir(): void {
    this.motivoIndeferimento = '';
    this.visibilidadeDialogIndeferir = true;
  }

  public indeferirPagamento(): void {
    if (!this.pagamentoSelecionado || this.motivoIndeferimento.trim() === '') return;
    this.indeferindoPagamento = true;
    this.service
      .indeferirPagamento(this.pagamentoSelecionado.id, {
        motivoIndeferimento: this.motivoIndeferimento.trim(),
      })
      .subscribe({
        next: () => {
          this.indeferindoPagamento = false;
          this.visibilidadeDialogIndeferir = false;
          this.visibilidadeDialogDetalhesPagaemnto = false;
          this.fecharDialogDetalhes();
          this.toast.add({
            severity: 'success',
            detail: 'Pagamento indeferido com sucesso',
          });
          this.atualizarListagens();
        },
        error: () => {
          this.indeferindoPagamento = false;
          this.toast.add({
            severity: 'error',
            detail: 'Não foi possível indeferir o pagamento',
          });
        },
      });
  }

  private atualizarListagens(): void {
    this.buscarInformacoesCards();
    this.listarPagamentos();
    this.listarPagamentosPendentes();
  }

  public get statusPagamento(): StatusPagamentoEnum | null {
    return this.detalhesPagamento?.status ?? this.pagamentoSelecionado?.status ?? null;
  }

  public get formaPagamento(): TipoPagamentoEnum | null {
    return this.detalhesPagamento?.forma ?? this.pagamentoSelecionado?.forma ?? null;
  }

  public get valorPagamento(): number {
    return this.detalhesPagamento?.valor ?? this.pagamentoSelecionado?.valor ?? 0;
  }

  /**
   *
   * @description - Pagamentos via PIX são confirmados automaticamente pelo Mercado Pago,
   * então o atendente só avalia manualmente pagamentos presenciais ainda em aberto
   */
  public get permiteAvaliarPagamento(): boolean {
    if (this.formaPagamento === TipoPagamentoEnum.PIX) return false;
    return (
      this.statusPagamento === StatusPagamentoEnum.PENDENTE ||
      this.statusPagamento === StatusPagamentoEnum.ENVIADO
    );
  }

  public get pagamentoIndeferido(): boolean {
    return this.statusPagamento === StatusPagamentoEnum.REPROVADO;
  }

  /**
   *
   * @description - Pagamentos presenciais (dinheiro) não passam pelo gateway
   */
  public get permiteConsultarGateway(): boolean {
    return this.formaPagamento !== null && this.formaPagamento !== TipoPagamentoEnum.DINHEIRO;
  }

  public iconePagamento(tipoPagamento: TipoPagamentoEnum | null): string {
    if (tipoPagamento === null) return '';
    if (tipoPagamento === TipoPagamentoEnum.PIX) return 'fa fas fas fas fa-qrcode';
    else if (tipoPagamento === TipoPagamentoEnum.DINHEIRO) return 'fa fas fa-money-bill';
    else return 'fa fas fas fa-money-check';
  }

  public iniciais(nome: string): string {
    const partes = nome.trim().split(' ').filter(Boolean);
    if (partes.length === 0) return '';
    if (partes.length === 1) return partes[0].charAt(0).toUpperCase();
    return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
  }

  public registrarPagamentoPresencial(pagamento: PagamentosClinicaDto): void {
    this.confirmService.confirm({
      message: 'Deseja registrar o pagamento?',
      header: 'Registrar pagamento',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        styleClass: 'p-button-success',
        label: 'Marcar como Pago',
      },
      rejectButtonProps: {
        styleClass: 'p-button-danger',
        label: 'Cancelar',
        outlined: true,
      },
      accept: () => {
        this.service.registrarPagamento(pagamento.id).subscribe({
          next: () => {
            this.toast.add({
              severity: 'success',
              detail: 'Pagamento registrado com sucesso',
            });
            this.listarPagamentos();
            this.listarPagamentosPendentes();
          },
        });
      },
    });
  }
}
