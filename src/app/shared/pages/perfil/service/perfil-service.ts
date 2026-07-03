import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { InformacoesUsuarioDto } from '../model/InformacoesUsuarioDto';
import type { EditarPerfilForm } from '../form/EditarPerfilForm';
import type { RankingFuncionarioDto } from '../model/RankingFuncionarioDto';
import type { AvaliacaoDto } from '../../../models/AvaliacaoDto';
import type { ConsultasAtendenteVeterinarioDto } from '../model/ConsultasAtendenteVeterinarioDto';
import type { RelatorioFinanceiroClienteDto } from '../model/RelatorioFinanceiroClienteDto';
import type { MinhasAvaliacoesDto } from '../model/MinhasAvaliacoesDto';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private readonly URL = '/perfil';
  private readonly http = inject(HttpClient);
  private urlTipoUsuario = '';

  public setUrlTipoUsuario(url: string): void {
    this.urlTipoUsuario = '/' + url.toLocaleLowerCase();
  }

  public buscarInformacoesUsuario(): Observable<InformacoesUsuarioDto> {
    if (this.urlTipoUsuario === '') {
      throw new Error('URL do tipo de usuário não definida');
    }
    return this.http.get<InformacoesUsuarioDto>(
      `${this.URL}/informacoes-usuario`,
    );
  }

  public enviarAlteracoes(
    formulario: EditarPerfilForm,
    file: File | null,
  ): Observable<void> {
    if (this.urlTipoUsuario === '') {
      throw new Error('URL do tipo de usuário não definida');
    }
    const formData = new FormData();
    formData.append('nome', formulario.nome);
    formData.append('email', formulario.email);
    formData.append('genero', formulario.genero);
    formData.append(
      'dataNascimento',
      formulario.dataNascimento.toISOString().split('T')[0],
    );
    formData.append('telefone', formulario.telefone);
    formData.append('cpf', formulario.cpf);
    if (file) {
      formData.append('imagem', file);
    }
    return this.http.put<void>(`${this.URL}/editar-perfil`, formData);
  }

  public desativarPerfil(): Observable<void> {
    return this.http.delete<void>(`${this.URL}/desativar-perfil`);
  }

  public buscarInformacoesRankingAvaliacoes(): Observable<RankingFuncionarioDto> {
    return this.http.get<RankingFuncionarioDto>(`${this.URL}/ranking`);
  }

  public buscarAvaliacoes(): Observable<AvaliacaoDto[]> {
    return this.http.get<AvaliacaoDto[]>(`${this.URL}/avaliacoes`);
  }

  public buscarConsultasAtendenteVeterinario(): Observable<
    ConsultasAtendenteVeterinarioDto[]
  > {
    return this.http.get<ConsultasAtendenteVeterinarioDto[]>(
      `${this.URL}/consultas-atendente-veterinario`,
    );
  }

  public buscarRelatorioFinanceiroCliente(): Observable<RelatorioFinanceiroClienteDto> {
    return this.http.get<RelatorioFinanceiroClienteDto>(
      `${this.URL}/cliente/relatorio-financeiro`,
    );
  }

  public buscarAvaliacoesCliente(): Observable<MinhasAvaliacoesDto[]> {
    return this.http.get<MinhasAvaliacoesDto[]>(
      `${this.URL}/cliente/minhas-avaliacoes`,
    );
  }
}
