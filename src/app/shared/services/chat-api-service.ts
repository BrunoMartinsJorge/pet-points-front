import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { MensagemAtendimento, MensagemInterna, UsuarioInterno } from '../models/ChatModels';

@Injectable({
  providedIn: 'root',
})
export class ChatApiService {
  private http = inject(HttpClient);
  public idFuncionarioSelecionado: number | null = null;
  public redirecionado = false;
 
  // ----- chat interno -----
  listarFuncionarios(): Observable<UsuarioInterno[]> {
    return this.http.get<UsuarioInterno[]>('/chat-interno/funcionarios');
  }
 
  abrirChatInterno(idDestinatario: number): Observable<number> {
    return this.http.post<number>(`/chat-interno/abrir/${idDestinatario}`, {});
  }
 
  historicoInterno(idChat: number): Observable<MensagemInterna[]> {
    return this.http.get<MensagemInterna[]>(`/chat-interno/${idChat}/mensagens`);
  }
 
  // ----- chat de atendimento -----
  historicoAtendimento(idChat: number): Observable<MensagemAtendimento[]> {
    return this.http.get<MensagemAtendimento[]>(`/chat-atendimento/${idChat}/mensagens`);
  }
}
