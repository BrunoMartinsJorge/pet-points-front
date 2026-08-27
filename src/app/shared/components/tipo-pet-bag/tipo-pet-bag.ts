import { Component, Input } from '@angular/core';
import { PrimeNGModule } from '../../modules/prime-ng/prime-ng-module';

@Component({
  selector: 'app-tipo-pet-bag',
  imports: [PrimeNGModule],
  templateUrl: './tipo-pet-bag.html',
  styleUrl: './tipo-pet-bag.scss',
})
export class TipoPetBag {
  @Input() tipo!: string;
}
