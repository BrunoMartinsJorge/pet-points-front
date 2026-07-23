import { Component, Input } from '@angular/core';
import { GeneroTransformPipe } from "../../pipes/genero-transform-pipe";

@Component({
  selector: 'app-genero-bag',
  imports: [GeneroTransformPipe],
  templateUrl: './genero-bag.html',
  styleUrl: './genero-bag.scss',
})
export class GeneroBag {
  @Input() genero: 'M' | 'F' = 'M';
}
