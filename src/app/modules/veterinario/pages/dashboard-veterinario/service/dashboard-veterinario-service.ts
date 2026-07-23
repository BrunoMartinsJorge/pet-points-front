import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { ConsultasVeterinarioDashboardDto } from '../models/ConsultasVeterinarioDashboardDto';
import type { AvaliacoesVeterinarioDashboardDto } from '../models/AvaliacoesVeterinarioDashboardDto';
import type { CardsVeterinarioDashboardDto } from '../models/CardsVeterinarioDashboardDto';

@Injectable({
  providedIn: 'root',
})
export class DashboardVeterinarioService {
  private readonly http = inject(HttpClient);
  private readonly URL = "/veterinario/dashboard";

  public buscarCards(): Observable<CardsVeterinarioDashboardDto> {
    return this.http.get<CardsVeterinarioDashboardDto>(`${this.URL}/cards`);
  }

  public buscarListaConsultasDia(): Observable<ConsultasVeterinarioDashboardDto[]> {
    return this.http.get<ConsultasVeterinarioDashboardDto[]>(`${this.URL}/consultas-dia`);
  }

  public buscarListaAvaliacoes(): Observable<AvaliacoesVeterinarioDashboardDto[]> {
    return this.http.get<AvaliacoesVeterinarioDashboardDto[]>(`${this.URL}/avaliacoes`);
  }
}
