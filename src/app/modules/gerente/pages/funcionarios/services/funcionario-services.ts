import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { FuncionarioDto } from '../models/FuncionarioDto';
import type { NovoFuncionarioForm } from '../pages/registrar-funcionario/forms/NovoFuncionarioForm';
import type { FiltroFuncionariosForm } from '../form/FiltroFuncionariosForm';
import type { OpcoesFiltro } from '../../consultas-clinica/model/OpcoesFiltro';
import type { AvaliacaoDto } from '../../../../../shared/models/AvaliacaoDto';
import type { ConsultasFuncionarioDto } from '../../../../../shared/models/ConsultasFuncionarioDto';
import type { MovimentacoesEstoquistaDto } from '../models/MovimentacoesEstoquistasDto';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioServices {
  private readonly URL = '/gerente/funcionarios';
  private http = inject(HttpClient);

  public listarFuncionarios(): Observable<FuncionarioDto[]> {
    return this.http.get<FuncionarioDto[]>(this.URL);
  }

  public buscarFuncionarioPorId(id: number): Observable<FuncionarioDto> {
    return this.http.get<FuncionarioDto>(`${this.URL}/${id}`);
  }

  public desativarFuncionario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }

  public cadastrarFuncionario(funcionario: NovoFuncionarioForm): Observable<FuncionarioDto> {
    return this.http.post<FuncionarioDto>(this.URL, funcionario);
  }

  public gerarRelatorioFuncionarios(form: FiltroFuncionariosForm): Observable<Blob> {
    return this.http.put(`${this.URL}/relatorio`, form, { responseType: 'blob' });
  }

  public buscarEspecializacoes(): Observable<OpcoesFiltro[]> {
    return this.http.get<OpcoesFiltro[]>(`${this.URL}/especializacoes`);
  }

  public buscarAvaliacoesPorFuncionario(id: number): Observable<AvaliacaoDto[]> {
    return this.http.get<AvaliacaoDto[]>(`${this.URL}/avaliacoes/${id}`);
  }

  public buscarConsultasPorFuncionario(id: number): Observable<ConsultasFuncionarioDto[]> {
    return this.http.get<ConsultasFuncionarioDto[]>(`${this.URL}/consultas/${id}`);
  }

  public buscarMovimentacoesPorFuncionario(id: number): Observable<MovimentacoesEstoquistaDto[]> {
    return this.http.get<MovimentacoesEstoquistaDto[]>(`${this.URL}/movimentacoes/${id}`);
  }

  public editarFuncionario(id: number, funcionario: NovoFuncionarioForm, foto?: File): Observable<FuncionarioDto> {
    const formData = new FormData();
    const tipoFuncionario = funcionario.permissao.charAt(0);
    formData.append('nome', funcionario.nome);
    formData.append('genero', funcionario.genero);
    formData.append('email', funcionario.email);
    formData.append('telefone', funcionario.telefone);
    formData.append('permissao', tipoFuncionario);    
    formData.append(
      'dataNascimento',
      funcionario.dataNascimento.toISOString().split('T')[0],
    );
    if (foto) {
      formData.append('foto', foto);
    }
    return this.http.put<FuncionarioDto>(`${this.URL}/${id}`, formData);
  }
}
