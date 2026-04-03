import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginForm } from "./shared/components/login-form/login-form";
import { RegisterForm } from "./shared/components/register-form/register-form";

@Component({
  selector: 'app-autenticacao',
  imports: [CommonModule, LoginForm, RegisterForm],
  templateUrl: './autenticacao.html',
  styleUrl: './autenticacao.scss',
})
export class Autenticacao {
  public mode_form: 'login' | 'register' = 'login';

  public toogleModeForm(): void {    
    this.mode_form = this.mode_form === 'login' ? 'register' : 'login';
  }

}
