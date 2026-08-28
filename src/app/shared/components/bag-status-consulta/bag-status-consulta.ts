import { Component, Input } from '@angular/core';
import { getTagData, type StatusConsultaEnum } from '../../models/enums/StatusConsultaEnum';
import { PrimeNGModule } from '../../modules/prime-ng/prime-ng-module';
import type { TagData } from '../../models/TagData';

@Component({
  selector: 'app-bag-status-consulta',
  imports: [PrimeNGModule],
  templateUrl: './bag-status-consulta.html',
  styleUrl: './bag-status-consulta.scss',
})
export class BagStatusConsulta {
  @Input() status: StatusConsultaEnum | null | undefined = null;

  public get getTagData(): TagData {
    return getTagData(this.status);
  }
}
