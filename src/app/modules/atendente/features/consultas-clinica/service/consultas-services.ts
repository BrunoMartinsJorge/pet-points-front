import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { ConsultasAtendenteDto } from '../models/ConsultasAtendenteDto';
import type { IndeferirConsultaForm } from '../forms/IndeferirConsultaForm';
import type { InformacoesPagamentoDto } from '../models/InformacoesPagamentoDto';
import type { AvaliacaoConsultaDto } from '../models/AvaliacaoConsultaDto';
import type { IndeferirPagamentoForm } from '../forms/IndeferirPagamentoForm';

@Injectable({
  providedIn: 'root',
})
export class ConsultasServices {
  private readonly URL = '/atendente/consultas';
  private readonly http = inject(HttpClient);

  public idConsultaSelecionada: number | null = null;
  public redirecionado = false;

  /**
   *
   * @description - Busca as solicitações de consultas do atendente
   * @returns - ConsultaAtendenteDto - Lista de solicitações de consultas
   */
  public buscarSolicitacoesConsultas(): Observable<ConsultasAtendenteDto[]> {
    return this.http.get<ConsultasAtendenteDto[]>(`${this.URL}`);
  }

  public buscarConsultaPreSelecionada(): Observable<ConsultasAtendenteDto> {
    return this.http.get<ConsultasAtendenteDto>(`${this.URL}/${this.idConsultaSelecionada}`);
  }

  /**
   *
   * @description - Busca as solicitações de consultas do atendente
   * @returns - ConsultaAtendenteDto - Lista de solicitações de consultas
   */
  public buscarHistoricoConsultas(): Observable<ConsultasAtendenteDto[]> {
    return this.http.get<ConsultasAtendenteDto[]>(`${this.URL}/historico`);
  }

  public aprovarSolicitacaoConsulta(idSolicitacao: number): Observable<void> {
    return this.http.put<void>(`${this.URL}/aprovar/${idSolicitacao}`, {});
  }

  public reprovarSolicitacaoConsulta(
    form: IndeferirConsultaForm,
  ): Observable<void> {
    return this.http.put<void>(`${this.URL}/reprovar`, form);
  }

  public buscarInformacoesPagamento(
    idConsulta: number,
  ): Observable<InformacoesPagamentoDto> {
    return this.http.get<InformacoesPagamentoDto>(
      `${this.URL}/pagamento/${idConsulta}`,
    );
  }

  public buscarAvaliacao(idConsulta: number): Observable<AvaliacaoConsultaDto> {
    return this.http.get<AvaliacaoConsultaDto>(
      `${this.URL}/avaliacao/${idConsulta}`,
    );
  }

  public baixarArquivoComprovante(uuid: string): Observable<Blob> {
    return this.http.get(`/arquivos/${uuid}`, { responseType: 'blob' });
  }

  public enviarAvaliacao(
    idConsulta: number,
    form: IndeferirPagamentoForm,
  ): Observable<void> {
    return this.http.put<void>(`${this.URL}/avaliar/${idConsulta}`, form);
  }
}
