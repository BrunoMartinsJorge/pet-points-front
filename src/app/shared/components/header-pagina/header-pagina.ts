import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { filter } from 'rxjs';
import { RotasService } from '../../../core/services/rotas-service';
import { PrimeNGModule } from '../../modules/prime-ng/prime-ng-module';
import { TokenService } from '../../../core/services/token-service';
import { ThemeService } from '../../../core/services/theme-service';
import type { RoutesModel } from '../../models/RoutesModel';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header-pagina',
  imports: [
    FormsModule,
    CommonModule,
    PrimeNGModule,
    BadgeModule,
    OverlayBadgeModule,
  ],
  templateUrl: './header-pagina.html',
  styleUrl: './header-pagina.scss',
})
export class HeaderPagina {
  public checked = false;
  private rotasService = inject(RotasService);
  private readonly tokenService = inject(TokenService);
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
    // this.notif.notificacao$.subscribe(n => this.notificacoes = n);
  }

  /*public get getNotificacoes(): Notificacao[] {
    return this.notificacoes;
  }*/

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

  public limparNotificacoes(): void {
    // this.notif.limparNotificacoes();
  }
}
