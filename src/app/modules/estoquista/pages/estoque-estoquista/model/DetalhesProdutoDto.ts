import type { HistoricoMovimentacoesDto } from "./HistoricoMovimentacoesDto";
import type { ProdutoEstoqueDto } from "../../../../../shared/models/ProdutoEstoqueDto";

export interface DetalhesProdutoDto extends ProdutoEstoqueDto {
    historicoMovimentacoes: HistoricoMovimentacoesDto[];
}