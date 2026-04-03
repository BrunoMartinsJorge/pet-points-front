import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TokenService } from '../../../../../core/services/token-service';
import { PrimeNGModule } from '../../../../../shared/modules/prime-ng/prime-ng-module';
import type { FormLogin } from '../../forms/FormLogin';
import { AutenticaoService } from '../../../services/autenticao-service';
import { AlterarSenha } from '../alterar-senha/alterar-senha';

@Component({
  selector: 'app-login-form',
  imports: [PrimeNGModule, AlterarSenha],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  @Output() public toogleModeForm: EventEmitter<void> =
    new EventEmitter<void>();
  public loginForm: FormGroup = this.gerarFormularioLogin();
  public carregandoLogin = false;
  public visibilidadeAlterarSenha = false;

  private readonly tokenService = inject(TokenService);
  private readonly service = inject(AutenticaoService);

  /**
   * 
   * @description - Gera o formulário de login com os campos de email e senha, utilizando as validações do Angular Forms
   * @returns - {FormGroup} - Formulário de login
   */
  private gerarFormularioLogin(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  /**
   * 
   * @description - Emite um evento para o componente pai para alternar entre os formulários de login e cadastro
   */
  public mudarVisibilidadeSenha(): void {
    if(this.carregandoLogin) return;
    this.visibilidadeAlterarSenha = !this.visibilidadeAlterarSenha;
  }


  /**
   * 
   * @description - Emite um evento para o componente pai para alternar entre os formulários de login e cadastro
   */
  public logarUsuario(): void {
    if (this.loginForm.invalid) return;
    this.carregandoLogin = true;
    const loginPayload: FormLogin = {
      email: this.loginForm.get('email')?.value,
      senha: this.loginForm.get('password')?.value,
    };
    this.service.login(loginPayload).subscribe({
      next: (res) => {
        const token = res.token || '';
        this.tokenService.setToken(token);
        this.tokenService.loadToken();
        this.carregandoLogin = false;
      }
    }
    );
  }
}
