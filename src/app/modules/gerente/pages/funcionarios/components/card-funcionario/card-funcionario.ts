import { Component, inject, Input } from '@angular/core';
import type { FuncionarioDto } from '../../models/FuncionarioDto';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import { TextareaModule } from 'primeng/textarea';
import { NotificacoesWsService } from '../../../../../../shared/services/ws/notificacoes-ws-service';

@Component({
  selector: 'app-card-funcionario',
  imports: [PrimeNGModule, TextareaModule],
  templateUrl: './card-funcionario.html',
  styleUrl: './card-funcionario.scss',
})
export class CardFuncionario {
  @Input() funcionario: FuncionarioDto | null = null;
  public visibilidadeSimulador = false;
  public idUsuarioSelecionado: number | null = null;
  public mensagem = '';
  public titulo = '';
  private readonly service = inject(NotificacoesWsService);

  public abrirSimulador(id: number): void {
    this.idUsuarioSelecionado = id;
    this.visibilidadeSimulador = true;
  }

  public enviarMensagem(): void {
    if (
      this.idUsuarioSelecionado == null ||
      this.mensagem.trim() === '' ||
      this.titulo.trim() === ''
    )
      return;
    const form = {
      idDestinatario: this.idUsuarioSelecionado,
      titulo: this.titulo,
      mensagem: this.mensagem,
      tipo: 'MENSAGEM',
    };
    this.service.novaMensagem(form);
    this.visibilidadeSimulador = false;
    this.mensagem = '';
    this.titulo = '';
    this.idUsuarioSelecionado = null;
  }
}
