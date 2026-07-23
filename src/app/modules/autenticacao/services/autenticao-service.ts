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

  public registro(
    payload: FormRegistro,
    foto?: File,
  ): Observable<{ token: string }> {
    const formData = new FormData();

    formData.append('nome', payload.nome);
    formData.append('genero', payload.genero);
    formData.append('cpf', payload.cpf);
    formData.append('email', payload.email);
    formData.append('telefone', payload.telefone);
    formData.append('senha', payload.senha);
    formData.append(
      'dataNascimento',
      payload.dataNascimento.toISOString().split('T')[0],
    );

    if (foto) {
      formData.append('foto', foto);
    }

    return this.http.post<{ token: string }>(`${this.URL}/register`, formData);
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

  public alterarSenha(
    email: string,
    codigo: string,
    novaSenha: string,
  ): Observable<void> {
    return this.http.put<void>(
      `${this.URL}/redefinir-senha?email=${email}&novaSenha=${novaSenha}&codigo=${codigo}`,
      {},
    );
  }
}
