export interface ItemCobrancaForm {
  idProduto: number;
  quantidade: number;
}

export interface FinalizarConsultaForm {
  resumo: string;
  itens: ItemCobrancaForm[];
}
