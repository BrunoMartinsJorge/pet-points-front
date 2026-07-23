import { Component, Input } from '@angular/core';
import type { TipoLogEnum } from '../../models/TipoLogEnum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bag-log',
  imports: [CommonModule],
  templateUrl: './bag-log.html',
  styleUrl: './bag-log.scss',
})
export class BagLog {
  @Input() tipoLog: TipoLogEnum | null = null;
}
