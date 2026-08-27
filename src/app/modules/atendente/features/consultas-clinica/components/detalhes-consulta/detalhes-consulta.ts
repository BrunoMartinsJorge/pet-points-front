import type { OnChanges, SimpleChanges } from '@angular/core';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import type { ConsultasAtendenteDto } from '../../models/ConsultasAtendenteDto';
import { StatusConsultaEnum } from '../../../../../../shared/models/enums/StatusConsultaEnum';
import { BagStatusConsulta } from '../../../../../../shared/components/bag-status-consulta/bag-status-consulta';
import type { InformacoesPagamentoDto } from '../../models/InformacoesPagamentoDto';
import type { AvaliacaoConsultaDto } from '../../models/AvaliacaoConsultaDto';
import { ConsultasServices } from '../../service/consultas-services';
import { Rating } from 'primeng/rating';
import { BagStatusPagamento } from '../../../../../../shared/components/bag-status-pagamento/bag-status-pagamento';
import { TipoPagamentoEnum } from '../../../../../../shared/models/enums/TipoPagamentoEnum';
import { Imagem } from '../../../../../../shared/components/imagem/imagem';
import { urlArquivo } from '../../../../../../shared/utils/imagem-url';

@Component({
  selector: 'app-detalhes-consulta',
  imports: [PrimeNGModule, BagStatusConsulta, Rating, BagStatusPagamento, Imagem],
  templateUrl: './detalhes-consulta.html',
  styleUrl: './detalhes-consulta.scss',
})
export class DetalhesConsulta implements OnChanges {
  private readonly service = inject(ConsultasServices);

  @Input() public consultaSelecionada: ConsultasAtendenteDto | null = null;
  @Input() public visibilidade = false;
  @Output() visibilidadeChange = new EventEmitter<boolean>();

  public etapa = 0;

  public pagamento: InformacoesPagamentoDto | null = null;
  public carregandoPagamento = false;

  public avaliacao: AvaliacaoConsultaDto | null = null;
  public carregandoAvaliacao = false;

  /**
   *
   * @description - Metodo executado ao receber novas informacoes
   * @param - changes - Informacoes recebidas
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['consultaSelecionada']) {
      this.etapa = 0;
      this.buscarInformacoesPagamento();
      this.buscarInformacoesAvaliacao();
    }
  }

  public fecharDetalhesConsulta(): void {
    this.visibilidade = false;
    this.consultaSelecionada = null;
    this.visibilidadeChange.emit(false);
  }

  private buscarInformacoesPagamento(): void {
    this.pagamento = null;
    if (!this.consultaSelecionada) return;
    this.carregandoPagamento = true;
    this.service
      .buscarInformacoesPagamento(this.consultaSelecionada.id)
      .subscribe({
        next: (response) => {
          this.pagamento = response;
          this.carregandoPagamento = false;
        },
        error: () => {
          this.carregandoPagamento = false;
        },
      });
  }

  private buscarInformacoesAvaliacao(): void {
    this.avaliacao = null;
    if (!this.consultaSelecionada) return;
    this.carregandoAvaliacao = true;
    this.service.buscarAvaliacao(this.consultaSelecionada.id).subscribe({
      next: (response) => {
        this.avaliacao = response;
        this.carregandoAvaliacao = false;
      },
      error: () => {
        this.carregandoAvaliacao = false;
      },
    });
  }

  public get consultaFinalizada(): boolean {
    return this.consultaSelecionada?.status === StatusConsultaEnum.FINALIZADO;
  }

  public get consultaCancelada(): boolean {
    return this.consultaSelecionada?.status === StatusConsultaEnum.CANCELADO;
  }

  /** Só consultas finalizadas possuem resumo e avaliação para exibir. */
  public get abaAvaliacaoDesabilitada(): boolean {
    return !this.consultaFinalizada;
  }

  /**
   *
   * @description - A cobrança só existe depois que o veterinário finaliza a consulta
   */
  public get possuiPagamento(): boolean {
    return this.consultaFinalizada && this.pagamento != null;
  }

  public get exibirMotivoRecusa(): boolean {
    return (
      this.consultaCancelada ||
      this.consultaSelecionada?.status === StatusConsultaEnum.REPROVADA
    );
  }

  public get tituloMotivoRecusa(): string {
    return this.consultaCancelada
      ? 'Motivo do cancelamento'
      : 'Motivo do indeferimento';
  }

  public get motivoRecusa(): string {
    if (!this.consultaSelecionada) return '';
    return this.consultaCancelada
      ? this.consultaSelecionada.motivoCancelamento
      : this.consultaSelecionada.motivoIndeferimento;
  }

  public get pagamentoPago(): boolean {
    return this.pagamento?.pagoEm != null;
  }

  public iconePagamento(tipoPagamento: TipoPagamentoEnum | null): string {
    if (tipoPagamento === null) return 'fa fas fa-money-check';
    if (tipoPagamento === TipoPagamentoEnum.PIX) return 'fa fas fa-qrcode';
    if (tipoPagamento === TipoPagamentoEnum.DINHEIRO) return 'fa fas fa-money-bill';
    return 'fa fas fa-money-check';
  }

  public urlImagem(uuid: string | null | undefined): string {
    return urlArquivo(uuid);
  }
}
