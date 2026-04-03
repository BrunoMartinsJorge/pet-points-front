import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { MeuPetDto } from '../models/MeuPetDto';
import type { MeuPetConsultaDto } from '../models/MeuPetConsultaDto';
import type { NovoPetForm } from '../models/form/NovoPetForm';
import type { PetDetalhesDto } from '../pages/informacoes-pet/model/PetDetalhesDto';

@Injectable({
  providedIn: 'root',
})
export class MeusPetsService {

  // URL baso do controller de meus pets, utilizada para fazer as requisições HTTP para o backend
  private readonly URL = '/cliente/meus-pets';

  // Injeção do serviço HttpClient para fazer as requisições HTTP para o backend
  private http = inject(HttpClient);

  public buscarMeusPets(): Observable<MeuPetDto[]> {
    return this.http.get<MeuPetDto[]>(this.URL);
  }

  public cadastrarPet(form: NovoPetForm): Observable<void> {
    return this.http.post<void>(this.URL, form);
  }

  public buscarAsConsultasDeMeusPets(): Observable<MeuPetConsultaDto[]> {
    return this.http.get<MeuPetConsultaDto[]>(`${this.URL}/pets-consultas`);
  }

  public buscarPetSelecionado(id: number): Observable<PetDetalhesDto> {
    return this.http.get<PetDetalhesDto>(`${this.URL}/${id}`);
  }

  public verCarteirinha(id: number): Observable<string> {
    return this.http.get(`${this.URL}/carteirinha/${id}`, { responseType: 'text' });
  }
}
