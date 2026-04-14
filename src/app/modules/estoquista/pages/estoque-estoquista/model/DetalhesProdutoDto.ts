import type { HistoricoMovimentacoesDto } from "./HistoricoMovimentacoesDto";
import type { ProdutoEstoqueDto } from "./ProdutoEstoqueDto";

export interface DetalhesProdutoDto extends ProdutoEstoqueDto {
    historicoMovimentacoes: HistoricoMovimentacoesDto[];
}