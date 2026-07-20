import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { MessageService } from 'primeng/api';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import type { OptionSelect } from '../../../../../../shared/models/OptionSelect';
import { TipoPagamentoEnum, TipoPagamentoOpcoes } from '../../../../../../shared/models/enums/TipoPagamentoEnum';
import { MinhasConsultasService } from '../../services/minhas-consultas-service';
import type { TiposConsultaDto } from '../../models/TiposConsultaDto';
import type { VeterinarioTipoConsultaDto } from '../../models/VeterinarioTipoConsultaDto';
import type { DiaConsultasVeterinarioDto } from '../../models/DiaConsultasVeterinarioDto';
import type { SolicitacaoConsultaForm } from '../../form/SolicitacaoConsultaForm';

@Component({
  selector: 'app-dialog-agendar-consulta',
  imports: [PrimeNGModule, FormsModule, StepperModule],
  templateUrl: './dialog-agendar-consulta.html',
  styleUrl: './dialog-agendar-consulta.scss',
})
export class DialogAgendarConsulta {
  private readonly service = inject(MinhasConsultasService);
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
  @Output() agendado = new EventEmitter<void>();

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

  public pets: OptionSelect[] = [];
  public idPetSelecionado: number | null = null;
  public observacoes = '';
  public formaPagamento: TipoPagamentoEnum = TipoPagamentoEnum.PIX;

  private readonly horariosBase = [
    '08:00', '09:00', '10:00', '11:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00',
  ];

  private aoAbrir(): void {
    this.resetarFormulario();
    this.listarTiposConsulta();
    this.buscarPets();
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
      .buscarVeterinariosRelacionadosTipoConsulta(this.tipoConsultaSelecionado.id)
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
    const ocupados = dia?.horariosPreenchidos ?? [];
    this.horariosDisponiveis = this.horariosBase.filter((h) => !ocupados.includes(h));
  }

  private mesmoDia(a: Date, b: Date): boolean {
    return (
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
    );
  }

  public agendarConsulta(): void {
    if (!this.idPetSelecionado || !this.veterinarioSelecionado || !this.tipoConsultaSelecionado) {
      return;
    }

    const form: SolicitacaoConsultaForm = {
      idPet: this.idPetSelecionado,
      idVeterinario: this.veterinarioSelecionado.id,
      idTipoConsulta: this.tipoConsultaSelecionado.id,
      dataConsulta: this.gerarDataHoraConsulta(),
      observacao: this.observacoes,
      formaPagamento: this.formaPagamento,
    };

    this.service.agendarConsulta(form).subscribe({
      next: () => {
        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Consulta agendada com sucesso!',
        });
        this.fechar();
        this.agendado.emit();
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
    this.service.buscarTiposConsultasSolcitacao().subscribe({
      next: (tipos) => (this.tiposConsulta = tipos),
    });
  }

  private buscarPets(): void {
    this.pets = [];
    this.service.buscarPets().subscribe({
      next: (pets) => (this.pets = pets),
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
    this.idPetSelecionado = null;
    this.observacoes = '';
    this.formaPagamento = TipoPagamentoEnum.PIX;
  }

  public fechar(): void {
    this.onVisibleChange(false);
  }

  public pegarIniciais(nome: string): string {
    const limpo = (nome ?? '').trim();
    if (!limpo) return '';
    return limpo.substring(0, 2);
  }
}