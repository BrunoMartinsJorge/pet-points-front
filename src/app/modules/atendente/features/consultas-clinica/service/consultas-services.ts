import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { ConsultasAtendenteDto } from '../models/ConsultasAtendenteDto';
import type { IndeferirConsultaForm } from '../forms/IndeferirConsultaForm';
import type { InformacoesPagamentoDto } from '../models/InformacoesPagamentoDto';
import type { AvaliacaoConsultaDto } from '../models/AvaliacaoConsultaDto';
import type { PendenciasFinanceirasClienteDto } from '../models/PendenciasFinanceirasClienteDto';
import type { TiposConsultaDto } from '../models/TiposConsultaDto';
import type { VeterinarioTipoConsultaDto } from '../models/VeterinarioTipoConsultaDto';
import type { DiaConsultasVeterinarioDto } from '../models/DiaConsultasVeterinarioDto';
import type { RegistroConsultaForm } from '../forms/RegistroConsultaForm';
import type { OptionSelect } from '../../../../../shared/models/OptionSelect';

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

  /**
   * @description - Cobranças em aberto/atrasadas do cliente, consultadas antes de
   * aprovar uma nova solicitação de consulta
   */
  public buscarPendenciasFinanceirasCliente(
    idCliente: number,
  ): Observable<PendenciasFinanceirasClienteDto> {
    return this.http.get<PendenciasFinanceirasClienteDto>(
      `${this.URL}/pendencias-financeiras/${idCliente}`,
    );
  }

  /**
   * @description - Clientes ativos disponíveis para o registro direto de consulta
   */
  public buscarClientesRegistro(): Observable<OptionSelect[]> {
    return this.http.get<OptionSelect[]>(`${this.URL}/registro/clientes`);
  }

  public buscarPetsClienteRegistro(
    idCliente: number,
  ): Observable<OptionSelect[]> {
    return this.http.get<OptionSelect[]>(
      `${this.URL}/registro/pets/${idCliente}`,
    );
  }

  public buscarTiposConsultaRegistro(): Observable<TiposConsultaDto[]> {
    return this.http.get<TiposConsultaDto[]>(
      `${this.URL}/registro/tipos-consulta`,
    );
  }

  public buscarVeterinariosRelacionadosTipoConsulta(
    idTipoConsulta: number,
  ): Observable<VeterinarioTipoConsultaDto[]> {
    return this.http.get<VeterinarioTipoConsultaDto[]>(
      `${this.URL}/registro/veterinarios-tipo-consulta/${idTipoConsulta}`,
    );
  }

  public buscarDiasConsultasVeterinario(
    idVeterinario: number,
  ): Observable<DiaConsultasVeterinarioDto[]> {
    return this.http.get<DiaConsultasVeterinarioDto[]>(
      `${this.URL}/registro/horarios/${idVeterinario}`,
    );
  }

  /**
   * @description - Registra a consulta já aprovada, sem passar pela solicitação
   */
  public registrarConsulta(form: RegistroConsultaForm): Observable<void> {
    return this.http.post<void>(`${this.URL}/registrar`, form);
  }
}
