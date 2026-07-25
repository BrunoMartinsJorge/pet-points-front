import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { CardsFinanceiroDto } from '../model/CardsFinanceiroDto';
import type { FaturaDto } from '../model/FaturaDto';
import type { GraficoReceitaDto } from '../model/GraficoReceitaDto';
import type { RelatorioFinanceiroForm } from '../form/RelatorioFinanceiroForm';

@Injectable({
  providedIn: 'root',
})
export class FinanceiroService {
  private readonly URL = '/gerente/financeiro';
  private readonly http = inject(HttpClient);

  public buscarCards(): Observable<CardsFinanceiroDto> {
    return this.http.get<CardsFinanceiroDto>(`${this.URL}/cards`);
  }

  public buscarGrafico(agrupamento: 'DIA' | 'MES'): Observable<GraficoReceitaDto> {
    return this.http.get<GraficoReceitaDto>(`${this.URL}/grafico`, {
      params: { agrupamento },
    });
  }

  public listarFaturas(): Observable<FaturaDto[]> {
    return this.http.get<FaturaDto[]>(`${this.URL}/pagamentos`);
  }

  public gerarRelatorio(form: RelatorioFinanceiroForm): Observable<Blob> {
    return this.http.post(`${this.URL}/relatorio`, form, {
      responseType: 'blob',
    });
  }
}
