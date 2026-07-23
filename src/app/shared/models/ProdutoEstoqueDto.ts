import type { TipoProdutoEnum } from "./enums/TipoProdutoEnum";

export interface ProdutoEstoqueDto {
    id: number;
    nome: string;
    tipo: TipoProdutoEnum;
    descricao: string;
    valorUnitario: number;
    quantidadeEstoque: number;
    quantidadeAbaixoEstoque: boolean;
}