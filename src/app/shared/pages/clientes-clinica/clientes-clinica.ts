import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../modules/prime-ng/prime-ng-module';
import type { ClienteDto } from './model/ClienteDto';
import { ClientesClinicaService } from './service/clientes-clinica-service';
import {
  GeneroEnum,
  GeneroEnumOpcoes,
  GeneroEnumOpcoesFormulario,
} from '../../models/enums/GeneroEnum';
import { GeneroBag } from '../../components/genero-bag/genero-bag';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/services/token-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-clientes-clinica',
  imports: [
    PrimeNGModule,
    GeneroBag,
    ToggleButtonModule,
    StepperModule,
    DatePickerModule,
    InputMaskModule,
  ],
  templateUrl: './clientes-clinica.html',
  styleUrl: './clientes-clinica.scss',
})
export class ClientesClinica implements OnInit {
  private readonly service = inject(ClientesClinicaService);
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenService);

  private clientes: ClienteDto[] = [];
  public clientesFiltrados: ClienteDto[] = [];

  public readonly generosFiltros = GeneroEnumOpcoes;
  public readonly generos = GeneroEnumOpcoesFormulario;
  public filtros = {
    nome: '',
    genero: '',
  };
  public carregandoRelatorio = false;

  public tipoUsuario = '';

  public novoClienteForm!: FormGroup;
  public visibilidadeDialogNovoCliente = true;

  ngOnInit(): void {
    this.buscarClientes();
    const token = this.tokenService.getTokenPayload;
    if (!token) return;
    const permissao = token.permissoes[0] == 'A' ? 'ATENDENTE' : 'GERENTE';
    this.tipoUsuario = permissao;
    this.novoClienteForm = this.gerarFormularioNovoCliente();
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
    this.router.navigate([
      this.tipoUsuario.toLocaleLowerCase() + '/detalhes-clientes',
      idCliente,
    ]);
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
      genero: this.filtros.genero,
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
      },
    });
  }

  private gerarFormularioNovoCliente(): FormGroup {
    return new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      genero: new FormControl(GeneroEnum.MASCULINO, [Validators.required]),
      telefone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11),
      ]),
      cpf: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      dataNascimento: new FormControl('', [Validators.required]),
      senha: new FormControl('123456', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255),
      ]),
    });
  }

  public fecharDialogNovoCliente(): void {
    this.visibilidadeDialogNovoCliente = false;
    this.novoClienteForm.reset();
  }

  public get primeiraEtapaNovoClienteValida(): boolean {
    if (!this.novoClienteForm) return false;
    const nome = this.novoClienteForm.get('nome');
    const email = this.novoClienteForm.get('email');
    const senha = this.novoClienteForm.get('senha');
    if (!nome || !email || !senha) return false;
    return nome.value && email.value && senha.value;
  }

  public get segundaEtapaNovoClienteValida(): boolean {
    if (!this.novoClienteForm) return false;
    if (!this.primeiraEtapaNovoClienteValida) return false;
    const genero = this.novoClienteForm.get('genero');
    const telefone = this.novoClienteForm.get('telefone');
    const cpf = this.novoClienteForm.get('cpf');
    const dataNascimento = this.novoClienteForm.get('dataNascimento');
    if (!genero || !telefone || !cpf || !dataNascimento) return false;
    return genero.value && telefone.value && cpf.value && dataNascimento.value;
  }
}
