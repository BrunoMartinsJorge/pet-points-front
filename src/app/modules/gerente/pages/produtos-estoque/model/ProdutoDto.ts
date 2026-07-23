export interface ProdutoDto {
  id: number;
  nome: string;
  descricao: string;
  tipo: string;
  valorUnitario: number;
  quantidadeEstoque: number;
  quantidadeMinima: number;
  abaixoEstoque: boolean;
}
