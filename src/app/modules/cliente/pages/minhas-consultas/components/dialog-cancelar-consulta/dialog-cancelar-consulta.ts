import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import { MinhasConsultasService } from '../../services/minhas-consultas-service';
import type { MinhasConsultasDto } from '../../models/MinhasConsultasDto';
import type { CancelarConsultaForm } from '../../form/CancelarConsultaForm';

@Component({
  selector: 'app-dialog-cancelar-consulta',
  imports: [PrimeNGModule, FormsModule],
  templateUrl: './dialog-cancelar-consulta.html',
  styleUrl: './dialog-cancelar-consulta.scss',
})
export class DialogCancelarConsulta {
  private readonly service = inject(MinhasConsultasService);
  private readonly toast = inject(MessageService);

  @Input() consulta: MinhasConsultasDto | null = null;

  @Input() set visible(value: boolean) {
    this._visible = value;
    if (value) this.motivoCancelamento = '';
  }
  get visible(): boolean {
    return this._visible;
  }
  private _visible = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() cancelado = new EventEmitter<void>();

  public motivoCancelamento = '';

  public onVisibleChange(value: boolean): void {
    this._visible = value;
    this.visibleChange.emit(value);
  }

  public confirmarCancelamento(): void {
    if (!this.consulta || !this.motivoCancelamento) return;

    const form: CancelarConsultaForm = {
      idConsulta: this.consulta.id,
      motivoCancelamento: this.motivoCancelamento,
    };

    this.service.cancelarConsulta(form).subscribe({
      next: () => {
        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Consulta cancelada com sucesso!',
        });
        this.onVisibleChange(false);
        this.cancelado.emit();
      },
    });
  }
}