 
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import type { NotificacaoDto } from './ws/notificacoes-ws-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificacoesService {
  private notificacoesSubject = new BehaviorSubject<NotificacaoDto[]>([]);
  private readonly http = inject(HttpClient);
  private readonly URL = '/ws/notificacoes';
  notificacoes$ = this.notificacoesSubject.asObservable();

  public adicionarNotificacao(novaNotificacao: NotificacaoDto): void {
    this.notificacoesSubject.next([
      ...this.notificacoesSubject.value,
      novaNotificacao,
    ]);
  }

  public limparNotificacoes(): void {
    this.notificacoesSubject.next([]);
  }

  public marcarNotificacaoComoLida(idNotificacao: number): Observable<void> {
    return this.http.put<void>(`${this.URL}/marcar-lida/${idNotificacao}`, {});
  }
}