import { Component, Input } from '@angular/core';
import { PrimeNGModule } from '../../modules/prime-ng/prime-ng-module';
import { getTagDataGenero } from '../../models/enums/GeneroEnum';
import type { TagData } from '../../models/TagData';

@Component({
  selector: 'app-genero-bag',
  imports: [PrimeNGModule],
  templateUrl: './genero-bag.html',
  styleUrl: './genero-bag.scss',
})
export class GeneroBag {
  @Input() genero: 'M' | 'F' = 'M';

  public get getTagData(): TagData {
    return getTagDataGenero(this.genero);
  }
}
