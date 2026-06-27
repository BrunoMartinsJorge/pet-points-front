import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { CardsPagamentoDto } from '../models/CardsPagamentoDto';
import type { PagamentosDto } from '../models/PagamentosDto';
import type { TipoPagamentoEnum } from '../../../../../shared/models/enums/TipoPagamentoEnum';
import type { MinhasConsultasDto } from '../../minhas-consultas/models/MinhasConsultasDto';
import type { DetalhesPagamentoDto } from '../models/DetalhesPagamentoDto';

@Injectable({
  providedIn: 'root',
})
export class MeusPagamentosService {
  private readonly URL = '/cliente/pagamentos';
  private readonly http = inject(HttpClient);

  public idPagamentoSelecionado: number | null = null;
  public redirecionadoParaPagamento = false;

  public buscarInformacoesCards(): Observable<CardsPagamentoDto> {
    return this.http.get<CardsPagamentoDto>(`${this.URL}/informacoes-cards`);
  }

  public listarPagamentosPendentesAtrasados(): Observable<PagamentosDto[]> {
    return this.http.get<PagamentosDto[]>(`${this.URL}/pendentes-atrasados`);
  }

  public listarPagamentosReprovados(): Observable<PagamentosDto[]> {
    return this.http.get<PagamentosDto[]>(`${this.URL}/reprovados`);
  }

  public listarHistoricoPagamentos(): Observable<PagamentosDto[]> {
    return this.http.get<PagamentosDto[]>(`${this.URL}/historicos`);
  }

  public buscarConsultaPagamento(idConsulta: number): Observable<MinhasConsultasDto> {
    return this.http.get<MinhasConsultasDto>(`${this.URL}/consulta-pagamento/${idConsulta}`);
  }

  public buscarComprovantePagamento(idPagamento: number): Observable<DetalhesPagamentoDto> {
    return this.http.get<DetalhesPagamentoDto>(`${this.URL}/detalhes-pagamento/${idPagamento}`);
  }

  public baixarArquivoComprovante(uuid: string): Observable<Blob> {
    return this.http.get(`/arquivos/${uuid}`, { responseType: 'blob' });
  }

  public registrarComprovante(idPagamento: number, arquvi: File): Observable<void> {
    const formData = new FormData();
    formData.append('arquivo', arquvi);
    return this.http.post<void>(`${this.URL}/registrar-comprovante/${idPagamento}`, formData);
  }

  public alterarFormaPagamento(idPagamento: number, novaForma: TipoPagamentoEnum): Observable<void> {
    return this.http.put<void>(`${this.URL}/alterar-forma-pagamento/${idPagamento}/${novaForma}`, {});
  }

  public buscarPagamento(idPagamento: number): Observable<PagamentosDto> {
    return this.http.get<PagamentosDto>(`${this.URL}/${idPagamento}`);
  }
}
