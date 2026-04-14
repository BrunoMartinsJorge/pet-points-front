import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { ConsultasPendentesConfirmadasDto } from '../models/ConsultasPendentesConfirmadasDto';

@Injectable({
  providedIn: 'root',
})
export class MinhasConsultasService {
  private readonly URL = '/cliente/minhas-consultas';
  private readonly http = inject(HttpClient);

  public listarConsultasPendentesConfirmadasOuIniciadas(): Observable<ConsultasPendentesConfirmadasDto[]> {
    return this.http.get<ConsultasPendentesConfirmadasDto[]>(`${this.URL}/consultas-pendentes-confirmadas`);
  }
}
