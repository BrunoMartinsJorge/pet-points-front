import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { MinhasConsultasService } from './services/minhas-consultas-service';
import { StepperModule } from 'primeng/stepper';
import type { TiposConsultaDto } from './models/TiposConsultaDto';
import type { VeterinarioTipoConsultaDto } from './models/VeterinarioTipoConsultaDto';
import type { DiaConsultasVeterinarioDto } from './models/DiaConsultasVeterinarioDto';
import type { OptionSelect } from '../../../../shared/models/OptionSelect';
import type { SolicitacaoConsultaForm } from './form/SolicitacaoConsultaForm';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BagStatusConsulta } from '../../../../shared/components/bag-status-consulta/bag-status-consulta';
import type { MinhasConsultasDto } from './models/MinhasConsultasDto';
import type { DetalhesConsultaSelecionadaDto } from './models/DetalhesConsultaSelecionadaDto';
import type { CancelarConsultaForm } from './form/CancelarConsultaForm';

@Component({
  selector: 'app-minhas-consultas',
  imports: [PrimeNGModule, StepperModule, BagStatusConsulta],
  providers: [MessageService, ConfirmationService],
  templateUrl: './minhas-consultas.html',
  styleUrl: './minhas-consultas.scss',
})
export class MinhasConsultas implements OnInit {
  private readonly minhasConsultasService = inject(MinhasConsultasService);
  private readonly toast = inject(MessageService);

  public consultasPendentesConfirmadas: MinhasConsultasDto[] = [];
  public historicoConsultas: MinhasConsultasDto[] = [];
  public consultasPendentes: MinhasConsultasDto[] = [];

  public motivoCancelamento = '';

  public visibilidadeDialogAgendamento = false;
  public visibilidadeDialogDetalhesConsulta = false;
  public cancelandoConsulta = false;

  public tiposConsulta: TiposConsultaDto[] = [];
  public tipoConsultaSelecionado: TiposConsultaDto | null = null;
  public veterinarios: VeterinarioTipoConsultaDto[] = [];
  public veterinarioSelecionado: VeterinarioTipoConsultaDto | null = null;
  public horariosPreenchidos: DiaConsultasVeterinarioDto[] = [];
  public readonly dataMinima: Date = new Date();
  public dataConsulta!: Date;
  public horarioConsulta!: string;
  public horariosDisponiveis: string[] = [];
  public pets: OptionSelect[] = [];
  public idPetSelecionado: number | null = null;
  public observacoes = '';
  public formaPagamento = '';

  public consultaSelecionada: MinhasConsultasDto | null = null;
  public detalhesConsultaSelecionada: DetalhesConsultaSelecionadaDto | null =
    null;

  public readonly formasPagamento = [
    {
      label: 'Pix',
      value: 'PIX',
    },
    {
      label: 'Presencial',
      value: 'PRESENCIAL',
    },
  ];

  ngOnInit(): void {
    this.listarHistoricoConsultas();
    this.listarConsultasPendentes();
    this.listarConsultasPendentesConfirmadasOuIniciadas();
    this.listarTiposConsulta();
    this.buscarPets();
  }

  private listarHistoricoConsultas(): void {
    this.historicoConsultas = [];
    this.minhasConsultasService.listarHistoricoConsultas().subscribe({
      next: (response) => {
        this.historicoConsultas = response;
      },
    });
  }

  private listarConsultasPendentes(): void {
    this.consultasPendentes = [];
    this.minhasConsultasService.listarConsultasPendentes().subscribe({
      next: (response) => {
        this.consultasPendentes = response;
      },
    });
  }

  private listarConsultasPendentesConfirmadasOuIniciadas(): void {
    this.consultasPendentesConfirmadas = [];
    this.minhasConsultasService
      .listarConsultasConfirmadasOuIniciadas()
      .subscribe({
        next: (consultas) => {
          this.consultasPendentesConfirmadas = consultas;
        },
      });
  }

  public selecionarConsulta(consulta: MinhasConsultasDto): void {
    this.consultaSelecionada = consulta;
    this.minhasConsultasService.buscarDetalhesConsulta(consulta.id).subscribe({
      next: (detalhes) => {
        this.detalhesConsultaSelecionada = detalhes;
        this.visibilidadeDialogDetalhesConsulta = true;
      },
    });
  }

  public selecionarTipoConsulta(tipoConsulta: TiposConsultaDto): void {
    this.tipoConsultaSelecionado = tipoConsulta;
  }

  public selecionarData(data: Date): void {
    this.dataConsulta = data;
    this.gerarHorarios();
  }

  private buscarPets(): void {
    this.pets = [];
    this.minhasConsultasService.buscarPets().subscribe({
      next: (pets) => {
        this.pets = pets;
      },
    });
  }

  public cancelarConsulta(): void {
    if (!this.consultaSelecionada) return;
    if (this.cancelandoConsulta) {
      this.cancelandoConsulta = false;
      this.motivoCancelamento = '';
      return;
    } else {
      this.cancelandoConsulta = true;
    }
  }

  public confirmarCancelamento(): void {
    if (!this.consultaSelecionada) return;
    const form: CancelarConsultaForm = {
      idConsulta: this.consultaSelecionada.id,
      motivoCancelamento: this.motivoCancelamento,
    };
    this.minhasConsultasService.cancelarConsulta(form).subscribe({
      next: () => {
        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Consulta cancelada com sucesso!',
        });
        this.cancelarConsulta();
        this.visibilidadeDialogDetalhesConsulta = false;
        this.listarConsultasPendentesConfirmadasOuIniciadas();
        this.listarConsultasPendentes();
        this.listarHistoricoConsultas();
      },
    });
  }

  public fecharDialogDetalhesConsulta(): void {
    this.consultaSelecionada = null;
    this.detalhesConsultaSelecionada = null;
    this.visibilidadeDialogDetalhesConsulta = false;
    this.motivoCancelamento = '';
    this.cancelandoConsulta = false;
  }

  public get consultaPodeSerCancelada(): boolean {
    const tipos_nao_cancelaveis = [
      'CANCELADO',
      'REPROVADA',
      'EM_ANDAMENTO',
      'FINALIZADO',
    ];
    return this.consultaSelecionada?.statusConsulta &&
      !tipos_nao_cancelaveis.includes(this.consultaSelecionada.statusConsulta)
      ? true
      : false;
  }

  public get possuiMotivosCancelamentoIndeferimento(): boolean {
    if (!this.consultaSelecionada) return false;
    return (
      this.consultaSelecionada.statusConsulta === 'REPROVADA' ||
      this.consultaSelecionada.statusConsulta === 'CANCELADO'
    );
  }

  public gerarHorarios(): void {
    const base = [
      '08:00',
      '08:30',
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
    ];

    const dia = this.horariosPreenchidos.find((h) =>
      this.mesmoDia(new Date(h.dia), this.dataConsulta),
    );

    const ocupados = dia?.horariosPreenchidos ?? [];

    this.horariosDisponiveis = base.filter((h) => !ocupados.includes(h));
  }

  private mesmoDia(data1: Date, data2: Date): boolean {
    return (
      data1.getDate() === data2.getDate() &&
      data1.getMonth() === data2.getMonth() &&
      data1.getFullYear() === data2.getFullYear()
    );
  }

  private buscarHorariosPreenchidosVeterinario(): void {
    if (!this.veterinarioSelecionado) return;
    this.horariosPreenchidos = [];
    this.minhasConsultasService
      .buscarDiasConsultasVeterinario(this.veterinarioSelecionado.id)
      .subscribe({
        next: (horarios) => {
          this.horariosPreenchidos = horarios;
        },
      });
  }

  public selecionarVeterinario(veterinario: VeterinarioTipoConsultaDto): void {
    this.veterinarioSelecionado = veterinario;
    this.buscarHorariosPreenchidosVeterinario();
  }

  public listarVeterinariosTipoConsulta(): void {
    if (!this.tipoConsultaSelecionado) return;
    this.veterinarios = [];
    this.minhasConsultasService
      .buscarVeterinariosRelacionadosTipoConsulta(
        this.tipoConsultaSelecionado.id,
      )
      .subscribe({
        next: (veterinarios) => {
          this.veterinarios = veterinarios;
        },
      });
  }

  private listarTiposConsulta(): void {
    this.tiposConsulta = [];
    this.minhasConsultasService.buscarTiposConsultasSolcitacao().subscribe({
      next: (tipos) => {
        this.tiposConsulta = tipos;
      },
    });
  }

  private gerarDataHoraConsulta(): string {
    const dataHora = new Date(this.dataConsulta);

    const [hours, minutes] = this.horarioConsulta.split(':').map(Number);

    dataHora.setHours(hours, minutes, 0, 0);

    const ano = dataHora.getFullYear();
    const mes = String(dataHora.getMonth() + 1).padStart(2, '0');
    const dia = String(dataHora.getDate()).padStart(2, '0');

    const hora = String(dataHora.getHours()).padStart(2, '0');
    const minuto = String(dataHora.getMinutes()).padStart(2, '0');

    return `${ano}-${mes}-${dia}T${hora}:${minuto}:00`;
  }

  private limparFormularioSolicitacao(): void {
    this.visibilidadeDialogAgendamento = false;
    this.tipoConsultaSelecionado = null;
    this.veterinarioSelecionado = null;
    this.horarioConsulta = '';
    this.dataConsulta = new Date();
    this.idPetSelecionado = null;
    this.observacoes = '';
    this.formaPagamento = '';
  }

  public agendarConsulta(): void {
    const form: SolicitacaoConsultaForm = {
      idPet: this.idPetSelecionado!,
      idVeterinario: this.veterinarioSelecionado!.id,
      idTipoConsulta: this.tipoConsultaSelecionado!.id,
      dataConsulta: this.gerarDataHoraConsulta(),
      observacao: this.observacoes,
      formaPagamento: this.formaPagamento,
    };

    this.minhasConsultasService.agendarConsulta(form).subscribe({
      next: () => {
        this.limparFormularioSolicitacao();
        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Consulta agendada com sucesso!',
        });
        this.listarConsultasPendentesConfirmadasOuIniciadas();
      },
    });
  }
}
