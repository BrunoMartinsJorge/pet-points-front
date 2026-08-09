import type { TipoProdutoEnum } from '../../../../../shared/models/enums/TipoProdutoEnum';

export interface EditarProdutoForm {
  nome: string;
  descricao: string;
  tipo: TipoProdutoEnum;
  quantidadeMinima: number;
  valorUnitario: number;
}
