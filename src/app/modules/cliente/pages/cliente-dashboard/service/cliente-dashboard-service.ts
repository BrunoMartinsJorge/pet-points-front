import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteDashboardService {
  private readonly URL = '/cliente/dashboard';
  private readonly http = inject(HttpClient);

  public getAtendimentosPendentes(): Observable<unknown[]> {
    return this.http.get<unknown[]>(`${this.URL}/atendimentos-pendentes`);
  }
}
