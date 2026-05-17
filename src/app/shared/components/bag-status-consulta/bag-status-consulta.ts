import { Component, Input } from '@angular/core';
import type { StatusConsultaEnum } from '../../models/enums/StatusConsultaEnum';

@Component({
  selector: 'app-bag-status-consulta',
  imports: [],
  templateUrl: './bag-status-consulta.html',
  styleUrl: './bag-status-consulta.scss',
})
export class BagStatusConsulta {
  @Input() status: StatusConsultaEnum | null | undefined = null;

  public get getTexto(): string {
    return this.status === null || this.status === undefined ? '' : this.status.toString()[0] + this.status.toString().slice(1).toLowerCase();
  }
}
