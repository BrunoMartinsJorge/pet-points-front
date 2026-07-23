import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../modules/prime-ng/prime-ng-module';
import type { ClienteDto } from './model/ClienteDto';
import { ClientesClinicaService } from './service/clientes-clinica-service';
import { GeneroEnumOpcoes } from '../../models/enums/GeneroEnum';
import { GeneroBag } from '../../components/genero-bag/genero-bag';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/services/token-service';

@Component({
  selector: 'app-clientes-clinica',
  imports: [PrimeNGModule, GeneroBag, ToggleButtonModule],
  templateUrl: './clientes-clinica.html',
  styleUrl: './clientes-clinica.scss',
})
export class ClientesClinica implements OnInit {
  private readonly service = inject(ClientesClinicaService);
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenService);

  private clientes: ClienteDto[] = [];
  public clientesFiltrados: ClienteDto[] = [];

  public readonly generos = GeneroEnumOpcoes;
  public filtros = {
    nome: '',
    genero: '',
  };
  public carregandoRelatorio = false;

  public tipoUsuario = '';

  ngOnInit(): void {
    this.buscarClientes();
    const token = this.tokenService.getTokenPayload;
    if (!token) return;
    const permissao = token.permissoes[0] == 'A' ? 'ATENDENTE' : 'GERENTE';
    this.tipoUsuario = permissao;
  }

  private buscarClientes(): void {
    this.clientes = [];
    this.clientesFiltrados = [];
    this.service.listarClientes().subscribe({
      next: (res: ClienteDto[]) => {
        this.clientes = res;
        this.clientesFiltrados = res;
      },
    });
  }

  public filtrarClientes(): void {
    let clientes = this.clientes;
    if (this.filtros.nome.trim() !== '') {
      clientes = clientes.filter((cliente) =>
        cliente.nome.toLowerCase().includes(this.filtros.nome.toLowerCase()),
      );
    }
    if (this.filtros.genero !== '') {
      clientes = clientes.filter(
        (cliente) => cliente.genero === this.filtros.genero,
      );
    }
    this.clientesFiltrados = clientes;
  }

  public verDetalhesCliente(idCliente: number): void {
    this.router.navigate([this.tipoUsuario.toLocaleLowerCase() + '/detalhes-clientes', idCliente]);
  }

  public limparFiltros(): void {
    this.filtros = {
      nome: '',
      genero: '',
    };
    this.filtrarClientes();
  }

  public gerarRelatorioClientes(): void {
    this.carregandoRelatorio = true;
    const form = {
      nome: this.filtros.nome,
      genero: this.filtros.genero
    };
    this.service.gerarRelatorioClientes(form).subscribe({
      next: (res: Blob) => {
        const file = new Blob([res], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        this.carregandoRelatorio = false;
      },
      error: () => {
        this.carregandoRelatorio = false;
      }
    });
  }
}
