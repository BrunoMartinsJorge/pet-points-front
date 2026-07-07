import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { SolicitacoesAtendimentosDto } from '../models/SolicitacoesAtendimentosDto';
import type { ChatAtendimentoDto } from '../models/ChatAtendimentoDto';
import type { MensagemAtendimento } from '../../../../../shared/models/ChatModels';

@Injectable({
  providedIn: 'root',
})
export class AtendimentosAtendenteeService {
  private readonly URL = '/chat-atendimento';
  private readonly http = inject(HttpClient);
  public idAtendimentoSelecionado: number | null = null;

  public listarSolicitacoesAtendimentos(): Observable<
    SolicitacoesAtendimentosDto[]
  > {
    return this.http.get<SolicitacoesAtendimentosDto[]>(
      `${this.URL}/atendente/listar-solicitacoes-atendimentos`,
    );
  }

  public aceitarSolicitacaoAtendimento(
    idSolicitacao: number,
  ): Observable<ChatAtendimentoDto> {
    return this.http.put<ChatAtendimentoDto>(
      `${this.URL}/atendente/aceitar-solicitacao-atendimento/${idSolicitacao}`,
      {},
    );
  }

  public listarMeusAtendimentos(): Observable<ChatAtendimentoDto[]> {
    return this.http.get<ChatAtendimentoDto[]>(
      `${this.URL}/atendente/meus-atendimentos`,
    );
  }

  public buscarAtendimentoSelecioando(idChat: number): Observable<ChatAtendimentoDto> {
    return this.http.get<ChatAtendimentoDto>(
      `${this.URL}/selecionar-atendimento/${idChat}`,
    );
  }

  public buscarMensagensPorChat(idChat: number): Observable<MensagemAtendimento[]> {
    return this.http.get<MensagemAtendimento[]>(`${this.URL}/${idChat}/mensagens`);
  }
}
