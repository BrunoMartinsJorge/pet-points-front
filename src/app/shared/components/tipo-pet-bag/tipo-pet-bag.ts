import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tipo-pet-bag',
  imports: [],
  templateUrl: './tipo-pet-bag.html',
  styleUrl: './tipo-pet-bag.scss',
})
export class TipoPetBag {
  @Input() tipo!: string;
}
