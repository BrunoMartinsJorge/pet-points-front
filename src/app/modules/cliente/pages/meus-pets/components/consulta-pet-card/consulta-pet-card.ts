import { Component, Input } from '@angular/core';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import type { MeuPetConsultaDto } from '../../models/MeuPetConsultaDto';
import { BagStatusConsulta } from "../../../../../../shared/components/bag-status-consulta/bag-status-consulta";

@Component({
  selector: 'app-consulta-pet-card',
  imports: [PrimeNGModule, BagStatusConsulta],
  templateUrl: './consulta-pet-card.html',
  styleUrl: './consulta-pet-card.scss',
})
export class ConsultaPetCard {
  @Input() consulta: MeuPetConsultaDto | null = null;
}
