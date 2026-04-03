import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { FuncionarioDto } from '../models/FuncionarioDto';
import type { NovoFuncionarioForm } from '../pages/registrar-funcionario/forms/NovoFuncionarioForm';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioServices {
  private readonly URL = '/gerente/funcionarios';
  private http = inject(HttpClient);

  public listarFuncionarios(): Observable<FuncionarioDto[]> {
    return this.http.get<FuncionarioDto[]>(this.URL);
  }

  public cadastrarFuncionario(funcionario: NovoFuncionarioForm): Observable<FuncionarioDto> {
    return this.http.post<FuncionarioDto>(this.URL, funcionario);
  }
}
