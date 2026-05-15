import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { MinhasConsultasService } from './services/minhas-consultas-service';
import type { ConsultasPendentesConfirmadasDto } from './models/ConsultasPendentesConfirmadasDto';
import { StepperModule } from 'primeng/stepper';
import type { TiposConsultaDto } from './models/TiposConsultaDto';
import type { VeterinarioTipoConsultaDto } from './models/VeterinarioTipoConsultaDto';
import type { DiaConsultasVeterinarioDto } from './models/DiaConsultasVeterinarioDto';
import type { OptionSelect } from '../../../../shared/models/OptionSelect';
import type { SolicitacaoConsultaForm } from './form/SolicitacaoConsultaForm';

@Component({
  selector: 'app-minhas-consultas',
  imports: [PrimeNGModule, StepperModule],
  templateUrl: './minhas-consultas.html',
  styleUrl: './minhas-consultas.scss',
})
export class MinhasConsultas implements OnInit {
  private readonly minhasConsultasService = inject(MinhasConsultasService);
  public consultasPendentesConfirmadas: ConsultasPendentesConfirmadasDto[] = [];
  public tiposConsulta: TiposConsultaDto[] = [];
  public visibilidadeDialogAgendamento = true;
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

  ngOnInit(): void {
    this.listarConsultasPendentesConfirmadasOuIniciadas();
    this.listarTiposConsulta();
    this.buscarPets();
  }

  private listarConsultasPendentesConfirmadasOuIniciadas(): void {
    this.consultasPendentesConfirmadas = [];
    this.minhasConsultasService
      .listarConsultasPendentesConfirmadasOuIniciadas()
      .subscribe({
        next: (consultas) => {
          this.consultasPendentesConfirmadas = consultas;
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
          horarios.push({ dia: new Date(), horariosPreenchidos: ['08:00', '14:00'] });
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

  private gerarDataHoraConsulta(): Date {
    const dataHora = new Date(this.dataConsulta);
    const [hours, minutes] = this.horarioConsulta.split(':').map(Number);
    dataHora.setHours(hours, minutes, 0, 0);
    return dataHora;
  }

  public agendarConsulta(): void {
    const form: SolicitacaoConsultaForm = {
      idPet: this.idPetSelecionado!,
      idVeterinario: this.veterinarioSelecionado!.id,
      idTipoConsulta: this.tipoConsultaSelecionado!.id,
      dataConsulta: this.gerarDataHoraConsulta(),
      observacao: this.observacoes,
    };

    this.minhasConsultasService.agendarConsulta(form).subscribe({
      next: () => {
        this.listarConsultasPendentesConfirmadasOuIniciadas();
      },
    });
  }
}
