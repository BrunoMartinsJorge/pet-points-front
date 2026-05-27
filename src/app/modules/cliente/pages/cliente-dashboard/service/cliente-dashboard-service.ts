import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { ConsultasDashboardDto } from '../model/ConsultasDashboardDto';
import type { AtendimentosPendentesDto } from '../model/AtendimentosPendentesDto';
import type { PagamentosPendentesDto } from '../model/PagamentosPendentesDto';

@Injectable({
  providedIn: 'root',
})
export class ClienteDashboardService {
  private readonly URL = '/cliente/dashboard';
  private readonly http = inject(HttpClient);

  public buscarConsultasAgendadas(): Observable<ConsultasDashboardDto[]> {
    return this.http.get<ConsultasDashboardDto[]>(`${this.URL}/consultas-agendadas`);
  }
  
  public buscarAtendimentosPendentes(): Observable<AtendimentosPendentesDto[]> {
    return this.http.get<AtendimentosPendentesDto[]>(`${this.URL}/atendimentos-pendentes`);
  }

  public buscarPagamentosPendentes(): Observable<PagamentosPendentesDto[]> {
    return this.http.get<PagamentosPendentesDto[]>(`${this.URL}/pagamentos-pendentes`);
  }
}
