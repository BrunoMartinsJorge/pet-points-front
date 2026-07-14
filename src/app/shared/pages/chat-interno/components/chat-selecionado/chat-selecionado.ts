import { CommonModule } from '@angular/common';
import type { SimpleChanges , OnInit , OnChanges , OnDestroy } from '@angular/core';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { MensagemInterna, UsuarioInterno } from '../../../../models/ChatModels';
import { ChatApiService } from '../../../../services/chat-api-service';
import { ChatInternoWsService } from '../../../../services/ws/chat-interno-ws-service';
import { TokenService } from '../../../../../core/services/token-service';
import { firstValueFrom, type Subscription } from 'rxjs';
import { PrimeNGModule } from '../../../../modules/prime-ng/prime-ng-module';

@Component({
  selector: 'app-chat-selecionado',
  imports: [CommonModule, FormsModule, PrimeNGModule],
  templateUrl: './chat-selecionado.html',
  styleUrl: './chat-selecionado.scss',
})
export class ChatSelecionado implements OnInit, OnChanges, OnDestroy {
  @Input() alvo: UsuarioInterno | null = null;
 
  private api = inject(ChatApiService);
  private ws = inject(ChatInternoWsService);
  private tokenService = inject(TokenService);
 
  private meuId = this.tokenService.getTokenPayload?.idUsuario ?? null;
  private wsSub?: Subscription;
 
  idChat: number | null = null;
  mensagens: MensagemInterna[] = [];
  rascunho = '';
 
  ngOnInit(): void {
    this.ws.connect(); // conecta uma única vez
    // única fonte de verdade: o serviço mantém a lista (histórico + tempo real)
    this.wsSub = this.ws.mensagens$.subscribe((m) => (this.mensagens = m));
  }
 
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (!changes['alvo'] || !this.alvo) return;
    // resolve o chat (usa o existente ou cria via get-or-create no back)
    this.idChat = this.alvo.idChat ?? (await firstValueFrom(this.api.abrirChatInterno(this.alvo.id)));
 
    // carrega o histórico e entrega ao serviço, que também passa a receber em tempo real
    const historico = await firstValueFrom(this.api.historicoInterno(this.idChat));
    this.ws.abrirChat(this.idChat, historico);
  }
 
  enviar(): void {
    const texto = this.rascunho.trim();
    if (!texto || !this.alvo) return;
    this.ws.enviar({ idChat: this.idChat, idDestinatario: this.alvo.id, mensagem: texto });
    this.rascunho = '';
  }
 
  ehMinha(msg: MensagemInterna): boolean {
    return msg.remetente.id === this.meuId;
  }
 
  ngOnDestroy(): void {
    this.wsSub?.unsubscribe();
    this.ws.disconnect();
  }
}
