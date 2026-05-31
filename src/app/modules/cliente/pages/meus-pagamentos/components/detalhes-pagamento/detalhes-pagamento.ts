import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import type { OnChanges, SimpleChanges } from '@angular/core';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import type { PagamentosDto } from '../../models/PagamentosDto';
import type { MinhasConsultasDto } from '../../../minhas-consultas/models/MinhasConsultasDto';
import { BagStatusConsulta } from '../../../../../../shared/components/bag-status-consulta/bag-status-consulta';
import { MeusPagamentosService } from '../../service/meus-pagamentos-service';
import { MinhasConsultasService } from '../../../minhas-consultas/services/minhas-consultas-service';
import { Router } from '@angular/router';
import {
  TipoPagamentoEnum,
  TipoPagamentoOpcoes,
} from '../../../../../../shared/models/enums/TipoPagamentoEnum';
import type { FileSelectEvent } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageService } from 'primeng/api';
import type { DetalhesPagamentoDto } from '../../models/DetalhesPagamentoDto';

@Component({
  selector: 'app-detalhes-pagamento',
  imports: [
    PrimeNGModule,
    BagStatusConsulta,
    InputGroupModule,
    InputGroupAddonModule,
  ],
  templateUrl: './detalhes-pagamento.html',
  styleUrl: './detalhes-pagamento.scss',
})
export class DetalhesPagamento implements OnChanges {
  @Input() public visibilidade = false;
  @Input() public pagamentoSelecionado: PagamentosDto | null = null;

  @Output() visibilidadeChange = new EventEmitter<boolean>();
  @Output() alteracoesEfetuadas = new EventEmitter<void>();

  public readonly formasPagamento = TipoPagamentoOpcoes;

  private readonly service = inject(MeusPagamentosService);
  private readonly consultasService = inject(MinhasConsultasService);
  private readonly router = inject(Router);
  private readonly toast = inject(MessageService);

  public novoArquivo: File | undefined;
  public novaFormaPagamento: TipoPagamentoEnum | undefined;

  // Variável responsável por controlar a aba do tabpanel
  public etapa = 0;

  public carregandoInformacoesConsultaPagamento = false;
  public consultaPagamento: MinhasConsultasDto | null = null;

  public informacoesComprovante: DetalhesPagamentoDto | null = null;
  public carregandoInformacoesComprovante = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pagamentoSelecionado'] && this.pagamentoSelecionado) {
      this.novaFormaPagamento = this.pagamentoSelecionado.tipoPagamento;
      this.buscarInformacoesConsultaPagamento();
      this.buscarInformacoesComprovante();
    }
  }

  public fecharDialog(): void {
    this.visibilidade = false;
    this.visibilidadeChange.emit(false);
  }

  private buscarInformacoesConsultaPagamento(): void {
    if (!this.pagamentoSelecionado) return;
    this.consultaPagamento = null;
    this.carregandoInformacoesConsultaPagamento = true;
    this.service
      .buscarConsultaPagamento(this.pagamentoSelecionado.idConsulta)
      .subscribe({
        next: (response: MinhasConsultasDto) => {
          this.consultaPagamento = response;
          this.carregandoInformacoesConsultaPagamento = false;
        },
        error: () => (this.carregandoInformacoesConsultaPagamento = false),
      });
  }

  private buscarInformacoesComprovante(): void {
    if (!this.pagamentoSelecionado) return;
    this.informacoesComprovante = null;
    this.carregandoInformacoesComprovante = true;
    this.service
      .buscarComprovantePagamento(this.pagamentoSelecionado.id)
      .subscribe({
        next: (response: DetalhesPagamentoDto) => {
          this.informacoesComprovante = response;
          this.carregandoInformacoesComprovante = false;
        },
        error: () => (this.carregandoInformacoesComprovante = false),
      });
  }

  public baixarComprovante(): void {
    if (
      !this.pagamentoSelecionado ||
      !this.informacoesComprovante ||
      !this.informacoesComprovante.uuid
    )
      return;
    this.service
      .baixarArquivoComprovante(this.informacoesComprovante.uuid)
      .subscribe({
        next: (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const link = document.createElement('a');
          link.href = url;
          link.download =
            this.informacoesComprovante !== null &&
            this.informacoesComprovante.tituloArquivo
              ? this.informacoesComprovante.tituloArquivo
              : 'Comprovante_Pagamento_' + Date.now() + '.pdf';
          link.click();
        },
      });
  }

  public get habilitarAcessarComprovante(): boolean {
    return (
      this.pagamentoSelecionado != null || this.informacoesComprovante != null
    );
  }

  public acessarConsulta(): void {
    if (!this.consultaPagamento) return;
    this.consultasService.idConsultaSelecionada = this.consultaPagamento.id;
    this.consultasService.acessoPorPetSelecionado = true;
    this.fecharDialog();
    this.router.navigate([`/cliente/minhas-consultas`]);
  }

  public iconePagamento(tipoPagamento: TipoPagamentoEnum | undefined): string {
    if (tipoPagamento === undefined) return '';
    if (tipoPagamento === TipoPagamentoEnum.PIX)
      return 'fa fas fas fas fa-qrcode';
    else if (tipoPagamento === TipoPagamentoEnum.DINHEIRO)
      return 'fa fas fa-money-bill';
    else return 'fa fas fas fa-money-check';
  }

  public carregarArquivo(event: FileSelectEvent): void {
    if (!event) return;
    this.novoArquivo = event.files[0];
  }

  public alterarFormaPagamento(): void {
    if (
      !this.pagamentoSelecionado ||
      !this.novaFormaPagamento ||
      this.pagamentoSelecionado.statusPagamento === 'APROVADO' ||
      this.pagamentoSelecionado.tipoPagamento == this.novaFormaPagamento
    )
      return;
    this.service
      .alterarFormaPagamento(
        this.pagamentoSelecionado.id,
        this.novaFormaPagamento,
      )
      .subscribe({
        next: () => {
          this.alteracoesEfetuadas.emit();
          this.fecharDialog();
          this.toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Forma de pagamento alterada com sucesso!',
          });
        },
      });
  }

  public get getTituloComprovante(): string {
    if (!this.pagamentoSelecionado || !this.informacoesComprovante)
      return 'Sem comprovante';

    if (!this.novoArquivo) return this.informacoesComprovante.tituloArquivo;

    return `ANTIGO: ${this.informacoesComprovante.tituloArquivo} - NOVO: ${this.novoArquivo.name}`;
  }

  public get getTipoComprovante(): string {
    if (
      !this.pagamentoSelecionado ||
      !this.informacoesComprovante ||
      !this.informacoesComprovante.tipoArquivo
    )
      return 'Sem comprovante';
    let tipo = this.informacoesComprovante.tipoArquivo;
    if (!tipo.includes('/')) return tipo;
    tipo = tipo.split('/')[1];
    if (tipo == 'pdf') return 'PDF';
    return tipo;
  }

  public enviarComprovante(): void {
    if (!this.novoArquivo || !this.pagamentoSelecionado) return;
    this.service
      .registrarComprovante(this.pagamentoSelecionado.id, this.novoArquivo)
      .subscribe({
        next: () => {
          this.alteracoesEfetuadas.emit();
          this.fecharDialog();
          this.toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Comprovante enviado com sucesso!',
          });
        },
      });
  }
}
