import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import { FuncionarioServices } from '../../services/funcionario-services';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getPermissoesPorUsuario } from '../../../../shared/TiposFuncionarios';
import { InputMaskModule } from 'primeng/inputmask';
import type { NovoFuncionarioForm } from './forms/NovoFuncionarioForm';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registrar-funcionario',
  imports: [PrimeNGModule, ReactiveFormsModule, InputMaskModule],
  templateUrl: './registrar-funcionario.html',
  styleUrl: './registrar-funcionario.scss',
})
export class RegistrarFuncionario {
  private readonly service = inject(FuncionarioServices);
  private readonly toast = inject(MessageService);
  public readonly generos = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
  ]
  public formulario: FormGroup = this.gerarRelatorio();

  private gerarRelatorio(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required]),
      nome: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
      telefone: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      permissao: new FormControl('', [Validators.required]),
    });
  }

  public get getPermissoes(): string[] {
    return getPermissoesPorUsuario(this.formulario.get('permissao')?.value);
  }

  public cadastrarFuncionario(): void {
    if(this.formulario.invalid) return;
    const funcionario = this.formulario.value;
    const payload: NovoFuncionarioForm = {
      nome: funcionario.nome,
      email: funcionario.email,
      senha: funcionario.senha,
      cpf: funcionario.cpf,
      telefone: funcionario.telefone,
      genero: funcionario.genero,
      dataNascimento: funcionario.dataNascimento,
      permissao: funcionario.permissao
    }
    this.service.cadastrarFuncionario(payload).subscribe({
      next: () => {
        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Funcionario cadastrado com sucesso',
        });
        this.formulario.reset();
      },
    })
  }

  public get getDescricaoCargo(): string {
    const permissao = this.formulario.get('permissao')?.value;
    switch (permissao) {
      case 'G':
        return 'Gerente';
      case 'A':
        return 'Atendente';
      case 'E':
        return 'Estoquista';
      case 'C':
        return 'Cliente';
      case 'V':
        return 'Veterinario';
    }
    return '';
  }
}
