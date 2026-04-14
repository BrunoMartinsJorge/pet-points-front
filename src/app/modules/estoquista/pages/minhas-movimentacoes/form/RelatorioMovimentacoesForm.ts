export interface RelatorioMovimentacoesForm {
  dataInicio: Date | null;
  dataFim: Date | null;
  tipoMovimentacao: string;
  idProduto: number | null;
}
