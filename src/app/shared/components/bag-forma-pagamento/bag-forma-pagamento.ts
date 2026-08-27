import { Component, Input } from '@angular/core';
import { getTagDataTipoPagamento, TipoPagamentoEnum } from '../../models/enums/TipoPagamentoEnum';
import type { TagData } from '../../models/TagData';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-bag-forma-pagamento',
  imports: [TagModule],
  standalone: true,
  templateUrl: './bag-forma-pagamento.html',
  styleUrl: './bag-forma-pagamento.scss',
})
export class BagFormaPagamento {
  @Input() public tipo: TipoPagamentoEnum = TipoPagamentoEnum.DINHEIRO;

  public get getTagData(): TagData {
    return getTagDataTipoPagamento(this.tipo);
  }
}
