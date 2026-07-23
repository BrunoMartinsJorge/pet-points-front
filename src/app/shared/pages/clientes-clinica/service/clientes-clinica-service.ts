import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { ClienteDto } from '../model/ClienteDto';
import type { ClientesDetalhesDto } from '../pages/detalhes-clientes/model/ClientesDetalhesDto';
import type { PetsClienteDto } from '../pages/detalhes-clientes/model/PetsClienteDto';
import type { HistoricoConsultasClienteDto } from '../pages/detalhes-clientes/model/HistoricoConsultasClienteDto';

@Injectable({
  providedIn: 'root',
})
export class ClientesClinicaService {
  private readonly URL = '/gerente-atendente/clientes-clinica';
  private readonly http = inject(HttpClient);

  public listarClientes(): Observable<ClienteDto[]> {
    return this.http.get<ClienteDto[]>(this.URL);
  }

  public buscarDetalhesCliente(
    idCliente: number,
  ): Observable<ClientesDetalhesDto> {
    return this.http.get<ClientesDetalhesDto>(
      `${this.URL}/detalhes/${idCliente}`,
    );
  }

  public buscarListaPetsCliente(
    idCliente: number,
  ): Observable<PetsClienteDto[]> {
    return this.http.get<PetsClienteDto[]>(
      `${this.URL}/pets-cliente/${idCliente}`,
    );
  }

  public buscarHistoricoConsultasCliente(
    idCliente: number,
  ): Observable<HistoricoConsultasClienteDto[]> {
    return this.http.get<HistoricoConsultasClienteDto[]>(
      `${this.URL}/historico-consultas/${idCliente}`,
    );
  }

  public gerarRelatorioClientes(form: {
    nome: string | null;
    genero: string | null;
  }): Observable<Blob> {
    return this.http.post(`${this.URL}/relatorios`, form, {
      responseType: 'blob',
    });
  }
}
