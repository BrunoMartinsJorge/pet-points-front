import type { OnChanges, SimpleChanges } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { MinhasConsultasDto } from '../../models/MinhasConsultasDto';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';

@Component({
  selector: 'app-proxima-consulta-cliente',
  imports: [PrimeNGModule],
  templateUrl: './proxima-consulta-cliente.html',
  styleUrl: './proxima-consulta-cliente.scss',
})
export class ProximaConsultaCliente implements OnChanges {
  @Input() public proximaConsulta: MinhasConsultasDto | null = null;
  @Output() public verDetalhes = new EventEmitter<void>();

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['proximaConsulta'])
      this.proximaConsulta = changes['proximaConsulta'].currentValue;
  }

  public selecionarConsulta(): void {
    this.verDetalhes.emit();
  }
}
