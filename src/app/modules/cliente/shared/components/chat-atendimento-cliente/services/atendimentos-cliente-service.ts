import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { ChatAtendimentoDto } from '../models/ChatAtendimentoDto';
import type { MensagemAtendimento } from '../../../../../../shared/models/ChatModels';
import type { AvaliacaoForm } from '../../../../../../shared/form/AvaliacaoForm';
import type { AvaliacaoDto } from '../../../../../../shared/models/AvaliacaoDto';

@Injectable({
  providedIn: 'root',
})
export class AtendimentosClienteService {
  private readonly URL = '/chat-atendimento';
  private readonly http = inject(HttpClient);

  public buscarAtendimentosCliente(): Observable<ChatAtendimentoDto[]> {
    return this.http.get<ChatAtendimentoDto[]>(
      `${this.URL}/cliente/buscar-atendimentos`,
    );
  }

  public solicitarAtendimento(mensagem: string): Observable<void> {
    return this.http.post<void>(
      `${this.URL}/cliente/solicitar-atendimento`,
      {},
      { params: { mensagem } },
    );
  }

  public finalizarAtendimento(
    form: AvaliacaoForm,
    idChat: number,
  ): Observable<void> {
    return this.http.post<void>(`${this.URL}/cliente/${idChat}`, form);
  }

  public buscarMensagensChatAtendimento(
    chatId: number,
  ): Observable<MensagemAtendimento[]> {
    return this.http.get<MensagemAtendimento[]>(
      `${this.URL}/cliente/buscar-mensagens-chat-atendimento/${chatId}`,
    );
  }

  public buscarAvaliacao(idChat: number): Observable<AvaliacaoDto> {
    return this.http.get<AvaliacaoDto>(`${this.URL}/avaliacao/${idChat}`);
  }
}
