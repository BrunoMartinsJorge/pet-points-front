import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { ConsultaVeterinarioDto } from '../model/ConsultaVeterinarioDto';
import type { ConsultaAtualDto } from '../model/ConsultaAtualDto';

@Injectable({
  providedIn: 'root',
})
export class MinhasConsultasService {
  private readonly http = inject(HttpClient);
  private readonly URL = '/veterinario/minhas-consultas';

  public buscarConsultasDoDia(): Observable<ConsultaVeterinarioDto[]> {
    return this.http.get<ConsultaVeterinarioDto[]>(`${this.URL}/hoje`);
  }
  
  public buscarConsultaAtual(): Observable<ConsultaAtualDto> {
    return this.http.get<ConsultaAtualDto>(`${this.URL}/consulta-atual`);
  }
  
    public buscarHistoricoConsultas(): Observable<ConsultaVeterinarioDto[]> {
      return this.http.get<ConsultaVeterinarioDto[]>(`${this.URL}`);
    }
}
