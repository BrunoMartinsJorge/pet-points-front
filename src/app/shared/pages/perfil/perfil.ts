import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { TokenService } from '../../../core/services/token-service';
import { PrimeNGModule } from '../../modules/prime-ng/prime-ng-module';
import { Imagem } from '../../components/imagem/imagem';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import type { InformacoesUsuarioDto } from './model/InformacoesUsuarioDto';
import { PerfilService } from './service/perfil-service';
import { GeneroEnumOpcoesFormulario } from '../../models/enums/GeneroEnum';
import type { FileSelectEvent } from 'primeng/fileupload';
import type { EditarPerfilForm } from './form/EditarPerfilForm';
import { ConfirmDialog } from "primeng/confirmdialog";
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-perfil',
  imports: [PrimeNGModule, Imagem, ReactiveFormsModule, ConfirmDialog],
  providers: [ConfirmationService],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil implements OnInit {
  private readonly service = inject(PerfilService);
  private readonly tokenService = inject(TokenService);
  private readonly confirmationService = inject(ConfirmationService);

  public readonly tiposGeneros = GeneroEnumOpcoesFormulario;
  public informacoesUsuario!: FormGroup;
  public novaImagem = {
    file: null as File | null,
    url: '',
  };
  private dadosUsuario: InformacoesUsuarioDto | null = null;
  public carregandoUsuario = false;

  public podeEditar = false;

  ngOnInit(): void {
    this.setarUrlTipoUsuario();
    this.buscarDadosUsuario();
  }

  private setarUrlTipoUsuario(): void {
    this.service.setUrlTipoUsuario(this.getTipoUsuario);
  }

  private buscarDadosUsuario(): void {
    this.dadosUsuario = null;
    this.carregandoUsuario = true;
    this.service.buscarInformacoesUsuario().subscribe({
      next: (dados: InformacoesUsuarioDto) => {
        this.dadosUsuario = dados;
        this.gerarInformacoesUsuario();
        this.carregandoUsuario = false;
      },
    });
  }

  public carregarArquivo(event: FileSelectEvent): void {
    const file: File = event.currentFiles[0];
    if (file)
      this.novaImagem = { file, url: URL.createObjectURL(file) };
  }

  private gerarInformacoesUsuario(): void {
    if (this.dadosUsuario === null) return;
    const form = new FormGroup({
      nome: new FormControl(this.dadosUsuario.nome || '', [
        Validators.required,
      ]),
      email: new FormControl(this.dadosUsuario.email || '', [
        Validators.required,
        Validators.email,
      ]),
      imagem: new FormControl(this.dadosUsuario.imagem || ''),
      genero: new FormControl(this.dadosUsuario.genero || '', [
        Validators.required,
      ]),
      dataNascimento: new FormControl(
        this.dadosUsuario.dataNascimento || new Date(),
        [Validators.required],
      ),
      telefone: new FormControl(this.dadosUsuario.telefone || '', [
        Validators.required,
      ]),
      cpf: new FormControl(this.dadosUsuario.cpf || '', [Validators.required]),
    });
    this.informacoesUsuario = form;
    this.informacoesUsuario.disable();
  }

  public alterarPermissaoEdicao(): void {
    this.podeEditar = !this.podeEditar;
    if (!this.podeEditar) {
      this.gerarInformacoesUsuario();
    } else {
      this.informacoesUsuario.enable();
    }
  }

  public get getImagemUsuario(): string {
    const token = this.tokenService.getToken;
    if (!token) return '';
    const idUsuario = this.tokenService.decodeToken(token).id_usuario;
    return idUsuario !== ''
      ? 'http://localhost:8080/arquivos/usuario/' + idUsuario
      : '';
  }

  public get getTipoUsuario(): string {
    const token = this.tokenService.getToken;
    if (!token) return '';
    return this.tokenService.decodeToken(token).permissao;
  }

  private converterStringData(data: string): Date {
    return new Date(data);
  }

  public enviarAlteracoes(): void {
    if (this.informacoesUsuario.invalid) return;
    const form: EditarPerfilForm = this.informacoesUsuario.value;
    form.dataNascimento = this.converterStringData(this.informacoesUsuario.value.dataNascimento);
    this.service.enviarAlteracoes(form, this.novaImagem.file).subscribe({
      next: () => {
        this.buscarDadosUsuario();
        this.alterarPermissaoEdicao();
      },
    });
  }

  public desativarPerfil(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: 'Desativar Perfil',
                  rejectButtonProps: {
                label: 'Manter Ativo',
                icon: 'pi pi-times',
                variant: 'outlined',
                size: 'small'
            },
            acceptButtonProps: {
                label: 'Desativar',
                severity: 'danger',
                icon: 'fa fa-user-minus',
                size: 'small'
            },
            accept: () => {
                // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            },
            reject: () => {
                // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }

    })
  }
}
