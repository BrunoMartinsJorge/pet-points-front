import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { TiposConsultaDto } from '../models/TiposConsultaDto';
import type { VeterinarioTipoConsultaDto } from '../models/VeterinarioTipoConsultaDto';
import type { DiaConsultasVeterinarioDto } from '../models/DiaConsultasVeterinarioDto';
import type { OptionSelect } from '../../../../../shared/models/OptionSelect';
import type { SolicitacaoConsultaForm } from '../form/SolicitacaoConsultaForm';
import type { MinhasConsultasDto } from '../models/MinhasConsultasDto';
import type { DetalhesConsultaSelecionadaDto } from '../models/DetalhesConsultaSelecionadaDto';
import type { CancelarConsultaForm } from '../form/CancelarConsultaForm';

@Injectable({
  providedIn: 'root',
})
export class MinhasConsultasService {
  private readonly URL = '/cliente/minhas-consultas';
  private readonly http = inject(HttpClient);

  public listarHistoricoConsultas(): Observable<MinhasConsultasDto[]> {
    return this.http.get<MinhasConsultasDto[]>(`${this.URL}`);
  }

  public listarConsultasConfirmadasOuIniciadas(): Observable<MinhasConsultasDto[]> {
    return this.http.get<MinhasConsultasDto[]>(`${this.URL}/consultas-confirmadas`);
  }

  public listarConsultasPendentes(): Observable<MinhasConsultasDto[]> {
    return this.http.get<MinhasConsultasDto[]>(`${this.URL}/consultas-pendentes`);
  }

  public buscarDetalhesConsulta(idConsulta: number): Observable<DetalhesConsultaSelecionadaDto> {
    return this.http.get<DetalhesConsultaSelecionadaDto>(`${this.URL}/detalhes/${idConsulta}`);
  }

  public buscarTiposConsultasSolcitacao(): Observable<TiposConsultaDto[]> {
    return this.http.get<TiposConsultaDto[]>(`${this.URL}/tipos-consulta`);
  }

  public buscarVeterinariosRelacionadosTipoConsulta(idTipoConsulta: number): Observable<VeterinarioTipoConsultaDto[]> {
    return this.http.get<VeterinarioTipoConsultaDto[]>(`${this.URL}/veterinarios-tipo-consulta/${idTipoConsulta}`);
  }

  public buscarDiasConsultasVeterinario(idVeterinario: number): Observable<DiaConsultasVeterinarioDto[]> {
    return this.http.get<DiaConsultasVeterinarioDto[]>(`${this.URL}/horarios/${idVeterinario}`);
  }

  public buscarPets(): Observable<OptionSelect[]> { 
    return this.http.get<OptionSelect[]>(`${this.URL}/pets`);
  }

  public agendarConsulta(form: SolicitacaoConsultaForm): Observable<void> {
    return this.http.post<void>(`${this.URL}/solicitar`, form);
  }

  public cancelarConsulta(form: CancelarConsultaForm): Observable<void> {
    return this.http.put<void>(`${this.URL}/cancelar-consulta`, form);
  }
}
