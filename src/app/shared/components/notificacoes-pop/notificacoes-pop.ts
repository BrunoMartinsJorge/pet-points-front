import type { OnInit } from '@angular/core';
import { Component, inject, ViewChild } from '@angular/core';
import { PrimeNGModule } from '../../modules/prime-ng/prime-ng-module';
import { NotificacoesService } from '../../services/notificacoes-service';
import type { NotificacaoDto } from '../../services/ws/notificacoes-ws-service';
import { NotificacoesWsService } from '../../services/ws/notificacoes-ws-service';
import type { Popover } from 'primeng/popover';
import type { CheckboxChangeEvent} from 'primeng/checkbox';
import type { TiposNotificacoesEnum } from '../../models/enums/TiposNotificacoesEnum';
import { getIconPorTipo } from '../../models/enums/TiposNotificacoesEnum';

@Component({
  selector: 'app-notificacoes-pop',
  imports: [PrimeNGModule],
  templateUrl: './notificacoes-pop.html',
  styleUrl: './notificacoes-pop.scss',
})
export class NotificacoesPop implements OnInit {
  private readonly notificacoesWs = inject(NotificacoesWsService);
  private readonly notificacoesService = inject(NotificacoesService);
  @ViewChild('op') op!: Popover;

  ngOnInit(): void {
    this.notificacoesWs.connect();
    this.notificacoesService.notificacoes$.subscribe((n) => {
      this.notificacoes = n;
    });
  }

  public fehcarPopover(): void {
    this.notificacoesParaMarcarComoLidas = [];
    this.notificacoesParaMarcarComoLidas = [
      ...this.notificacoesParaMarcarComoLidas,
    ];
    this.op.hide();
  }

  public notificacoes: NotificacaoDto[] = [];
  public foiAbertoNotificiacoes = false;
  public notificacoesParaMarcarComoLidas: number[] = [];

  public marcarSelecionadasComoLidas(todas: boolean): void {
    if (todas)
      this.notificacoesParaMarcarComoLidas = this.notificacoes.map((n) => n.id);
    if (this.notificacoesParaMarcarComoLidas.length == 0) return;
    this.notificacoesService.marcarNotificacoesComoLidas(
      this.notificacoesParaMarcarComoLidas,
    );
  }

  public alterarPopover(): void {
    this.op.toggle(event);
    this.foiAbertoNotificiacoes = true;
  }

  public getIcone(tipo: TiposNotificacoesEnum): string {
    return getIconPorTipo(tipo);
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

  public notificacaoMarcadaComoLida(id: number): boolean {
    const notificacao = this.notificacoesParaMarcarComoLidas.find(
      (n) => n === id,
    );
    return notificacao ? true : false;
  }
}
