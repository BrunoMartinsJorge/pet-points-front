import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { MessageService } from 'primeng/api';
import { MinhasConsultasService } from './services/minhas-consultas-service';
import type { MinhasConsultasDto } from './models/MinhasConsultasDto';
import type { InformacoesCardsConsultasClienteDto } from './models/InformacoesCardsConsultasClienteDto';
import { ProximaConsultaCliente } from './components/proxima-consulta-cliente/proxima-consulta-cliente';
import { ConsultaAtualCliente } from './components/consulta-atual-cliente/consulta-atual-cliente';
import { CardsResumoConsultas } from './components/cards-resumo-consultas/cards-resumo-consultas';
import { HistoricoConsultas } from './components/historico-consultas/historico-consultas';
import { DialogAgendarConsulta } from './components/dialog-agendar-consulta/dialog-agendar-consulta';
import { DialogDetalhesConsulta } from './components/dialog-detalhes-consulta/dialog-detalhes-consulta';
import { DialogCancelarConsulta } from './components/dialog-cancelar-consulta/dialog-cancelar-consulta';

@Component({
  selector: 'app-minhas-consultas',
  imports: [
    PrimeNGModule,
    ProximaConsultaCliente,
    ConsultaAtualCliente,
    CardsResumoConsultas,
    HistoricoConsultas,
    DialogAgendarConsulta,
    DialogDetalhesConsulta,
    DialogCancelarConsulta,
  ],
  providers: [MessageService],
  templateUrl: './minhas-consultas.html',
  styleUrl: './minhas-consultas.scss',
})
export class MinhasConsultas implements OnInit {
  private readonly service = inject(MinhasConsultasService);

  public consultaAtual: MinhasConsultasDto | null = null;
  public proximaConsulta: MinhasConsultasDto | null = null;
  public historicoConsultas: MinhasConsultasDto[] = [];
  public cards: InformacoesCardsConsultasClienteDto | null = null;

  public consultaSelecionada: MinhasConsultasDto | null = null;

  public carregandoProximaConsulta = false;
  public carregandoConsultaAtual = false;
  public carregandoInformacoesCards = false;
  public carregandoHistoricoConsultas = false;

  public visibilidadeAgendamento = false;
  public visibilidadeDetalhes = false;
  public visibilidadeCancelamento = false;

  ngOnInit(): void {
    this.buscarConsultaAtual();
    this.buscarProximaConsulta();
    this.buscarInformacoesCards();
    this.listarHistoricoConsultas();
    this.existeConsultaPreSelecionada();
  }

  public selecionarConsulta(consulta: MinhasConsultasDto): void {
    this.consultaSelecionada = consulta;
    this.visibilidadeDetalhes = true;
  }

  public abrirCancelamento(consulta: MinhasConsultasDto): void {
    this.consultaSelecionada = consulta;
    this.visibilidadeCancelamento = true;
  }

  public abrirAgendamento(): void {
    this.visibilidadeAgendamento = true;
  }

  /** Recarrega tudo que depende do estado das consultas (agendar / cancelar / avaliar / etc). */
  public aoAtualizarConsultas(): void {
    this.buscarConsultaAtual();
    this.buscarProximaConsulta();
    this.buscarInformacoesCards();
    this.listarHistoricoConsultas();
  }

  private buscarConsultaAtual(): void {
    this.carregandoConsultaAtual = true;
    this.consultaAtual = null;
    this.service.buscarConsultaAtual().subscribe({
      next: (consulta) => {
        this.consultaAtual = consulta;
        this.carregandoConsultaAtual = false;
      },
      error: () => (this.carregandoConsultaAtual = false),
    });
  }

  private buscarProximaConsulta(): void {
    this.carregandoProximaConsulta = true;
    this.proximaConsulta = null;
    this.service.buscarProximaConsulta().subscribe({
      next: (consulta) => {
        this.proximaConsulta = consulta;
        this.carregandoProximaConsulta = false;
      },
      error: () => (this.carregandoProximaConsulta = false),
    });
  }

  private buscarInformacoesCards(): void {
    this.carregandoInformacoesCards = true;
    this.cards = null;
    this.service.buscarInformacoesCards().subscribe({
      next: (cards) => {
        this.cards = cards;
        this.carregandoInformacoesCards = false;
      },
      error: () => (this.carregandoInformacoesCards = false),
    });
  }

  private listarHistoricoConsultas(): void {
    this.carregandoHistoricoConsultas = true;
    this.historicoConsultas = [];
    this.service.listarHistoricoConsultas().subscribe({
      next: (consultas) => {
        this.historicoConsultas = consultas;
        this.carregandoHistoricoConsultas = false;
      },
      error: () => (this.carregandoHistoricoConsultas = false),
    });
  }

  private existeConsultaPreSelecionada(): void {
    if (!this.service.acessoPorPetSelecionado) return;

    const preSelecionada = this.service.consultaSelecionada;
    if (preSelecionada) {
      this.selecionarConsulta(preSelecionada);
      this.service.acessoPorPetSelecionado = false;
      return;
    }

    this.service.buscarConsultaPorId().subscribe({
      next: (consulta) => {
        if (!consulta) return;
        this.service.consultaSelecionada = consulta;
        this.selecionarConsulta(consulta);
        this.service.acessoPorPetSelecionado = false;
      },
    });
  }
}