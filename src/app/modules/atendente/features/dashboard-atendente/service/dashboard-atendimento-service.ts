import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

export interface CardsDashboardAtendenteDto {
  atendimentosFinalizados: number;
  consultasParticipadas: number;
  rankingAvaliacao: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardAtendimentoService {
  private readonly URL = "/atendente/dashboard";
  private readonly http = inject(HttpClient);

  public buscarCardsAtendente(): Observable<CardsDashboardAtendenteDto> {
    return this.http.get<CardsDashboardAtendenteDto>(`${this.URL}/cards`);
  }
}
