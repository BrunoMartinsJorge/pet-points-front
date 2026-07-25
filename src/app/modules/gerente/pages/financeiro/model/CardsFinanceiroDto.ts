export interface CardsFinanceiroDto {
  receitaMesAtual: number;
  variacaoReceitaMesAtual: number | null;
  receitaHoje: number;
  variacaoReceitaHoje: number | null;
  valorPendente: number;
  quantidadePendentes: number;
  valorEmAtraso: number;
  quantidadeEmAtraso: number;
}
