import type { OnChanges, SimpleChanges } from '@angular/core';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import { ConfirmationService, MessageService } from 'primeng/api';
import type { MinhasConsultasDto } from '../../models/MinhasConsultasDto';
import { MinhasConsultasService } from '../../services/minhas-consultas-service';
import type { DiaConsultasVeterinarioDto } from '../../models/DiaConsultasVeterinarioDto';
import type { ReagendarConsultaForm } from './form/ReagendarConsultaForm';

@Component({
  selector: 'app-reagendar-consulta',
  imports: [PrimeNGModule],
  templateUrl: './reagendar-consulta.html',
  styleUrl: './reagendar-consulta.scss',
})
export class ReagendarConsulta implements OnChanges {
  private readonly service = inject(MinhasConsultasService);
  private readonly confirm = inject(ConfirmationService);
  private readonly toast = inject(MessageService);

  @Input() consulta: MinhasConsultasDto | null = null;

  public dataConsulta = new Date();
  public horarioConsulta = '';
  public horariosPreenchidos: DiaConsultasVeterinarioDto[] = [];
  public horariosDisponiveis: string[] = [];
  private readonly horariosBase = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ];

  @Input() set visible(value: boolean) {
    this._visible = value;
  }

  get visible(): boolean {
    return this._visible;
  }

  private _visible = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() reagendado = new EventEmitter<void>();

  public onVisibleChange(value: boolean): void {
    this._visible = value;
    this.visibleChange.emit(value);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['consulta']) {
      this.buscarHorariosPreenchidos();
      if (this.consulta) {
        const horario = new Date(
          this.consulta.dataHoraConsulta,
        ).toLocaleTimeString();
        this.dataConsulta = new Date(this.consulta.dataHoraConsulta);
        this.horarioConsulta = horario.slice(0, 5);
      }
    }
  }

  public get dataDiferente(): boolean {
    if (!this.consulta) return false;
    const horario = new Date(
      this.consulta.dataHoraConsulta,
    ).toLocaleTimeString();
    if (horario === '' || horario === null || this.horarioConsulta === '') return false;
    return (
      this.dataConsulta.getDate() !== new Date().getDate() ||
      this.dataConsulta.getMonth() !== new Date().getMonth() ||
      this.dataConsulta.getFullYear() !== new Date().getFullYear() ||
      this.horarioConsulta !== horario.slice(0, 5)
    );
  }

  public readonly dataMinima = new Date();

  public selecionarData(data: Date): void {
    this.dataConsulta = data;
    this.horarioConsulta = '';
    this.gerarHorarios();
  }

  private buscarHorariosPreenchidos(): void {
    if (!this.consulta) return;
    this.horariosPreenchidos = [];
    this.service
      .buscarDiasConsultasVeterinario(this.consulta.idVeterinario)
      .subscribe({
        next: (horarios) => {
          this.horariosPreenchidos = horarios;
          this.dataConsulta = new Date();
          this.gerarHorarios();
        },
      });
  }

  private mesmoDia(a: Date, b: Date): boolean {
    return (
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
    );
  }

  private gerarHorarios(): void {
    const dia = this.horariosPreenchidos.find((h) =>
      this.mesmoDia(new Date(h.dia), this.dataConsulta),
    );
    const ocupados = dia?.horariosPreenchidos ?? [];
    this.horariosDisponiveis = this.horariosBase.filter(
      (h) => !ocupados.includes(h),
    );
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

  public reagendarConsulta(): void {
    if (!this.consulta) return;
    this.confirm.confirm({
      header: 'Reagendar Consulta',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'danger',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Reagendar',
        severity: 'success',
      },
      message: 'Tem certeza que deseja reagendar essa consulta?',
      accept: () => {
        if (!this.consulta) return;
        const payload: ReagendarConsultaForm = {
          dataConsulta: this.gerarDataHoraConsulta(),
          idConsulta: this.consulta.id!,
        };
        this.service.reagendarConsulta(payload).subscribe({
          next: () => {
            this.toast.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Consulta reagendada com sucesso!',
            });
            this.onVisibleChange(false);
            this.reagendado.emit();
          },
        });
      },
    });
  }
}
