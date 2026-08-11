import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { PagamentosClinicaDto } from '../model/PagamentosClinicaDto';
import type { Observable } from 'rxjs';
import type { CardsPagamentosClinica } from '../model/CardsPagamentosClinica';
import type { DetalhesPagamentoClinicaDto } from '../model/DetalhesPagamentoClinicaDto';
import type { IndeferirPagamentoClinicaForm } from '../forms/IndeferirPagamentoClinicaForm';

@Injectable({
  providedIn: 'root',
})
export class PagamentoClinicaService {
  private readonly URL = '/atendente/pagamentos';
  private readonly http = inject(HttpClient);

  public buscarCardsPagamentos(): Observable<CardsPagamentosClinica> {
    return this.http.get<CardsPagamentosClinica>(`${this.URL}/cards`);
  }

  public buscarPagamentos(): Observable<PagamentosClinicaDto[]> {
    return this.http.get<PagamentosClinicaDto[]>(`${this.URL}/historico`);
  }

  public buscarPendentesAtrasados(): Observable<PagamentosClinicaDto[]> {
    return this.http.get<PagamentosClinicaDto[]>(`${this.URL}/pendentes-atrasados`);
  }

  public registrarPagamento(idPagamento: number): Observable<void> {
    return this.http.put<void>(`${this.URL}/registrar-pagamento/${idPagamento}`, {});
  }

  /**
   *
   * @description - Busca os detalhes completos de um pagamento (resumo, transação e histórico)
   * @returns - DetalhesPagamentoClinicaDto - Detalhes do pagamento selecionado
   */
  public buscarDetalhesPagamento(idPagamento: number): Observable<DetalhesPagamentoClinicaDto> {
    return this.http.get<DetalhesPagamentoClinicaDto>(`${this.URL}/${idPagamento}`);
  }

  /**
   *
   * @description - Consulta o gateway de pagamento e sincroniza o status da transação
   * @returns - DetalhesPagamentoClinicaDto - Detalhes do pagamento já atualizados
   */
  public consultarStatusTransacao(idPagamento: number): Observable<DetalhesPagamentoClinicaDto> {
    return this.http.put<DetalhesPagamentoClinicaDto>(
      `${this.URL}/consultar-status/${idPagamento}`,
      {},
    );
  }

  public indeferirPagamento(
    idPagamento: number,
    form: IndeferirPagamentoClinicaForm,
  ): Observable<void> {
    return this.http.put<void>(`${this.URL}/indeferir/${idPagamento}`, form);
  }
}
