import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { MovimentacoesGerenteDto } from '../model/MovimentacoesGerenteDto';
import type { ConsultasGerenteDto } from '../model/ConsultasGerenteDto';

@Injectable({
  providedIn: 'root',
})
export class GerenteDashboardService {
  private readonly URL = '/gerente/dashboard';
  private readonly http = inject(HttpClient);

  public buscarAcessosMes(): Observable<{ data: string; quantidade: number }[]> {
    return this.http.get<{ data: string; quantidade: number }[]>(this.URL);
  }

  public buscarMovimentacoesMes(): Observable<MovimentacoesGerenteDto[]> {
    return this.http.get<MovimentacoesGerenteDto[]>(`${this.URL}/movimentacoes`);
  }

  public buscarConsultas(): Observable<ConsultasGerenteDto[]> {
    return this.http.get<ConsultasGerenteDto[]>(`${this.URL}/consultas`);
  }
}
