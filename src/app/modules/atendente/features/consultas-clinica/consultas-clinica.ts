import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { ConsultasServices } from './service/consultas-services';
import type { ConsultasAtendenteDto } from './models/ConsultasAtendenteDto';
import type { IndeferirConsultaForm } from './forms/IndeferirConsultaForm';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DetalhesConsulta } from "./components/detalhes-consulta/detalhes-consulta";

@Component({
  selector: 'app-consultas-clinica',
  imports: [PrimeNGModule, DetalhesConsulta],
  templateUrl: './consultas-clinica.html',
  styleUrl: './consultas-clinica.scss',
})
export class ConsultasClinica implements OnInit {
  private readonly service = inject(ConsultasServices);
  private readonly toast = inject(MessageService);
  private readonly confirmService = inject(ConfirmationService);

  public consultas: ConsultasAtendenteDto[] = [];
  public carregandoConsultas = false;

  public solicitacoesConsultas: ConsultasAtendenteDto[] = [];
  public carregandoSolicitacoes = false;

  public solicitacaoConsultaSelecionada: IndeferirConsultaForm = {
    idConsulta: 0,
    motivo: '',
  };
  public visibilidadeSolicitacaoConsulta = false;
  public desabilitarAcoes = false;

  public consultaSelecionada: ConsultasAtendenteDto | null = null;
  public visibilidadeDialogDetalhesConsulta = false;

  public ngOnInit(): void {
    this.buscarConsultas();
    this.buscarSolicitacoes();
  }

  public buscarConsultas(): void {
    this.consultas = [];
    this.carregandoConsultas = true;
    this.service.buscarHistoricoConsultas().subscribe({
      next: (response: ConsultasAtendenteDto[]) => {
        this.consultas = response;
        this.carregandoConsultas = false;
      },
      error: () => {
        this.carregandoConsultas = false;
      },
    });
  }

  public buscarSolicitacoes(): void {
    this.solicitacoesConsultas = [];
    this.carregandoSolicitacoes = true;
    this.service.buscarSolicitacoesConsultas().subscribe({
      next: (response: ConsultasAtendenteDto[]) => {
        this.solicitacoesConsultas = response;
        this.carregandoSolicitacoes = false;
      },
      error: () => {
        this.carregandoSolicitacoes = false;
      },
    });
  }

  public gerarTextoCancelamentoIndeferimento(
    consulta: ConsultasAtendenteDto,
  ): string {
    if (consulta.status.toString() == 'Cancelado') {
      return (
        'Motivo Cancelamento: ' + (consulta.motivoCancelamento || 'Sem motivo')
      );
    } else {
      return (
        'Motivo Indeferimento: ' +
        (consulta.motivoIndeferimento || 'Sem motivo')
      );
    }
  }

  public selecionarConsulta(consulta: ConsultasAtendenteDto): void {
    this.consultaSelecionada = consulta;
    this.visibilidadeDialogDetalhesConsulta = true;
  }

  public fecharDialogDetalhesConsulta(): void {
    this.consultaSelecionada = null;
    this.visibilidadeDialogDetalhesConsulta = false;
  }

  public selecionarSolicitacaoConsulta(consulta: ConsultasAtendenteDto): void {
    this.solicitacaoConsultaSelecionada.idConsulta = consulta.id;
    this.visibilidadeSolicitacaoConsulta = true;
  }

  public get habilitarBotaoEnviarReprova(): boolean {
    return (
      this.solicitacaoConsultaSelecionada.motivo.trim().length > 0 &&
      this.solicitacaoConsultaSelecionada.idConsulta > 0
    );
  }

  public aprovarConsulta(consulta: ConsultasAtendenteDto): void {
    this.desabilitarAcoes = true;
    this.confirmService.confirm({
      header: 'Aprovar Consulta',
      message: 'Tem certeza que deseja aprovar essa consulta?',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'danger',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Aprovar',
        severity: 'success',
      },

      accept: () => {
        this.service.aprovarSolicitacaoConsulta(consulta.id).subscribe({
          next: () => {
            this.toast.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Consulta aprovada com sucesso!',
            });
            this.buscarConsultas();
            this.buscarSolicitacoes();
            this.visibilidadeSolicitacaoConsulta = false;
            this.solicitacaoConsultaSelecionada = {
              idConsulta: 0,
              motivo: '',
            };
            this.desabilitarAcoes = false;
          },
          error: () => {
            this.desabilitarAcoes = false;
          },
        });
      },
    });
  }

  // Tenho que lembrar de notificar o cliente quando for aprovado ou reprovado
  public reprovarConsulta(): void {
    if (!this.habilitarBotaoEnviarReprova) return;
    this.desabilitarAcoes = true;
    this.confirmService.confirm({
      header: 'Reprovar Consulta',
      message: 'Tem certeza que deseja reprovar essa consulta?',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'success',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Reprovar',
        severity: 'danger',
      },

      accept: () => {
        this.service
          .reprovarSolicitacaoConsulta(this.solicitacaoConsultaSelecionada)
          .subscribe({
            next: () => {
              this.toast.add({
                severity: 'warn',
                summary: 'Sucesso',
                detail: 'Consulta reprovada com sucesso!',
              });
              this.buscarConsultas();
              this.buscarSolicitacoes();
              this.visibilidadeSolicitacaoConsulta = false;
              this.solicitacaoConsultaSelecionada = {
                idConsulta: 0,
                motivo: '',
              };
              this.desabilitarAcoes = false;
            },
            error: () => {
              this.desabilitarAcoes = false;
            },
          });
      },
    });
  }
}
