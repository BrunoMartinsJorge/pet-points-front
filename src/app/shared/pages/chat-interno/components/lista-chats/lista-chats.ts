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

  async ngOnInit(): Promise<void> {
    this.buscarFuncionarios();
  }

  private buscarFuncionarios(): void {
    this.api.listarFuncionarios().subscribe((f) => {
      this.funcionarios = f;
      this.verificarRedirecionamento();
    });
  }

  private verificarRedirecionamento(): void {
    if (!this.api.redirecionado || !this.api.idFuncionarioSelecionado) return;
    const idFuncionario = this.api.idFuncionarioSelecionado;
    const funcionario = this.funcionarios.find((f) => f.id === idFuncionario);
    if (!funcionario) return;
    this.selecionar.emit(funcionario);
    this.selecionadoId = idFuncionario;
    this.api.redirecionado = false;
    this.api.idFuncionarioSelecionado = null;
  }

  escolher(f: UsuarioInterno): void {
    this.selecionadoId = f.id;
    this.selecionar.emit(f);
  }
}
