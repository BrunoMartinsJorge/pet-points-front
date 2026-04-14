import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { CardsEstoqueDto } from '../model/CardsEstoqueDto';
import type { ProdutoEstoqueDto } from '../model/ProdutoEstoqueDto';
import type { FiltrosProdutosForm } from '../forms/FiltrosProdutosForm';
import type { DetalhesProdutoDto } from '../model/DetalhesProdutoDto';

@Injectable({
  providedIn: 'root',
})
export class EstoqueEstoquistaService {
  private readonly URL = '/estoquista/estoque';
  private readonly http = inject(HttpClient);

  public buscarInformacoesCards(): Observable<CardsEstoqueDto> {
    return this.http.get<CardsEstoqueDto>(`${this.URL}/informacoes-card`);
  }

  public listarProdutosEstoque(): Observable<ProdutoEstoqueDto[]> {
    return this.http.get<ProdutoEstoqueDto[]>(`${this.URL}/listar-produtos`);
  }

  public buscarDetalhesProduto(idProduto: number): Observable<DetalhesProdutoDto> {
    return this.http.get<DetalhesProdutoDto>(`${this.URL}/detalhes-produto/${idProduto}`);
  }

  public gerarRelatorioProdutos(form: FiltrosProdutosForm): Observable<Blob> {
    return this.http.post(`${this.URL}/relatorio-produtos`, form, { responseType: 'blob' });
  }
}
