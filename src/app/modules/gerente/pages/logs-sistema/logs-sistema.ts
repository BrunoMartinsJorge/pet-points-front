import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import type { LogDto } from './models/LogDto';
import { LogsService } from './service/logs-service';
import { BagLog } from './components/bag-log/bag-log';
import { TipoLogOpcoes } from './models/TipoLogOpcoes';
import type { UsuarioLogDto } from './models/UsuarioLogDto';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-logs-sistema',
  imports: [PrimeNGModule, BagLog, ChartModule],
  templateUrl: './logs-sistema.html',
  styleUrl: './logs-sistema.scss',
})
export class LogsSistema {
  private listaLogs: LogDto[] = [];
  public carregandoLogs = false;
  public basicData = {};
  public basicOptions = {};
  public readonly opcoesTipoLogs = TipoLogOpcoes;
  public usuariosLogs: UsuarioLogDto[] = [];
  public logsFiltrados: LogDto[] = [];
  private readonly service = inject(LogsService);
  public filtros = { tipo: '', data_hora: [], usuario: null };
  public tipoFiltro = 'usuarios';
  private readonly cd = inject(ChangeDetectorRef);
  public carregandoGrafico = false;
  public carregandoRelatorio = false;
  public dataMaxima = new Date();

  constructor() {
    this.buscarLogs();
    this.buscarUsuariosLogs();
  }

  private buscarLogs(): void {
    this.listaLogs = [];
    this.logsFiltrados = [];
    this.carregandoLogs = true;
    this.service.buscarLogs().subscribe({
      next: (res: LogDto[]) => {
        this.listaLogs = res;
        this.logsFiltrados = res;
        this.opcoesTipoLogs.unshift({ label: 'Todos', value: '' });
        this.formatarParaGrafico();
        setTimeout(() => {
          this.carregandoLogs = false;
        }, 2000);
      },
      error: () => {
        setTimeout(() => {
          this.carregandoLogs = false;
        }, 2000);
      },
    });
  }

  private buscarUsuariosLogs(): void {
    this.usuariosLogs = [];
    this.service.listarUsuariosLogs().subscribe({
      next: (res: UsuarioLogDto[]) => {
        this.usuariosLogs = res;
      },
    });
  }

  public gerarRelatorio(): void {
    this.carregandoRelatorio = true;
    const form = {
      idUsuario: this.filtros.usuario || null,
      datas: this.filtros.data_hora.join(','),
      tipo: this.filtros.tipo || null,
    };
    this.service.gerarRelatorio(form).subscribe({
      next: (res: Blob) => {
        const file = new Blob([res], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        this.carregandoRelatorio = false;
      },
      error: () => {
        this.carregandoRelatorio = false;
      },
    });
  }

  private formatarParaGrafico(): void {
    this.carregandoGrafico = true;
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--p-text-muted-color',
    );
    const surfaceBorder = documentStyle.getPropertyValue(
      '--p-content-border-color',
    );

    const chartData = this.agruparLogsPorFiltro();

    this.basicData = {
      labels: chartData.labels,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      datasets: chartData.datasets.map((ds: any, index: number) => ({
        ...ds,
        borderColor: documentStyle.getPropertyValue(
          index === 0
            ? '--p-cyan-500'
            : index === 1
              ? '--p-red-500'
              : '--p-gray-500',
        ),
      })),
    };

    this.basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: { color: textColor },
        },
      },
      scales: {
        x: {
          ticks: { color: textColorSecondary },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: { color: textColorSecondary },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    this.cd.markForCheck();
    this.carregandoGrafico = false;
  }

  private agruparLogsPorFiltro(): {
    labels: string[];
    datasets: unknown[];
  } {
    const mapa: Record<string, Record<string, number>> = {};

    const datasSet = new Set<string>();

    this.logsFiltrados.forEach((log) => {
      const tipo = this.tipoFiltro === 'usuario' ? log.lancadoPor : log.tipo;
      const data = log.registradoEm;
      datasSet.add(data);
      if (!mapa[tipo]) {
        mapa[tipo] = {};
      }
      mapa[tipo][data] = (mapa[tipo][data] || 0) + 1;
    });

    const labels = Array.from(datasSet).sort();

    const datasets = Object.keys(mapa).map((tipo) => ({
      label: tipo,
      data: labels.map((data) => mapa[tipo][data] || 0),
      fill: false,
      tension: 0.4,
    }));

    return { labels, datasets };
  }

  public limparFiltros(): void {
    this.filtros = { tipo: '', data_hora: [], usuario: null };
    this.filtrarLogs();
  }

  public get habilitarBotaoLimparFiltros(): boolean {
    const temData = this.filtros.data_hora.length > 0;
    const temUsuario = this.filtros.usuario != null;
    return temData || temUsuario;
  }

  private parseData(logData: string): Date {
    const [data, hora] = logData.split(' - ');

    const [dia, mes, ano] = data.split('/').map(Number);
    const [h, m, s] = hora.split(':').map(Number);

    return new Date(ano, mes - 1, dia, h, m, s);
  }

  public filtrarLogs(): void {
    const temTipo = !!this.filtros.tipo;
    const temData = !!this.filtros.data_hora?.length;
    const temUsuario = !!this.filtros.usuario;

    if (!temTipo && !temData && !temUsuario) {
      this.logsFiltrados = this.listaLogs;
      return;
    }

    const dataInicio = temData ? new Date(this.filtros.data_hora[0]) : null;
    const dataFim = temData ? new Date(this.filtros.data_hora[1]) : null;

    this.logsFiltrados = this.listaLogs.filter((log) => {
      const matchTipo = !temTipo || log.tipo === this.filtros.tipo;

      const dataLog = this.parseData(log.registradoEm);

      const matchData =
        !temData ||
        (dataLog >= dataInicio! && dataLog <= (dataFim || dataInicio)!);

      const matchUsuario =
        !temUsuario || log.lancadoPorId === this.filtros.usuario;

      return matchTipo && matchData && matchUsuario;
    });

    this.formatarParaGrafico();
  }
}
