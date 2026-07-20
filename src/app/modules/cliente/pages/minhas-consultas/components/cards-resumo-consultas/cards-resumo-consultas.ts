import { Component, Input } from '@angular/core';
import type { InformacoesCardsConsultasClienteDto } from '../../models/InformacoesCardsConsultasClienteDto';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';

@Component({
  selector: 'app-cards-resumo-consultas',
  imports: [PrimeNGModule],
  templateUrl: './cards-resumo-consultas.html',
  styleUrl: './cards-resumo-consultas.scss',
})
export class CardsResumoConsultas {
  @Input() cards: InformacoesCardsConsultasClienteDto | null = null;
  @Input() carregando = false;
}
