import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { CardsEstoqueDto } from '../model/CardsEstoqueDto';
import type { ProdutoEstoqueDto } from '../../../../../shared/models/ProdutoEstoqueDto';
import type { FiltrosProdutosForm } from '../forms/FiltrosProdutosForm';
import type { DetalhesProdutoDto } from '../model/DetalhesProdutoDto';
import type { NovoProdutoForm } from '../forms/NovoProdutoForm';
import { EditarProdutoForm } from '../forms/EditarProdutoForm';

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
   * @description Busca os detalhes do produto com o id especificado.
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
   * @description Gera um relatório de produtos com base nos filtros fornecidos no formulário.
   * @param {FiltrosProdutosForm} form - O formulário contendo os filtros para a geração do relatório de produtos.
   * @returns {Observable<Blob>} - Retorna um Observable contendo o relatório de produtos gerado.
   */
  public gerarRelatorioProdutos(form: FiltrosProdutosForm): Observable<Blob> {
    return this.http.post(`${this.URL}/relatorio-produtos`, form, {
      responseType: 'blob',
    });
  }
  
  /**
   * 
   * @description Registra um novo produto com base nos dados fornecidos no formulário.
   * @param {NovoProdutoForm} form - O formulário contendo os dados do novo produto.
   * @returns {Observable<void>} - Retorno normal de sucesso.
   */
  public registrarNovoProduto(form: NovoProdutoForm): Observable<void>{
    return this.http.post<void>(`${this.URL}/adicionar-novo-produto`, form);
  }

  /**
   * 
   * @description Edita um produto existente com base nos dados fornecidos no formulário.
   * @param {EditarProdutoForm} form - Valores de edição para produto
   * @param {number} idProduto - Id do produto para edição
   * @returns {Observable<void>} - Retorno normal de sucesso
   */
  public editarProduto(form: EditarProdutoForm, idProduto: number): Observable<void> {
    return this.http.put<void>(`${this.URL}/editar-produto/${idProduto}`, form);
  }

  /**
   * 
   * @description Remove um produto existente com base no id fornecido.
   * @param {number} idProduto - Id do produto para remoção
   * @returns {Observable<void>} - Retorno normal de sucesso
   */
  public removerProduto(idProduto: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/remover-produto/${idProduto}`); 
  }
}
