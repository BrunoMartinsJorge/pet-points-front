export interface FiltrosProdutosForm {
    nome: string;
    todosOsProdutos: boolean;
    tipoProduto: string;
    precoMin: number | null;
    precoMax: number | null;
}