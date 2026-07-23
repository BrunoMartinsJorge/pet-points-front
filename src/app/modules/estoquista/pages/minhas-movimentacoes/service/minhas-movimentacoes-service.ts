import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { MinhasMovimentacoesDto } from '../model/MinhasMovimentacoesDto';
import type { RelatorioMovimentacoesForm } from '../form/RelatorioMovimentacoesForm';
import type { ProdutoFiltroDto } from '../model/ProdutoFiltroDto';
import type { NovaMovimentacaoForm } from '../form/NovaMovimentacaoForm';

@Injectable({
  providedIn: 'root',
})
export class MinhasMovimentacoesService {
  private readonly URL = '/estoquista/minhas-movimentacoes';
  private readonly http = inject(HttpClient);

  public listarMinhasMovimentacoes(): Observable<MinhasMovimentacoesDto[]> {
    return this.http.get<MinhasMovimentacoesDto[]>(this.URL);
  }

  public buscarProdutosParaFiltro(): Observable<ProdutoFiltroDto[]> {
    return this.http.get<ProdutoFiltroDto[]>(`${this.URL}/produtos-filtro`);
  }

  public gerarRelatorioMinhasMovimentacoes(form: RelatorioMovimentacoesForm): Observable<Blob> {
    return this.http.put(`${this.URL}/relatorio-movimentacoes`, form, { responseType: 'blob' });
  }

  public registrarNovaMovimentacao(form: NovaMovimentacaoForm): Observable<void> {
    return this.http.put<void>(`${this.URL}/realizar-movimentacao`, form);
  }
}
