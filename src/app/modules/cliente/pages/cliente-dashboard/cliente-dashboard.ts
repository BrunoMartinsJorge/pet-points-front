import { Component, inject } from '@angular/core';
import type { OnInit } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import type { ConsultasDashboardDto } from './model/ConsultasDashboardDto';
import type { PagamentosPendentesDto } from './model/PagamentosPendentesDto';
import type { AtendimentosPendentesDto } from './model/AtendimentosPendentesDto';
import { ClienteDashboardService } from './service/cliente-dashboard-service';
import { MinhasConsultasService } from '../minhas-consultas/services/minhas-consultas-service';
import { Router } from '@angular/router';
import { TipoPagamentoEnum } from '../../../../shared/models/enums/TipoPagamentoEnum';
import { MeusPagamentosService } from '../meus-pagamentos/service/meus-pagamentos-service';

@Component({
  selector: 'app-cliente-dashboard',
  imports: [PrimeNGModule],
  templateUrl: './cliente-dashboard.html',
  styleUrl: './cliente-dashboard.scss',
})
export class ClienteDashboard implements OnInit {
  private readonly service = inject(ClienteDashboardService);
  private readonly consultaService = inject(MinhasConsultasService);
  private readonly pagamentosService = inject(MeusPagamentosService);
  private readonly router = inject(Router);

  public pagamentosPendentes: PagamentosPendentesDto[] = [];
  public carregandoPagamentosPendentes = false;

  public consultasAgendadas: ConsultasDashboardDto[] = [];
  public carregandoConsultasAgendadas = false;

  public atendimentosPendentes: AtendimentosPendentesDto[] = [];
  public carregandoAtendimentosPendentes = false;

  /**
   *
   * @description Metodo que é executado ao iniciar o componente
   */
  public ngOnInit(): void {
    this.listarPagamentosPendentes();
    this.listarConsultasAgendadas();
    this.listarAtendimentosPendentes();
  }

  /**
   *
   * @description Busca os pagamentos pendentes ou atrasados do cliente
   */
  private listarPagamentosPendentes(): void {
    this.pagamentosPendentes = [];
    this.carregandoPagamentosPendentes = true;
    this.service.buscarPagamentosPendentes().subscribe({
      next: (response: PagamentosPendentesDto[]) => {
        this.pagamentosPendentes = response;
        this.carregandoPagamentosPendentes = false;
      },
      error: () => {
        this.carregandoPagamentosPendentes = false;
      },
    });
  }

  /**
   *
   * @description Busca as consultas que foram aprovadas ou foram iniciadas
   */
  private listarConsultasAgendadas(): void {
    this.consultasAgendadas = [];
    this.carregandoConsultasAgendadas = true;
    this.service.buscarConsultasAgendadas().subscribe({
      next: (response: ConsultasDashboardDto[]) => {
        this.consultasAgendadas = response;
        this.carregandoConsultasAgendadas = false;
      },
      error: () => {
        this.carregandoConsultasAgendadas = false;
      },
    });
  }

  /**
   *
   * @description Busca os atendimentos pendentes do cliente
   */
  private listarAtendimentosPendentes(): void {
    this.atendimentosPendentes = [];
    this.carregandoAtendimentosPendentes = true;
    this.service.buscarAtendimentosPendentes().subscribe({
      next: (response: AtendimentosPendentesDto[]) => {
        this.atendimentosPendentes = response;
        this.carregandoAtendimentosPendentes = false;
      },
      error: () => {
        this.carregandoAtendimentosPendentes = false;
      },
    });
  }

  public acessarConsulta(consulta: ConsultasDashboardDto): void {
    this.consultaService.idConsultaSelecionada = consulta.id;
    this.consultaService.acessoPorPetSelecionado = true;
    this.router.navigate([`/cliente/minhas-consultas`]);
  }

  public acessarPagamento(pagamento: PagamentosPendentesDto): void {
    this.pagamentosService.idPagamentoSelecionado = pagamento.id;
    this.pagamentosService.redirecionadoParaPagamento = true;
    this.router.navigate([`/cliente/meus-pagamentos`]);
  }

  public iconePagamento(pagamento: PagamentosPendentesDto): string {
    if (pagamento.tipoPagamento === TipoPagamentoEnum.PIX)
      return 'fa fas fas fas fa-qrcode';
    else if (pagamento.tipoPagamento === TipoPagamentoEnum.DINHEIRO)
      return 'fa fas fa-money-bill';
    else return 'fa fas fas fa-money-check'
  }
}
