import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { FormLogin } from '../shared/forms/FormLogin';
import type { Observable } from 'rxjs';
import type { FormRegistro } from '../shared/forms/FormRegistro';

@Injectable({
  providedIn: 'root',
})
export class AutenticaoService {
  private readonly URL = '/autenticacao';
  private readonly http = inject(HttpClient);

  public login(payload: FormLogin): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.URL}/login`, payload);
  }

  public registro(payload: FormRegistro): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.URL}/register`, payload);
  }

  public solicitarCodigoAlteracaoSenha(email: string): Observable<void> {
    return this.http.get<void>(
      `${this.URL}/enviar-codigo-alterar-senha?email=${email}`,
    );
  }

  public validarCodigoAlteracao(
    email: string,
    codigo: string,
  ): Observable<void> {
    return this.http.put<void>(
      `${this.URL}/validar-codigo-alterar-senha?email=${email}&codigo=${codigo}`,
      {},
    );
  }

  public alterarSenha(email: string,
    codigo: string, novaSenha: string): Observable<void> {
    return this.http.put<void>(
      `${this.URL}/redefinir-senha?email=${email}&novaSenha=${novaSenha}&codigo=${codigo}`,
      {},
    );
  }
}
