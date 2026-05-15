import { CommonModule } from '@angular/common';
import type { OnInit } from '@angular/core';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { filter } from 'rxjs';
import { RotasService } from '../../../core/services/rotas-service';
import { PrimeNGModule } from '../../modules/prime-ng/prime-ng-module';
import { ThemeService } from '../../../core/services/theme-service';
import type { RoutesModel } from '../../models/RoutesModel';
import type { Popover } from 'primeng/popover';
import { PopoverModule } from 'primeng/popover';
import type { NotificacaoDto } from '../../services/ws/notificacoes-ws-service';
import { NotificacoesWsService } from '../../services/ws/notificacoes-ws-service';
import { NotificacoesService } from '../../services/notificacoes-service';
import type { CheckboxChangeEvent } from 'primeng/checkbox';
import { CheckboxModule } from 'primeng/checkbox';
import { TokenService } from '../../../core/services/token-service';

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
  ],
  templateUrl: './header-pagina.html',
  styleUrl: './header-pagina.scss',
})
export class HeaderPagina implements OnInit {
  private readonly notificacoesWs = inject(NotificacoesWsService);
  private readonly notificacoesService = inject(NotificacoesService);
  private readonly tokenService = inject(TokenService);

  @ViewChild('op') op!: Popover;
  @ViewChild('perfilOp') perfilOp!: Popover;

  public checked = false;
  private rotasService = inject(RotasService);
  public notificacoes: NotificacaoDto[] = [];
  public foiAbertoNotificiacoes = false;
  public notificacoesParaMarcarComoLidas: number[] = [];

  public imagem = null;

  private readonly router = inject(Router);
  private readonly themeService = inject(ThemeService);

  ngOnInit(): void {
    this.notificacoesService.notificacoes$.subscribe((n) => {
      this.notificacoes = n;
    });
  }

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects != '/login') {
          this.rotasService.setarUltimaRota(event.urlAfterRedirects || '');
        }
      });
    this.notificacoesWs.connect();
  }

  public alterarPopover(): void {
    this.op.toggle(event);
    this.foiAbertoNotificiacoes = true;
  }

  public alterarPopoverPerfil(): void {
    this.perfilOp.toggle(event);
  }

  public voltar(): void {
    window.history.back();
  }

  public notificacaoMarcadaComoLida(id: number): boolean {
    const notificacao = this.notificacoesParaMarcarComoLidas.find(
      (n) => n === id,
    );
    return notificacao ? true : false;
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

  public fehcarPopover(): void {
    this.notificacoesParaMarcarComoLidas = [];
    this.notificacoesParaMarcarComoLidas = [
      ...this.notificacoesParaMarcarComoLidas,
    ];
    this.op.hide();
  }

  public marcarSelecionadasComoLidas(todas: boolean): void {
    if (todas)
      this.notificacoesParaMarcarComoLidas = this.notificacoes.map((n) => n.id);
    if (this.notificacoesParaMarcarComoLidas.length == 0) return;
    this.notificacoesService.marcarNotificacoesComoLidas(
      this.notificacoesParaMarcarComoLidas,
    );
  }

  public marcarComoLida(
    event: CheckboxChangeEvent,
    idNotificacao: number,
  ): void {
    const notificacao = this.notificacoes.find((n) => n.id === idNotificacao);
    if (!notificacao) return;
    if (event.checked) this.notificacoesParaMarcarComoLidas.push(idNotificacao);
    else
      this.notificacoesParaMarcarComoLidas =
        this.notificacoesParaMarcarComoLidas.filter((n) => n !== idNotificacao);
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
