import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../../shared/modules/prime-ng/prime-ng-module';
import { SelectButton } from 'primeng/selectbutton';
import type { MensagemAtendimento } from '../../../../../shared/models/ChatModels';
import { AtendimentosClienteService } from './services/atendimentos-cliente-service';
import type { ChatAtendimentoDto } from './models/ChatAtendimentoDto';
import { MessageService } from 'primeng/api';
 
@Component({
  selector: 'app-chat-atendimento-cliente',
  imports: [PrimeNGModule, SelectButton],
  providers: [MessageService],
  templateUrl: './chat-atendimento-cliente.html',
  styleUrl: './chat-atendimento-cliente.scss',
})
export class ChatAtendimentoCliente implements OnInit {
  private readonly service = inject(AtendimentosClienteService);
  private readonly toast = inject(MessageService);
  
  public visibilidadeDialogChatAtendimento = true;
  public atendimentos: ChatAtendimentoDto[] = [];
  public chatSelecionado: ChatAtendimentoDto | null = null;
  public modoAtendimento: 'SOLICITACAO' | 'LISTA' = 'LISTA';
  public mensagemChatSelecionado: MensagemAtendimento[] = [];

  public mensagemSolicitacaoAtendimento = '';

  public ngOnInit(): void {
    this.buscarAtendimentosCliente();
  }

  private buscarAtendimentosCliente(): void {
    this.atendimentos = [];
    this.service.buscarAtendimentosCliente().subscribe({
      next: (atendimentos: ChatAtendimentoDto[]) => {
        this.atendimentos = atendimentos;
      },
    });
  }

  public selecionarAtendimento(atendimento: ChatAtendimentoDto): void {
    this.chatSelecionado = atendimento;
  }

  public enviarSolicitacaoAtendimento(): void {
    if (this.mensagemSolicitacaoAtendimento == null || this.mensagemSolicitacaoAtendimento.trim() === '') {
      return;
    }

    this.service.solicitarAtendimento(this.mensagemSolicitacaoAtendimento).subscribe({
      next: () => {
        this.toast.add({ severity: 'success', summary: 'Solicitação enviada', detail: 'Sua solicitação de atendimento foi enviada com sucesso.' });
        this.mensagemSolicitacaoAtendimento = '';
        this.buscarAtendimentosCliente();
        this.modoAtendimento = 'LISTA';
      },
    });
  }
}
