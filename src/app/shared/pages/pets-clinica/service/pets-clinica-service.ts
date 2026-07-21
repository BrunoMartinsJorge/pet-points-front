import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { PetsDto } from '../model/PetsDto';
import type { TutorDto } from '../model/TutorDto';
import type { DetalhesPetDto } from '../model/DetalhesPetDto';
import type { DetalhesTutorPetDto } from '../model/DetalhesTutorPetDto';
import type { HistoricoConsultasPetDto } from '../model/HistoricoConsultasPetDto';
import type { RelatorioPetsClinicaForm } from '../form/RelatorioPetsClinicaForm';

@Injectable({
  providedIn: 'root',
})
export class PetsClinicaService {
  private readonly URL = '/gerente/pets-clinica';
  private readonly http = inject(HttpClient);

  public listarPets(): Observable<PetsDto[]> {
    return this.http.get<PetsDto[]>(this.URL);
  }

  public buscarTutoresFiltro(): Observable<TutorDto[]> {
    return this.http.get<TutorDto[]>(`${this.URL}/tutores`);
  }

  public buscarDetalhesPet(idPet: number): Observable<DetalhesPetDto> {
    return this.http.get<DetalhesPetDto>(`${this.URL}/detalhes-pet/${idPet}`);
  }

  public buscarDetalhesTutor(idPet: number): Observable<DetalhesTutorPetDto> {
    return this.http.get<DetalhesTutorPetDto>(`${this.URL}/detalhes-tutor/${idPet}`);
  }

  public buscarHistoricoConsultasPet(idPet: number): Observable<HistoricoConsultasPetDto[]> {
    return this.http.get<HistoricoConsultasPetDto[]>(`${this.URL}/historico-consultas/${idPet}`);
  }

  public gerarRelatorioPets(form: RelatorioPetsClinicaForm): Observable<Blob> {
    return this.http.put(`${this.URL}/relatorio`, form, { responseType: 'blob' });
  }
}
