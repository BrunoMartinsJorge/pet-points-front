import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { MeuPetDto } from '../models/MeuPetDto';
import type { MeuPetConsultaDto } from '../models/MeuPetConsultaDto';
import type { NovoPetForm } from '../models/form/NovoPetForm';
import type { PetDetalhesDto } from '../pages/informacoes-pet/model/PetDetalhesDto';
import type { MinhasConsultasDto } from '../../minhas-consultas/models/MinhasConsultasDto';
import type { EditarPetForm } from '../models/form/EditarPetForm';
import type { PetPodeSerDeletadoDto } from '../models/PetPodeSerDeletadoDto';
import type { CarteirinhaPetDto } from '../../../../../shared/components/carteirinha-pet/dto/CarteirinhaPetDto';

@Injectable({
  providedIn: 'root',
})
export class MeusPetsService {
  private readonly URL = '/cliente/meus-pets';

  private http = inject(HttpClient);

  public buscarMeusPets(): Observable<MeuPetDto[]> {
    return this.http.get<MeuPetDto[]>(this.URL);
  }

  public cadastrarPet(form: NovoPetForm, file: File): Observable<void> {
    const formData = new FormData();
    formData.append('nome', form.nome);
    formData.append('genero', form.genero);
    formData.append('raca', form.raca);
    formData.append('tipo', form.tipo);
    formData.append('observacoes', form.observacoes);
    formData.append(
      'dataNascimento',
      form.dataNascimento.toISOString().split('T')[0],
    );

    if (file) {
      formData.append('foto', file);
    }
    return this.http.post<void>(this.URL, formData);
  }

  public editarPet(
    idPet: number,
    form: EditarPetForm,
    file: File,
  ): Observable<void> {
    const formData = new FormData();
    formData.append('nome', form.nome);
    formData.append('genero', form.genero);
    formData.append('raca', form.raca);
    formData.append('tipo', form.tipo);
    formData.append('observacoes', form.observacoes);
    formData.append(
      'dataNascimento',
      form.dataNascimento.toISOString().split('T')[0],
    );

    if (file) {
      formData.append('foto', file);
    }
    return this.http.put<void>(`${this.URL}/${idPet}`, formData);
  }

  public buscarAsConsultasDeMeusPets(): Observable<MeuPetConsultaDto[]> {
    return this.http.get<MeuPetConsultaDto[]>(`${this.URL}/pets-consultas`);
  }

  public buscarPetSelecionado(id: number): Observable<PetDetalhesDto> {
    return this.http.get<PetDetalhesDto>(`${this.URL}/${id}`);
  }

  public verCarteirinha(id: number): Observable<CarteirinhaPetDto> {
    return this.http.get<CarteirinhaPetDto>(`${this.URL}/carteirinha/${id}`);
  }

  public baixarCarteirinha(idPet: number): Observable<Blob> {
    return this.http.get(`${this.URL}/baixar-carteirinha/${idPet}`, {
      responseType: 'blob',
    });
  }

  public buscarConsultasPet(id: number): Observable<MinhasConsultasDto[]> {
    return this.http.get<MinhasConsultasDto[]>(`${this.URL}/consultas/${id}`);
  }

  public verificarPetPodeSerDesabilitado(
    idPet: number,
  ): Observable<PetPodeSerDeletadoDto> {
    return this.http.get<PetPodeSerDeletadoDto>(
      `${this.URL}/verificar-pet/${idPet}`,
    );
  }

  public desativarPet(idPet: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${idPet}`);
  }
}
