import type { TipoProdutoEnum } from '../../../../../shared/models/enums/TipoProdutoEnum';

export interface NovoProdutoForm {
  nome: string;
  descricao: string;
  tipo: TipoProdutoEnum;
  quantidade: number;
  quantidadeMinima: number;
  valorUnitario: number;
}
