import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { LogDto } from '../models/LogDto';
import type { UsuarioLogDto } from '../models/UsuarioLogDto';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  private readonly URL = '/gerente/logs';
  private readonly http = inject(HttpClient);

  public buscarLogs(): Observable<LogDto[]> {
    return this.http.get<LogDto[]>(this.URL);
  }

  public listarUsuariosLogs(): Observable<UsuarioLogDto[]> {
    return this.http.get<UsuarioLogDto[]>(`${this.URL}/usuarios`);
  }

  public gerarRelatorio(form: { idUsuario: number | null; datas: string; tipo: string | null }): Observable<Blob> {
    return this.http.put(`${this.URL}/relatorio`, form, { responseType: 'blob' });
  }
}
