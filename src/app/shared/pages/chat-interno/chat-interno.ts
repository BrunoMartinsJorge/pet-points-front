import { Component } from '@angular/core';
import { ListaChats } from './components/lista-chats/lista-chats';
import { ChatSelecionado } from './components/chat-selecionado/chat-selecionado';
import type { UsuarioInterno } from '../../models/ChatModels';

@Component({
  selector: 'app-chat-interno',
  imports: [ListaChats, ChatSelecionado],
  templateUrl: './chat-interno.html',
  styleUrl: './chat-interno.scss',
})
export class ChatInterno {
  public alvo: UsuarioInterno | null = null;
}
