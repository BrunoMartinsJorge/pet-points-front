import { Component, Input } from '@angular/core';
import { getTagDataAtendimento, StatusAtendimentoEnum } from '../../models/enums/StatusAtendimentoEnum';
import type { TagData } from '../../models/TagData';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-bag-status-atendimento',
  imports: [TagModule],
  templateUrl: './bag-status-atendimento.html',
  styleUrl: './bag-status-atendimento.scss',
})
export class BagStatusAtendimento {
  @Input() public status: StatusAtendimentoEnum = StatusAtendimentoEnum.PENDENTE;

  public get getTagData(): TagData {
    return getTagDataAtendimento(this.status);
  }
}
