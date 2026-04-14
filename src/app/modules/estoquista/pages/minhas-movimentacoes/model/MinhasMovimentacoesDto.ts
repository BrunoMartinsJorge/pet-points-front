import type { ProdutoMovimentacaoDto } from './ProdutoMovimentacaoDto';

export interface MinhasMovimentacoesDto {
  id: number;
  dataHora: Date;
  tipoMovimentacao: string;
  quantidadeMovimentada: number;
  produto: ProdutoMovimentacaoDto;
}
