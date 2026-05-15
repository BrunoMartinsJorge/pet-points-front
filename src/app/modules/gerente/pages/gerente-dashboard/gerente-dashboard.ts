import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { GerenteDashboardService } from './service/gerente-dashboard-service';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { ChartModule } from 'primeng/chart';
import type { MovimentacoesGerenteDto } from './model/MovimentacoesGerenteDto';
import type { ConsultasGerenteDto } from './model/ConsultasGerenteDto';
import { BagTipoMovimentacao } from '../../../../shared/components/bag-tipo-movimentacao/bag-tipo-movimentacao';

@Component({
  selector: 'app-gerente-dashboard',
  imports: [PrimeNGModule, ChartModule, BagTipoMovimentacao],
  templateUrl: './gerente-dashboard.html',
  styleUrl: './gerente-dashboard.scss',
})
export class GerenteDashboard implements OnInit {
  private readonly service = inject(GerenteDashboardService);
  private acessosMes: {
    data: string;
    quantidade: number;
  }[] = [];
  public grafico = {
    labels: [] as string[],
    datasets: [] as unknown[],
  };
  public opcoesGrafico = {};
  public movimentacoes: MovimentacoesGerenteDto[] = [];
  public consultas: ConsultasGerenteDto[] = [];

  ngOnInit(): void {
    this.buscarAcessos();
    this.buscarMovimentacoes();
    this.buscarConsultas();
  }

  private buscarAcessos(): void {
    this.acessosMes = [];
    this.service.buscarAcessosMes().subscribe({
      next: (response: { data: string; quantidade: number }[]) => {
        this.acessosMes = response.sort((a, b) =>
          a.data.charAt(0).localeCompare(b.data.charAt(0)),
        );
        this.gerarGrafico();
      },
    });
  }

  private buscarMovimentacoes(): void {
    this.movimentacoes = [];
    this.service.buscarMovimentacoesMes().subscribe({
      next: (response: MovimentacoesGerenteDto[]) => {
        this.movimentacoes = response;
      },
    });
  }

  private buscarConsultas(): void {
    this.consultas = [];
    this.service.buscarConsultas().subscribe({
      next: (response: ConsultasGerenteDto[]) => {
        this.consultas = response;
      },
    });
  }

  private gerarGrafico(): void {
    const documentStyle = getComputedStyle(document.documentElement);

    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--p-text-muted-color',
    );
    const surfaceBorder = documentStyle.getPropertyValue(
      '--p-content-border-color',
    );

    this.grafico = {
      labels: this.acessosMes.map((mes) => mes.data ?? '---'),

      datasets: [
        {
          label: 'Acessos',
          data: this.acessosMes.map((mes) => Number(mes.quantidade) || 0),
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1,
        },
      ],
    };

    this.opcoesGrafico = {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },

        tooltip: {
          callbacks: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type
            label: (context: any) => {
              return ` ${context.dataset.label}: ${context.raw}`;
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
            color: surfaceBorder,
          },
        },

        y: {
          beginAtZero: true,

          ticks: {
            color: textColorSecondary,
            stepSize: 1,
          },

          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
  }
}
