import { Component, Input } from '@angular/core';
import type { FuncionarioDto } from '../../models/FuncionarioDto';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';

@Component({
  selector: 'app-card-funcionario',
  imports: [PrimeNGModule],
  templateUrl: './card-funcionario.html',
  styleUrl: './card-funcionario.scss',
})
export class CardFuncionario {
  @Input() funcionario: FuncionarioDto | null = null;
}
