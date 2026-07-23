import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { filter } from 'rxjs';
import { RotasService } from '../../../core/services/rotas-service';
import { PrimeNGModule } from '../../modules/prime-ng/prime-ng-module';
import { ThemeService } from '../../../core/services/theme-service';
import type { RoutesModel } from '../../models/RoutesModel';
import { PopoverModule } from 'primeng/popover';
import { CheckboxModule } from 'primeng/checkbox';
import { TokenService } from '../../../core/services/token-service';
import { NotificacoesPop } from "../notificacoes-pop/notificacoes-pop";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header-pagina',
  imports: [
    FormsModule,
    CommonModule,
    PrimeNGModule,
    BadgeModule,
    OverlayBadgeModule,
    PopoverModule,
    CheckboxModule,
    NotificacoesPop
],
  templateUrl: './header-pagina.html',
  styleUrl: './header-pagina.scss',
})
export class HeaderPagina {
  private readonly tokenService = inject(TokenService);

  public checked = false;
  private rotasService = inject(RotasService);

  public imagem = null;

  private readonly router = inject(Router);
  private readonly themeService = inject(ThemeService);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects != '/login') {
          this.rotasService.setarUltimaRota(event.urlAfterRedirects || '');
        }
      });
  }

  public voltar(): void {
    window.history.back();
  }

  public get rota(): RoutesModel {
    const ultimaRota: string = this.rotasService.ultimaRotaAcessada;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rotas: any[] = this.rotasService.getAllowedRoutes();

    const rotasPartes: string[] = ultimaRota.split('/');
    rotasPartes.shift();

    let rotaAtual = rotasPartes[rotasPartes.length - 1];

    if (!isNaN(Number(rotaAtual))) {
      rotaAtual = rotasPartes[rotasPartes.length - 2];
    }

    return rotas.find((rota) => rota.path.includes(rotaAtual));
  }

  public alterarTema(): void {
    this.themeService.toggleTheme();
  }

  public sair(): void {
    this.tokenService.removeToken();
  }

  /**
   *
   * @description Busca o nome do usuário e o tipo de usuário a partir do token e os retorna
   * @returns - {nome: string, tipo: string} - Nome do usuário e tipo de usuário
   */
  public get getNomeUsuario(): { nome: string; tipo: string } {
    const token = this.tokenService.getToken;
    if (!token)
      return {
        nome: '',
        tipo: '',
      };
    const nomeUsuario = this.tokenService.decodeToken(token).nomeUsuario;
    const permissoes: string = this.tokenService.decodeToken(token).permissao;
    const permisaoTratada =
      permissoes.charAt(0).toUpperCase() +
      permissoes.slice(1).toLocaleLowerCase();

    return {
      nome: nomeUsuario,
      tipo: permisaoTratada,
    };
  }
}
