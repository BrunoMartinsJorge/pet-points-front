import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { ConsultasServices } from './service/consultas-services';
import type { ConsultasAtendenteDto } from './models/ConsultasAtendenteDto';
import type { IndeferirConsultaForm } from './forms/IndeferirConsultaForm';
import type { PendenciasFinanceirasClienteDto } from './models/PendenciasFinanceirasClienteDto';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DetalhesConsulta } from './components/detalhes-consulta/detalhes-consulta';
import { BagStatusConsulta } from "../../../../shared/components/bag-status-consulta/bag-status-consulta";
import { BagStatusPagamento } from "../../../../shared/components/bag-status-pagamento/bag-status-pagamento";
import { DialogRegistrarConsulta } from './components/dialog-registrar-consulta/dialog-registrar-consulta';
import { StatusConsultaEnum } from '../../../../shared/models/enums/StatusConsultaEnum';
import { Imagem } from '../../../../shared/components/imagem/imagem';
import { urlArquivo } from '../../../../shared/utils/imagem-url';

@Component({
  selector: 'app-consultas-clinica',
  imports: [PrimeNGModule, DetalhesConsulta, BagStatusConsulta, BagStatusPagamento, DialogRegistrarConsulta, Imagem],
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

  public visibilidadeDialogRegistrarConsulta = false;

  public solicitacaoParaAprovar: ConsultasAtendenteDto | null = null;
  public visibilidadeDialogAprovarConsulta = false;
  public pendenciasCliente: PendenciasFinanceirasClienteDto | null = null;
  public carregandoPendencias = false;
  public erroAoCarregarPendencias = false;

  public ngOnInit(): void {
    this.verificarRedirecionamento();
    this.buscarConsultas();
    this.buscarSolicitacoes();
  }

  private verificarRedirecionamento(): void {
    const idSelecionado = this.service.idConsultaSelecionada;
    if (idSelecionado == null) return;
    this.consultaSelecionada = null;
    this.visibilidadeDialogDetalhesConsulta = false;
    this.service.buscarConsultaPreSelecionada().subscribe({
      next: (response: ConsultasAtendenteDto) => {
        this.consultaSelecionada = response;
        this.visibilidadeDialogDetalhesConsulta = true;
        setTimeout(() => {
          this.service.redirecionado = false;
          this.service.idConsultaSelecionada = null;
        });
      },
    });
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

  public urlImagem(uuid: string | null | undefined): string {
    return urlArquivo(uuid);
  }

  public consultaRecusada(consulta: ConsultasAtendenteDto): boolean {
    return (
      consulta.status === StatusConsultaEnum.CANCELADO ||
      consulta.status === StatusConsultaEnum.REPROVADA
    );
  }

  public gerarTextoCancelamentoIndeferimento(
    consulta: ConsultasAtendenteDto,
  ): string {
    if (consulta.status === StatusConsultaEnum.CANCELADO) {
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

  public abrirDialogRegistrarConsulta(): void {
    this.visibilidadeDialogRegistrarConsulta = true;
  }

  public consultaRegistrada(): void {
    this.buscarConsultas();
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

  /**
   *
   * @description - Abre a confirmação de aprovação já carregando a situação
   * financeira do cliente, para que o atendente decida sabendo se existem
   * cobranças em aberto ou atrasadas
   */
  public abrirDialogAprovarConsulta(consulta: ConsultasAtendenteDto): void {
    this.solicitacaoParaAprovar = consulta;
    this.visibilidadeDialogAprovarConsulta = true;
    this.buscarPendenciasCliente(consulta.idSolicitante);
  }

  public fecharDialogAprovarConsulta(): void {
    this.solicitacaoParaAprovar = null;
    this.pendenciasCliente = null;
    this.erroAoCarregarPendencias = false;
    this.visibilidadeDialogAprovarConsulta = false;
  }

  public buscarPendenciasCliente(idCliente: number): void {
    this.pendenciasCliente = null;
    this.erroAoCarregarPendencias = false;
    this.carregandoPendencias = true;
    this.service.buscarPendenciasFinanceirasCliente(idCliente).subscribe({
      next: (response: PendenciasFinanceirasClienteDto) => {
        this.pendenciasCliente = response;
        this.carregandoPendencias = false;
      },
      error: () => {
        this.erroAoCarregarPendencias = true;
        this.carregandoPendencias = false;
      },
    });
  }

  public recarregarPendenciasCliente(): void {
    if (!this.solicitacaoParaAprovar) return;
    this.buscarPendenciasCliente(this.solicitacaoParaAprovar.idSolicitante);
  }

  public get clientePossuiPendencias(): boolean {
    return (this.pendenciasCliente?.quantidadePendentes ?? 0) > 0;
  }

  public get clientePossuiAtrasos(): boolean {
    return (this.pendenciasCliente?.quantidadeAtrasadas ?? 0) > 0;
  }

  public aprovarConsulta(): void {
    if (!this.solicitacaoParaAprovar) return;
    const idConsulta = this.solicitacaoParaAprovar.id;
    this.desabilitarAcoes = true;
    this.service.aprovarSolicitacaoConsulta(idConsulta).subscribe({
      next: () => {
        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Consulta aprovada com sucesso!',
        });
        this.buscarConsultas();
        this.buscarSolicitacoes();
        this.visibilidadeDialogAprovarConsulta = false;
        this.fecharDialogAprovarConsulta();
        this.desabilitarAcoes = false;
      },
      error: () => {
        this.desabilitarAcoes = false;
      },
    });
  }

  // Tenho que lembrar de notificar o cliente quando for aprovado ou reprovado
  public reprovarConsulta(): void {
    if (!this.habilitarBotaoEnviarReprova) return;
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
        this.desabilitarAcoes = true;
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
