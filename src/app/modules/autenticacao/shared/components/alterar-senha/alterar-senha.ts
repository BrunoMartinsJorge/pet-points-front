import { Component, EventEmitter, inject, Output } from '@angular/core';
import { PrimeNGModule } from '../../../../../shared/modules/prime-ng/prime-ng-module';
import { StepperModule } from 'primeng/stepper';
import { InputOtpModule } from 'primeng/inputotp';
import { AutenticaoService } from '../../../services/autenticao-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-alterar-senha',
  imports: [PrimeNGModule, StepperModule, InputOtpModule],
  templateUrl: './alterar-senha.html',
  styleUrl: './alterar-senha.scss',
})
export class AlterarSenha {
  private readonly service = inject(AutenticaoService);
  private readonly messageService = inject(MessageService);
  @Output() public mudarVisibilidadeAlterarSenha: EventEmitter<void> =
    new EventEmitter<void>();
  public codigoAlteracao = '';
  public codigoValido = false;
  public novaSenha = '';
  public email = '';
  public senhaAlterada = false;

  public get emailValido(): boolean {
    if (this.email.trim().length === 0) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  public solicitarCodigoAlteracao(): void {
    this.codigoAlteracao = '';
    this.service.solicitarCodigoAlteracaoSenha(this.email).subscribe();
  }

  public validarCodigoAlteracao(): void {
    if (this.codigoAlteracao.length !== 5) return;
    this.service
      .validarCodigoAlteracao(this.email, this.codigoAlteracao)
      .subscribe({
        next: () => {
          this.codigoValido = true;
        },
      });
  }

  public resetarFormulario(): void {
    this.codigoAlteracao = '';
    this.codigoValido = false;
    this.novaSenha = '';
    this.email = '';
    this.senhaAlterada = false;
    this.mudarVisibilidadeAlterarSenha.emit();
  }

  public alterarSenha(): void {
    this.senhaAlterada = false;
    if (
      !this.codigoValido ||
      this.codigoAlteracao.length !== 5 ||
      this.novaSenha.trim().length < 6
    )
      return;
    this.service
      .alterarSenha(this.email, this.codigoAlteracao, this.novaSenha)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Senha Alterada',
            detail: 'Sua senha foi alterada com sucesso!',
          });
          this.senhaAlterada = true;
        },
      });
  }
}
