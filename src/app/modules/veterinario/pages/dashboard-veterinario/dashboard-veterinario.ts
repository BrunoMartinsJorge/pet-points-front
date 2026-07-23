import { Component, inject } from '@angular/core';
import type { OnInit } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { DashboardVeterinarioService } from './service/dashboard-veterinario-service';
import { BagStatusConsulta } from '../../../../shared/components/bag-status-consulta/bag-status-consulta';
import type { ConsultasVeterinarioDashboardDto } from './models/ConsultasVeterinarioDashboardDto';
import type { AvaliacoesVeterinarioDashboardDto } from './models/AvaliacoesVeterinarioDashboardDto';
import type { CardsVeterinarioDashboardDto } from './models/CardsVeterinarioDashboardDto';
import { TokenService } from '../../../../core/services/token-service';
import { Router } from '@angular/router';
import { StatusConsultaEnum } from '../../../../shared/models/enums/StatusConsultaEnum';

interface FiltroConsulta {
  label: string;
  valor: string;
}

@Component({
  selector: 'app-dashboard-veterinario',
  imports: [PrimeNGModule, BagStatusConsulta],
  templateUrl: './dashboard-veterinario.html',
  styleUrl: './dashboard-veterinario.scss',
})
export class DashboardVeterinario implements OnInit {
  private readonly service = inject(DashboardVeterinarioService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);

  public readonly hoje = new Date();

  public cards: CardsVeterinarioDashboardDto = {
    consultasFinalizadas: 0,
    totalConsultas: 0,
    ranking: 0,
  };
  public carregandoCards = true;

  public consultas: ConsultasVeterinarioDashboardDto[] = [];
  public consultasFiltradas: ConsultasVeterinarioDashboardDto[] = [];
  public carregandoConsultas = true;
  public filtroConsulta = 'TODAS';

  public avaliacoes: AvaliacoesVeterinarioDashboardDto[] = [];
  public carregandoAvaliacoes = true;

  public readonly filtros: FiltroConsulta[] = [
    { label: 'Todas', valor: 'TODAS' },
    { label: 'Aprovadas', valor: StatusConsultaEnum.APROVADA },
    { label: 'Pendentes', valor: StatusConsultaEnum.PENDENTE },
    { label: 'Finalizadas', valor: StatusConsultaEnum.FINALIZADO },
  ];

  public ngOnInit(): void {
    this.buscarCards();
    this.buscarConsultasDiarias();
    this.buscarAvaliacoes();
  }

  /**
   * @description Nome e cargo do veterinário logado, lidos do token
   */
  public get usuario(): { nome: string; cargo: string } {
    const payload = this.tokenService.getTokenPayload;
    if (!payload) return { nome: '', cargo: '' };

    const permissao = payload.permissoes ?? '';
    let cargo = '';
    if (permissao === 'G') cargo = 'Gerente';
    if (permissao === 'A') cargo = 'Atendente';
    if (permissao === 'V') cargo = 'Veterinário';
    if (permissao === 'E') cargo = 'Estoquista';
    if (permissao === 'C') cargo = 'Cliente';

    return { nome: payload.nomeUsuario ?? '', cargo };
  }

  /**
   * @description Próxima consulta aprovada e pronta para iniciar
   */
  public get proximaConsulta(): ConsultasVeterinarioDashboardDto | null {
    return (
      this.consultas.find(
        (consulta) => consulta.status === StatusConsultaEnum.APROVADA,
      ) ?? null
    );
  }

  /**
   * @description Consulta atualmente em andamento
   */
  public get consultaEmAndamento(): ConsultasVeterinarioDashboardDto | null {
    return (
      this.consultas.find(
        (consulta) => consulta.status === StatusConsultaEnum.INICIADO,
      ) ?? null
    );
  }

  /**
   * @description Quantidade de consultas pendentes (aguardando) no dia
   */
  public get consultasPendentes(): number {
    return this.consultas.filter(
      (consulta) => consulta.status === StatusConsultaEnum.PENDENTE,
    ).length;
  }

  private buscarCards(): void {
    this.cards = {
      consultasFinalizadas: 0,
      totalConsultas: 0,
      ranking: 0,
    };
    this.carregandoCards = true;
    this.service.buscarCards().subscribe({
      next: (cards) => {
        this.cards = cards;
        this.carregandoCards = false;
      },
      error: () => {
        this.carregandoCards = false;
      },
    });
  }

  private buscarConsultasDiarias(): void {
    this.consultas = [];
    this.consultasFiltradas = [];
    this.carregandoConsultas = true;
    this.service.buscarListaConsultasDia().subscribe({
      next: (consultas) => {
        this.consultas = consultas;
        this.aplicarFiltroConsultas();
        this.carregandoConsultas = false;
      },
      error: () => {
        this.carregandoConsultas = false;
      },
    });
  }

  private buscarAvaliacoes(): void {
    this.avaliacoes = [];
    this.carregandoAvaliacoes = true;
    this.service.buscarListaAvaliacoes().subscribe({
      next: (avaliacoes) => {
        this.avaliacoes = avaliacoes;
        this.carregandoAvaliacoes = false;
      },
      error: () => {
        this.carregandoAvaliacoes = false;
      },
    });
  }

  /**
   * @description Aplica o filtro de status selecionado sobre as consultas do dia
   */
  public aplicarFiltroConsultas(): void {
    this.consultasFiltradas =
      this.filtroConsulta === 'TODAS'
        ? [...this.consultas]
        : this.consultas.filter(
            (consulta) => consulta.status === this.filtroConsulta,
          );
  }

  /**
   * @description Seleciona uma aba de filtro e reaplica o filtro das consultas
   */
  public selecionarFiltro(valor: string): void {
    this.filtroConsulta = valor;
    this.aplicarFiltroConsultas();
  }

  /**
   * @description Inicial do nome para o avatar (fallback "?")
   */
  public inicial(nome: string): string {
    return nome?.trim().charAt(0).toUpperCase() || '?';
  }

  /**
   * @description Abre a tela de detalhes/atendimento da consulta selecionada
   */
  public acessarConsulta(id: number): void {
    this.router.navigate(['/veterinario/detalhes-consulta', id]);
  }
}
