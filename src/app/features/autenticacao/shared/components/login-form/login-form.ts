import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TokenService } from '../../../../../core/services/token-service';
import { PrimeNGModule } from '../../../../../shared/modules/prime-ng/prime-ng-module';
import type { FormLogin } from '../FormLogin';
import { AutenticaoService } from '../../../services/autenticao-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-form',
  imports: [PrimeNGModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
@Output() public toogleModeForm: EventEmitter<void> =
    new EventEmitter<void>();
  public visibilityByRecoverPassword = false;
  public loginForm: FormGroup = new FormGroup({});
  public recoverEmail = '';
  public recover_code = '';

  private readonly tokenService = inject(TokenService);
  private readonly service = inject(AutenticaoService);
  private readonly toast = inject(MessageService);

  constructor() {
    this.loginForm = this.generateForm();
  }

  private generateForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  public toogleRecoverPassowrd(): void {
    this.visibilityByRecoverPassword = !this.visibilityByRecoverPassword;    
  }

  public loginUser(): void {
    if (this.loginForm.invalid) return;
    const loginPayload: FormLogin = {
      email: this.loginForm.get('email')?.value,
      senha: this.loginForm.get('password')?.value,
    };
    this.service.login(loginPayload).subscribe({
      next: (res) => {
        const token = res.body.token || '';
        this.tokenService.setToken(token);
        this.tokenService.loadToken();
      },
      error: (err) => {
        console.error(err);
        this.toast.add({severity: 'error', summary: 'Erro', detail: err.error.message});
      },
    });
  }
}
