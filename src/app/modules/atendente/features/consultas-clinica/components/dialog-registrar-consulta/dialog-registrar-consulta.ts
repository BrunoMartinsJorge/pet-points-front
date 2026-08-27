import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { MessageService } from 'primeng/api';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import type { OptionSelect } from '../../../../../../shared/models/OptionSelect';
import {
  TipoPagamentoEnum,
  TipoPagamentoOpcoes,
} from '../../../../../../shared/models/enums/TipoPagamentoEnum';
import { ConsultasServices } from '../../service/consultas-services';
import type { TiposConsultaDto } from '../../models/TiposConsultaDto';
import type { VeterinarioTipoConsultaDto } from '../../models/VeterinarioTipoConsultaDto';
import type { DiaConsultasVeterinarioDto } from '../../models/DiaConsultasVeterinarioDto';
import type { RegistroConsultaForm } from '../../forms/RegistroConsultaForm';

@Component({
  selector: 'app-dialog-registrar-consulta',
  imports: [PrimeNGModule, FormsModule, StepperModule],
  templateUrl: './dialog-registrar-consulta.html',
  styleUrl: './dialog-registrar-consulta.scss',
})
export class DialogRegistrarConsulta {
  private readonly service = inject(ConsultasServices);
  private readonly toast = inject(MessageService);

  @Input() set visible(value: boolean) {
    this._visible = value;
    if (value) this.aoAbrir();
  }
  get visible(): boolean {
    return this._visible;
  }
  private _visible = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() registrado = new EventEmitter<void>();

  public readonly dataMinima = new Date();
  public readonly formasPagamento = TipoPagamentoOpcoes;

  public tiposConsulta: TiposConsultaDto[] = [];
  public tipoConsultaSelecionado: TiposConsultaDto | null = null;

  public veterinarios: VeterinarioTipoConsultaDto[] = [];
  public veterinarioSelecionado: VeterinarioTipoConsultaDto | null = null;

  public horariosPreenchidos: DiaConsultasVeterinarioDto[] = [];
  public horariosDisponiveis: string[] = [];
  public dataConsulta!: Date;
  public horarioConsulta = '';

  public clientes: OptionSelect[] = [];
  public idClienteSelecionado: number | null = null;

  public pets: OptionSelect[] = [];
  public idPetSelecionado: number | null = null;
  public observacoes = '';
  public formaPagamento: TipoPagamentoEnum = TipoPagamentoEnum.PIX;

  public registrando = false;

  private readonly horariosBase = [
    '08:00', '09:00', '10:00', '11:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00',
  ];

  private aoAbrir(): void {
    this.resetarFormulario();
    this.listarTiposConsulta();
    this.buscarClientes();
  }

  public onVisibleChange(value: boolean): void {
    this._visible = value;
    this.visibleChange.emit(value);
  }

  public selecionarTipoConsulta(tipo: TiposConsultaDto): void {
    this.tipoConsultaSelecionado = tipo;
  }

  public listarVeterinariosTipoConsulta(): void {
    if (!this.tipoConsultaSelecionado) return;
    this.veterinarios = [];
    this.service
      .buscarVeterinariosRelacionadosTipoConsulta(
        this.tipoConsultaSelecionado.id,
      )
      .subscribe({
        next: (veterinarios) => (this.veterinarios = veterinarios),
      });
  }

  public selecionarVeterinario(veterinario: VeterinarioTipoConsultaDto): void {
    this.veterinarioSelecionado = veterinario;
    this.horarioConsulta = '';
    this.buscarHorariosPreenchidos();
  }

  public selecionarData(data: Date): void {
    this.dataConsulta = data;
    this.horarioConsulta = '';
    this.gerarHorarios();
  }

  public selecionarCliente(): void {
    this.idPetSelecionado = null;
    this.pets = [];
    if (!this.idClienteSelecionado) return;
    this.service
      .buscarPetsClienteRegistro(this.idClienteSelecionado)
      .subscribe({
        next: (pets) => (this.pets = pets),
      });
  }

  private buscarHorariosPreenchidos(): void {
    if (!this.veterinarioSelecionado) return;
    this.horariosPreenchidos = [];
    this.service
      .buscarDiasConsultasVeterinario(this.veterinarioSelecionado.id)
      .subscribe({
        next: (horarios) => {
          this.horariosPreenchidos = horarios;
          this.dataConsulta = new Date();
          this.gerarHorarios();
        },
      });
  }

  private gerarHorarios(): void {
    const dia = this.horariosPreenchidos.find((h) =>
      this.mesmoDia(new Date(h.dia), this.dataConsulta),
    );
    const ocupados = (dia?.horariosPreenchidos ?? []).map((horario) =>
      this.normalizarHorario(horario),
    );
    this.horariosDisponiveis = this.horariosBase.filter(
      (horario) => !ocupados.includes(horario),
    );
  }

  /** A API devolve o horário como "HH:mm:ss"; a lista da tela usa "HH:mm". */
  private normalizarHorario(horario: string): string {
    return (horario ?? '').substring(0, 5);
  }

  private mesmoDia(a: Date, b: Date): boolean {
    return (
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
    );
  }

  public get habilitarRegistro(): boolean {
    return (
      !this.registrando &&
      !!this.tipoConsultaSelecionado &&
      !!this.veterinarioSelecionado &&
      !!this.dataConsulta &&
      !!this.horarioConsulta &&
      !!this.idClienteSelecionado &&
      !!this.idPetSelecionado &&
      !!this.formaPagamento
    );
  }

  public registrarConsulta(): void {
    if (!this.habilitarRegistro) return;

    const form: RegistroConsultaForm = {
      idCliente: this.idClienteSelecionado as number,
      idPet: this.idPetSelecionado as number,
      idVeterinario: this.veterinarioSelecionado!.id,
      idTipoConsulta: this.tipoConsultaSelecionado!.id,
      dataConsulta: this.gerarDataHoraConsulta(),
      observacoes: this.observacoes,
      formaPagamento: this.formaPagamento,
    };

    this.registrando = true;
    this.service.registrarConsulta(form).subscribe({
      next: () => {
        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Consulta registrada com sucesso!',
        });
        this.registrando = false;
        this.fechar();
        this.registrado.emit();
      },
      error: () => {
        this.registrando = false;
      },
    });
  }

  private gerarDataHoraConsulta(): string {
    const dataHora = new Date(this.dataConsulta);
    const [horas, minutos] = this.horarioConsulta.split(':').map(Number);
    dataHora.setHours(horas, minutos, 0, 0);

    const ano = dataHora.getFullYear();
    const mes = String(dataHora.getMonth() + 1).padStart(2, '0');
    const dia = String(dataHora.getDate()).padStart(2, '0');
    const hora = String(dataHora.getHours()).padStart(2, '0');
    const minuto = String(dataHora.getMinutes()).padStart(2, '0');

    return `${ano}-${mes}-${dia}T${hora}:${minuto}:00`;
  }

  private listarTiposConsulta(): void {
    this.tiposConsulta = [];
    this.service.buscarTiposConsultaRegistro().subscribe({
      next: (tipos) => (this.tiposConsulta = tipos),
    });
  }

  private buscarClientes(): void {
    this.clientes = [];
    this.service.buscarClientesRegistro().subscribe({
      next: (clientes) => (this.clientes = clientes),
    });
  }

  private resetarFormulario(): void {
    this.tipoConsultaSelecionado = null;
    this.veterinarioSelecionado = null;
    this.veterinarios = [];
    this.horariosPreenchidos = [];
    this.horariosDisponiveis = [];
    this.horarioConsulta = '';
    this.dataConsulta = new Date();
    this.idClienteSelecionado = null;
    this.idPetSelecionado = null;
    this.pets = [];
    this.observacoes = '';
    this.formaPagamento = TipoPagamentoEnum.PIX;
    this.registrando = false;
  }

  public fechar(): void {
    this.onVisibleChange(false);
  }

  public pegarIniciais(nome: string): string {
    const limpo = (nome ?? '').trim();
    if (!limpo) return '';
    return limpo.substring(0, 2);
  }

  public nomeClienteSelecionado(): string {
    return (
      this.clientes.find(
        (cliente) => cliente.value === this.idClienteSelecionado,
      )?.label ?? ''
    );
  }
}
