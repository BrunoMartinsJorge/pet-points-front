import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

/** Tom da linha de descrição, para indicadores que sobem ou descem. */
export type TomDescricaoCardResumo = 'neutro' | 'positivo' | 'negativo';

/**
 * Cor do ícone do card. Cada variante reaproveita as cores de status já usadas
 * no resto do sistema, para os cards de resumo ficarem iguais em todas as telas.
 */
export type VarianteCardResumo =
  | 'sucesso'
  | 'pendente'
  | 'perigo'
  | 'info'
  | 'primario'
  | 'neutro';

/**
 * Card de resumo padrão do sistema: ícone colorido à esquerda, título e uma
 * linha de valor em destaque seguida da descrição.
 */
@Component({
  selector: 'app-card-resumo',
  imports: [CommonModule],
  templateUrl: './card-resumo.html',
  styleUrl: './card-resumo.scss',
})
export class CardResumo {
  @Input() titulo = '';
  @Input() icone = '';
  @Input() valor: string | number | null = null;
  @Input() descricao = '';
  @Input() variante: VarianteCardResumo = 'neutro';
  @Input() tomDescricao: TomDescricaoCardResumo = 'neutro';
}
