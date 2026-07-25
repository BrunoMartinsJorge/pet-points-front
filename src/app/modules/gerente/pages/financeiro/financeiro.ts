import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { ChartModule } from 'primeng/chart';
import { FinanceiroService } from './service/financeiro-service';
import type { CardsFinanceiroDto } from './model/CardsFinanceiroDto';
import type { FaturaDto } from './model/FaturaDto';
import type { RelatorioFinanceiroForm } from './form/RelatorioFinanceiroForm';
import { TipoPagamentoOpcoesFiltros } from '../../../../shared/models/enums/TipoPagamentoEnum';
import type { OptionSelect } from '../../../../shared/models/OptionSelect';

const OPCOES_STATUS_FATURA: OptionSelect[] = [
  { label: 'Todos', value: '' },
  { label: 'Pago', value: 'PAGO' },
  { label: 'Pendente', value: 'PENDENTE' },
  { label: 'Atrasado', value: 'ATRASADO' },
  { label: 'Recusado', value: 'RECUSADO' },
];

interface FiltrosFinanceiroForm {
  busca: string;
  status: string;
  tipoPagamento: string;
  dataInicio: Date | null;
  dataFim: Date | null;
}

@Component({
  selector: 'app-financeiro',
  imports: [PrimeNGModule, ChartModule],
  templateUrl: './financeiro.html',
  styleUrl: './financeiro.scss',
})
export class Financeiro implements OnInit {
  private readonly service = inject(FinanceiroService);

  public readonly opcoesStatusFatura = OPCOES_STATUS_FATURA;
  public readonly opcoesTipoPagamento = TipoPagamentoOpcoesFiltros;

  public cards: CardsFinanceiroDto = {
    receitaMesAtual: 0,
    variacaoReceitaMesAtual: null,
    receitaHoje: 0,
    variacaoReceitaHoje: null,
    valorPendente: 0,
    quantidadePendentes: 0,
    valorEmAtraso: 0,
    quantidadeEmAtraso: 0,
  };
  public carregandoCards = false;

  public exibirGraficoMensal = false;
  public grafico = {
    labels: [] as string[],
    datasets: [] as unknown[],
  };
  public opcoesGrafico = {};
  public carregandoGrafico = false;

  private faturas: FaturaDto[] = [];
  public faturasFiltradas: FaturaDto[] = [];
  public carregandoFaturas = false;

  public filtros: FiltrosFinanceiroForm = {
    busca: '',
    status: '',
    tipoPagamento: '',
    dataInicio: null,
    dataFim: null,
  };

  ngOnInit(): void {
    this.recarregar();
  }

  public recarregar(): void {
    this.buscarCards();
    this.buscarGrafico();
    this.buscarFaturas();
  }

  private buscarCards(): void {
    this.carregandoCards = true;
    this.service.buscarCards().subscribe({
      next: (response) => {
        this.cards = response;
        this.carregandoCards = false;
      },
      error: () => (this.carregandoCards = false),
    });
  }

  public alternarAgrupamentoGrafico(exibirMensal: boolean): void {
    this.exibirGraficoMensal = exibirMensal;
    this.buscarGrafico();
  }

  private buscarGrafico(): void {
    this.carregandoGrafico = true;
    this.service
      .buscarGrafico(this.exibirGraficoMensal ? 'MES' : 'DIA')
      .subscribe({
        next: (response) => {
          this.montarGrafico(response.labels, response.valores);
          this.carregandoGrafico = false;
        },
        error: () => (this.carregandoGrafico = false),
      });
  }

  private buscarFaturas(): void {
    this.carregandoFaturas = true;
    this.service.listarFaturas().subscribe({
      next: (response) => {
        this.faturas = response;
        this.filtrarFaturas();
        this.carregandoFaturas = false;
      },
      error: () => (this.carregandoFaturas = false),
    });
  }

  /**
   * @description Remove acentos e normaliza o texto para comparações de filtro
   */
  private normalizar(texto: string): string {
    return texto
      .normalize('NFD')
      .replace(new RegExp('[\u0300-\u036f]', 'g'), '')
      .toUpperCase()
      .trim();
  }

  public filtrarFaturas(): void {
    let faturas = this.faturas;

    if (this.filtros.busca.trim() !== '') {
      const busca = this.filtros.busca.toLowerCase();
      faturas = faturas.filter(
        (f) =>
          f.clienteNome.toLowerCase().includes(busca) ||
          f.numero.toLowerCase().includes(busca),
      );
    }

    if (this.filtros.status !== '')
      faturas = faturas.filter((f) => f.status === this.filtros.status);

    if (this.filtros.tipoPagamento !== '')
      faturas = faturas.filter(
        (f) => this.normalizar(f.tipoPagamento) === this.filtros.tipoPagamento,
      );

    if (this.filtros.dataInicio !== null) {
      const inicio = this.filtros.dataInicio;
      faturas = faturas.filter((f) => new Date(f.data) >= inicio);
    }

    if (this.filtros.dataFim !== null) {
      const fim = new Date(this.filtros.dataFim);
      fim.setHours(23, 59, 59, 999);
      faturas = faturas.filter((f) => new Date(f.data) <= fim);
    }

    this.faturasFiltradas = faturas;
  }

  public limparFiltros(): void {
    this.filtros = {
      busca: '',
      status: '',
      tipoPagamento: '',
      dataInicio: null,
      dataFim: null,
    };
    this.filtrarFaturas();
  }

  /**
   * @description Formata uma data para o padrão aceito pelo backend (yyyy-MM-dd)
   */
  private formatarData(data: Date): string {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  public gerarRelatorio(): void {
    const form: RelatorioFinanceiroForm = {
      dataInicio: this.filtros.dataInicio
        ? this.formatarData(this.filtros.dataInicio)
        : null,
      dataFim: this.filtros.dataFim
        ? this.formatarData(this.filtros.dataFim)
        : null,
      tipoPagamento: this.filtros.tipoPagamento,
      statusPagamento: '',
    };
    this.service.gerarRelatorio(form).subscribe({
      next: (response: Blob) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      },
    });
  }

  /**
   * @description Retorna a classe css referente ao status calculado da fatura
   */
  public classeStatus(status: string): string {
    return status.toLowerCase();
  }

  private montarGrafico(labels: string[], valores: number[]): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue(
      '--p-text-muted-color',
    );
    const surfaceBorder = documentStyle.getPropertyValue(
      '--p-content-border-color',
    );
    const corPrimaria =
      documentStyle.getPropertyValue('--color-card-primary').trim() ||
      '#00BC7D';

    this.grafico = {
      labels,
      datasets: [
        {
          label: 'Receita',
          data: valores,
          borderColor: corPrimaria,
          backgroundColor: 'rgba(0, 188, 125, 0.12)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointBackgroundColor: corPrimaria,
        },
      ],
    };

    this.opcoesGrafico = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type
            label: (context: any) => {
              const valor = Number(context.raw) || 0;
              return ` ${context.dataset.label}: ${valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type
            callback: (valor: any) =>
              Number(valor).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                maximumFractionDigits: 0,
              }),
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
  }
}
