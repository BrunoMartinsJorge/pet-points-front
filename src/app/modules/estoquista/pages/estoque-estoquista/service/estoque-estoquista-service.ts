import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { CardsEstoqueDto } from '../model/CardsEstoqueDto';
import type { ProdutoEstoqueDto } from '../../../../../shared/models/ProdutoEstoqueDto';
import type { FiltrosProdutosForm } from '../forms/FiltrosProdutosForm';
import type { DetalhesProdutoDto } from '../model/DetalhesProdutoDto';

@Injectable({
  providedIn: 'root',
})
export class EstoqueEstoquistaService {
  private readonly URL = '/estoquista/estoque';
  private readonly http = inject(HttpClient);

  /**
   *
   * @description Busca as informações para os cards do estoque, como valor total, quantidade de produtos e produtos abaixo do estoque.
   * @returns {Observable<CardsEstoqueDto>} - Retorna um Observable contendo as informações para os cards do estoque, como valor total, quantidade de produtos e produtos abaixo do estoque.
   */
  public buscarInformacoesCards(): Observable<CardsEstoqueDto> {
    return this.http.get<CardsEstoqueDto>(`${this.URL}/informacoes-card`);
  }

  /**
   *
   * @description Lista os produtos em estoque, com suas informações como id, nome, tipo, descrição, valor unitário, quantidade em estoque e se estão abaixo do estoque mínimo.
   * @returns {Observable<ProdutoEstoqueDto[]>} - Retorna um Observable contendo a lista de produtos em estoque, com suas informações como id, nome, tipo, descrição, valor unitário, quantidade em estoque e se estão abaixo do estoque mínimo.
   */
  public listarProdutosEstoque(): Observable<ProdutoEstoqueDto[]> {
    return this.http.get<ProdutoEstoqueDto[]>(`${this.URL}/listar-produtos`);
  }

  /**
   *
   * @param {number} idProduto - O id do produto para o qual se deseja obter os detalhes.
   * @returns {Observable<DetalhesProdutoDto>} - Retorna um Observable contendo os detalhes do produto especificado.
   */
  public buscarDetalhesProduto(
    idProduto: number,
  ): Observable<DetalhesProdutoDto> {
    return this.http.get<DetalhesProdutoDto>(
      `${this.URL}/detalhes-produto/${idProduto}`,
    );
  }

  /**
   * 
   * @param {FiltrosProdutosForm} form - O formulário contendo os filtros para a geração do relatório de produtos.
   * @returns {Observable<Blob>} - Retorna um Observable contendo o relatório de produtos gerado.
   */
  public gerarRelatorioProdutos(form: FiltrosProdutosForm): Observable<Blob> {
    return this.http.post(`${this.URL}/relatorio-produtos`, form, {
      responseType: 'blob',
    });
  }
}
