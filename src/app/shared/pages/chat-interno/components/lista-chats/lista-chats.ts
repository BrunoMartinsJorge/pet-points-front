import type { OnInit } from '@angular/core';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ChatApiService } from '../../../../services/chat-api-service';
import type { UsuarioInterno } from '../../../../models/ChatModels';

@Component({
  selector: 'app-lista-chats',
  imports: [],
  templateUrl: './lista-chats.html',
  styleUrl: './lista-chats.scss',
})
export class ListaChats implements OnInit {
  private api = inject(ChatApiService);
 
  @Output() selecionar = new EventEmitter<UsuarioInterno>();
 
  funcionarios: UsuarioInterno[] = [];
  selecionadoId: number | null = null;
 
  ngOnInit(): void {
    this.api.listarFuncionarios().subscribe((f) => (this.funcionarios = f));
  }
 
  escolher(f: UsuarioInterno): void {
    this.selecionadoId = f.id;
    this.selecionar.emit(f);
  }
}
