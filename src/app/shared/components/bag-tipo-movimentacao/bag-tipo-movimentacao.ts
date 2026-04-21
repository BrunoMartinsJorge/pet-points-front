import { Component, Input } from '@angular/core';
import type { TipoMovimentacaoEnum } from '../../models/enums/TipoMovimentacaoEnum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bag-tipo-movimentacao',
  imports: [CommonModule],
  templateUrl: './bag-tipo-movimentacao.html',
  styleUrl: './bag-tipo-movimentacao.scss',
})
export class BagTipoMovimentacao {
  @Input() tipoMovimentacao: TipoMovimentacaoEnum | null = null;
}
