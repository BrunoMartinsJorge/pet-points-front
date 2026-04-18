import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { MovimentacoesDto } from '../model/MovimentacoesDto';
import type { Observable } from 'rxjs';
import type { ProdutoFiltroDto } from '../../../../../shared/models/ProdutoFiltroDto';
import type { LancadoPorDto } from '../model/LancadoPorDto';
import type { FiltroMovimentacoesForm } from '../form/FiltroMovimentacoesForm';

@Injectable({
  providedIn: 'root',
})
export class MovimentacoesClinicaService {
  private readonly URL = '/gerente/movimentacoes-clinica';
  private readonly http = inject(HttpClient);

  public listarMovimentacoes(): Observable<MovimentacoesDto[]> {
    return this.http.get<MovimentacoesDto[]>(this.URL);
  }

  public listarProdutosFiltro(): Observable<ProdutoFiltroDto[]> {
    return this.http.get<ProdutoFiltroDto[]>(`${this.URL}/produtos-filtro`);
  }

  public listarEstoquistasFiltro(): Observable<LancadoPorDto[]> {
    return this.http.get<LancadoPorDto[]>(`${this.URL}/estoquistas-filtro`);
  }

  public gerarRelatorioMovimentacoes(form: FiltroMovimentacoesForm): Observable<Blob> {
    return this.http.put(`${this.URL}/gerar-relatorio`, form, { responseType: 'blob' });
  }
}
