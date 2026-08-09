import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CORES_POR_TIPO_LOG } from '../../../../../../shared/styles/cores-logs';
import type { TipoLogEnum } from '../../models/TipoLogEnum';

@Component({
  selector: 'app-bag-log',
  imports: [CommonModule],
  templateUrl: './bag-log.html',
  styleUrl: './bag-log.scss',
})
export class BagLog {
  @Input() tipoLog: TipoLogEnum | null = null;

  protected get corVariavel(): string {
    return this.tipoLog
      ? (CORES_POR_TIPO_LOG[this.tipoLog] ?? '--color-border')
      : '--color-border';
  }

  public get formatarLabel(): string {
    if (!this.tipoLog) return 'Sem Tipo!';
    let formatada = '';
    const labelSplit: string[] = this.tipoLog.toString().split('_');
    if (labelSplit.length > 1) {
      const primeiraParte =
        labelSplit[0].charAt(0).toUpperCase() +
        labelSplit[0].slice(1).toLocaleLowerCase();
      const segundaParte =
        labelSplit[1].charAt(0).toUpperCase() +
        labelSplit[1].slice(1).toLocaleLowerCase();
      formatada = `${primeiraParte} ${segundaParte}`;
    } else {
      const primeiro =
        labelSplit[0].charAt(0).toUpperCase() +
        labelSplit[0].slice(1).toLocaleLowerCase();
      formatada = `${primeiro}`;
    }
    return formatada;
  }
}
