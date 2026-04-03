import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { FuncionarioServices } from './services/funcionario-services';
import { FuncionariosOpcoes } from '../../shared/TiposFuncionarios';
import type { FuncionarioDto } from './models/FuncionarioDto';
import { CardFuncionario } from './components/card-funcionario/card-funcionario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionarios',
  imports: [PrimeNGModule, CardFuncionario],
  templateUrl: './funcionarios.html',
  styleUrl: './funcionarios.scss',
})
export class Funcionarios {
  private funcionarios: FuncionarioDto[] = [];
  public funcionariosFiltrados: FuncionarioDto[] = [];

  public filtros = {
    nome_email: '',
    tipo: '',
  };
  public readonly tiposFuncionarios = FuncionariosOpcoes;

  private service = inject(FuncionarioServices);
  private router = inject(Router);

  constructor() {
    this.listarFuncionariosClinica();
  }

  public filtrarFuncionarios(): void {
    if (this.filtros.nome_email || this.filtros.tipo) {
      this.funcionariosFiltrados = this.funcionarios.filter((funcionario) => {
        return (
          (this.filtros.nome_email &&
            (funcionario.email
              .toLowerCase()
              .includes(this.filtros.nome_email.toLowerCase()) ||
              funcionario.nome
                .toLowerCase()
                .includes(this.filtros.nome_email.toLowerCase()))) ||
          (this.filtros.tipo && funcionario.permissao === this.filtros.tipo)
        );
      });
    }
  }

  public acessarPaginaRegistroFuncionario(): void {
    this.router.navigate(['gerente/registrar-funcionario']);
  }

  private listarFuncionariosClinica(): void {
    this.funcionarios = [];
    this.service
      .listarFuncionarios()
      .subscribe((funcionarios: FuncionarioDto[]) => {
        this.funcionarios = funcionarios;
        this.funcionariosFiltrados = this.funcionarios;
      });
  }
}
