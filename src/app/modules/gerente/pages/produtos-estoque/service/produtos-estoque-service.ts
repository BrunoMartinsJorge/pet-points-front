import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { ProdutoDto } from '../model/ProdutoDto';
import type { FiltrosProdutoForm } from '../form/FiltrosProdutoForm';

@Injectable({
  providedIn: 'root',
})
export class ProdutosEstoqueService {
  private readonly URL = '/gerente/estoque';
  private readonly http = inject(HttpClient);

  public listarProduto(): Observable<ProdutoDto[]> {
    return this.http.get<ProdutoDto[]>(this.URL);
  }

  public gerarRelatorio(form: FiltrosProdutoForm): Observable<Blob> {
    return this.http.put(`${this.URL}/gerar-relatorio`, form, { responseType: 'blob' });
  }
}
