import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface CardData {
  titulo: string;
  icone: string;
  descricao?: string;
}

@Component({
  selector: 'app-cards-informacao',
  imports: [CommonModule],
  templateUrl: './cards-informacao.html',
  styleUrl: './cards-informacao.scss',
})
export class CardsInformacao {
  @Input() data: CardData = { titulo: '', icone: '', descricao: '' };
  @Input() style: Record<string, string> = {};
}
