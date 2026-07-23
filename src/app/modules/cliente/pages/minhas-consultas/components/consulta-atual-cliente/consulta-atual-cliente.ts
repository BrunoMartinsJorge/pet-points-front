import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { MinhasConsultasDto } from '../../models/MinhasConsultasDto';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';

@Component({
  selector: 'app-consulta-atual-cliente',
  imports: [PrimeNGModule],
  templateUrl: './consulta-atual-cliente.html',
  styleUrl: './consulta-atual-cliente.scss',
})
export class ConsultaAtualCliente {
  @Input() public consultaAtual: MinhasConsultasDto | null = null;
  @Output() public verDetalhes = new EventEmitter<void>();

  public selecionarConsulta(): void {
    this.verDetalhes.emit();
  }
}
