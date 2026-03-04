import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { FormLogin } from '../shared/components/FormLogin';
import type { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutenticaoService {
  private readonly URL = '/autenticacao';
  private readonly http = inject(HttpClient);

  public login(payload: FormLogin): Observable<any> {
    return this.http.post<any>(`${this.URL}/login`, payload);
  }
}
