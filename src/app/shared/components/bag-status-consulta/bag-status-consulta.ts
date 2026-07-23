import { Component, Input } from '@angular/core';
import type { StatusConsultaEnum } from '../../models/enums/StatusConsultaEnum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bag-status-consulta',
  imports: [CommonModule],
  templateUrl: './bag-status-consulta.html',
  styleUrl: './bag-status-consulta.scss',
})
export class BagStatusConsulta {
  @Input() status: StatusConsultaEnum | null | undefined = null;

  public get getTexto(): string {
    if (this.status == null || this.status == undefined) return '';
    return this.status.toString();
  }
}
