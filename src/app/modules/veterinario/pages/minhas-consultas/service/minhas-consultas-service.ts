import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { ConsultaVeterinarioDto } from '../model/ConsultaVeterinarioDto';
import type { ConsultaAtualDto } from '../model/ConsultaAtualDto';
import type { InformacoesConsultaSelecionadaDto } from '../pages/detalhes-consulta/model/InformacoesConsultaSelecionadaDto';

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

  public buscarInformacoesConsulta(
    idConsulta: number,
  ): Observable<InformacoesConsultaSelecionadaDto> {
    return this.http.get<InformacoesConsultaSelecionadaDto>(
      `${this.URL}/selecionar-consulta/${idConsulta}`,
    );
  }

  public iniciarConsulta(idConsulta: number): Observable<void> {
    return this.http.put<void>(`${this.URL}/iniciar/${idConsulta}`, {});
  }
}
