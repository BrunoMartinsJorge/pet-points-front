import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { HistoricoMovimentacoesMensaisDto } from '../model/HistoricoMovimentacoesMensaisDto';
import type { ProdutoEstoqueDto } from '../../../../../shared/models/ProdutoEstoqueDto';

@Injectable({
  providedIn: 'root',
})
export class DashboardEstoquistaService {
  private readonly URL = '/estoquista/estoquista-dashboard';
  private readonly http = inject(HttpClient);

  public listarMovimentacoesMensaisParaGrafico(): Observable<HistoricoMovimentacoesMensaisDto[]> {
    return this.http.get<HistoricoMovimentacoesMensaisDto[]>(`${this.URL}/movimentacoes-mensais`);
  }

  public listarProdutosComBaixoEstoque(): Observable<ProdutoEstoqueDto[]> {
    return this.http.get<ProdutoEstoqueDto[]>(`${this.URL}/produtos-abaixo-estoque`);
  }
}
