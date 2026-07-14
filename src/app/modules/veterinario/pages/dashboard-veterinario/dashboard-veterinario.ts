import { Component, inject } from '@angular/core';
import type { OnInit } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { DashboardVeterinarioService } from './service/dashboard-veterinario-service';
import { BagStatusConsulta } from '../../../../shared/components/bag-status-consulta/bag-status-consulta';
import type { ConsultasVeterinarioDashboardDto } from './models/ConsultasVeterinarioDashboardDto';
import type { AvaliacoesVeterinarioDashboardDto } from './models/AvaliacoesVeterinarioDashboardDto';
import type { CardsVeterinarioDashboardDto } from './models/CardsVeterinarioDashboardDto';

@Component({
  selector: 'app-dashboard-veterinario',
  imports: [PrimeNGModule, BagStatusConsulta],
  templateUrl: './dashboard-veterinario.html',
  styleUrl: './dashboard-veterinario.scss',
})
export class DashboardVeterinario implements OnInit {
  private readonly service = inject(DashboardVeterinarioService);
  public cards: CardsVeterinarioDashboardDto = {
    consultasFinalizadas: 0,
    totalConsultas: 0,
    ranking: 0,
  };
  public carregandoCards = true;

  public consultas: ConsultasVeterinarioDashboardDto[] = [];
  public carregandoConsultas = true;

  public avaliacoes: AvaliacoesVeterinarioDashboardDto[] = [];
  public carregandoAvaliacoes = true;

  public ngOnInit(): void {
    this.buscarCards();
    this.buscarConsultasDiarias();
    this.buscarAvaliacoes();
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
    this.carregandoConsultas = true;
    this.service.buscarListaConsultasDia().subscribe({
      next: (consultas) => {
        this.consultas = consultas;
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
}
