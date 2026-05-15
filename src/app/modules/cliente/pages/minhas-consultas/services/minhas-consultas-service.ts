import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { ConsultasPendentesConfirmadasDto } from '../models/ConsultasPendentesConfirmadasDto';
import type { TiposConsultaDto } from '../models/TiposConsultaDto';
import type { VeterinarioTipoConsultaDto } from '../models/VeterinarioTipoConsultaDto';
import type { DiaConsultasVeterinarioDto } from '../models/DiaConsultasVeterinarioDto';
import type { OptionSelect } from '../../../../../shared/models/OptionSelect';
import type { SolicitacaoConsultaForm } from '../form/SolicitacaoConsultaForm';

@Injectable({
  providedIn: 'root',
})
export class MinhasConsultasService {
  private readonly URL = '/cliente/minhas-consultas';
  private readonly http = inject(HttpClient);

  public listarConsultasPendentesConfirmadasOuIniciadas(): Observable<ConsultasPendentesConfirmadasDto[]> {
    return this.http.get<ConsultasPendentesConfirmadasDto[]>(`${this.URL}/consultas-pendentes-confirmadas`);
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
}
