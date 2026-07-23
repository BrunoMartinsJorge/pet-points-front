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
import { ToggleButton } from 'primeng/togglebutton';
import type { IndeferirPagamentoForm } from '../../forms/IndeferirPagamentoForm';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-detalhes-consulta',
  imports: [PrimeNGModule, BagStatusConsulta, Rating, ToggleButton],
  providers: [MessageService],
  templateUrl: './detalhes-consulta.html',
  styleUrl: './detalhes-consulta.scss',
})
export class DetalhesConsulta implements OnChanges {
  private readonly service = inject(ConsultasServices);
  private readonly toast = inject(MessageService);

  @Input() public consultaSelecionada: ConsultasAtendenteDto | null = null;
  @Input() public visibilidade = false;
  @Output() visibilidadeChange = new EventEmitter<boolean>();

  public etapa = 0;

  public pagamento: InformacoesPagamentoDto | null = null;
  public carregandoPagamento = false;

  public avaliacao: AvaliacaoConsultaDto | null = null;
  public carregandoAvaliacao = false;

  public enviandoAvaliacaoPagamento = false;
  public aprovarComprovante = false;
  public motivoIndeferimento = '';

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

  public get getConsultaFinalizada(): boolean {
    if (!this.consultaSelecionada) return false;
    return this.consultaSelecionada.status !== StatusConsultaEnum.FINALIZADO;
  }

  private buscarInformacoesPagamento(): void {
    this.pagamento = null;
    this.carregandoPagamento = true;
    if (!this.consultaSelecionada) return;
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
    this.carregandoAvaliacao = true;
    if (!this.consultaSelecionada) return;
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

  public baixarComprovante(): void {
    if (this.pagamento == null || this.pagamento.comprovante == null) return;
    this.service
      .baixarArquivoComprovante(this.pagamento.comprovante)
      .subscribe({
        next: (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'Comprovante_Pagamento_' + Date.now() + '.pdf';
          link.click();
        },
      });
  }

  public get habilitarBotaoEnviarAvaliacao(): boolean {
    if (this.enviandoAvaliacaoPagamento) return false;
    if (!this.consultaSelecionada || !this.pagamento || this.pagamento.comprovante == null) return false;
    if (this.aprovarComprovante) return true;
    return !this.aprovarComprovante && this.motivoIndeferimento.length > 0;
  }

  public enviarAvaliacaoComprovante(): void {
    if (!this.consultaSelecionada) return;
    this.enviandoAvaliacaoPagamento = true;
    const form: IndeferirPagamentoForm = {
      aprovar: this.aprovarComprovante,
      motivoIndeferimento: this.motivoIndeferimento,
    };
    this.service.enviarAvaliacao(this.consultaSelecionada.id, form).subscribe({
      next: () => {
        this.toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Avaliacao enviada com sucesso!' });
        this.enviandoAvaliacaoPagamento = false;
        this.buscarInformacoesPagamento();
      },
      error: () => {
        this.enviandoAvaliacaoPagamento = false;
      }
    });
  }
}
