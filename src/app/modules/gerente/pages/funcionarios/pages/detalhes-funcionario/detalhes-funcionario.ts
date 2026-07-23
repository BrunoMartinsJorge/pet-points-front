import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioServices } from '../../services/funcionario-services';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import type { FuncionarioDto } from '../../models/FuncionarioDto';
import { ConverterCpfPipe } from '../../../../../../shared/pipes/converter-cpf-pipe';
import { GeneroBag } from '../../../../../../shared/components/genero-bag/genero-bag';
import type { AvaliacaoDto } from '../../../../../../shared/models/AvaliacaoDto';
import type { ConsultasFuncionarioDto } from '../../../../../../shared/models/ConsultasFuncionarioDto';
import { BagStatusConsulta } from '../../../../../../shared/components/bag-status-consulta/bag-status-consulta';
import type { MovimentacoesEstoquistaDto } from '../../models/MovimentacoesEstoquistasDto';
import { BagTipoMovimentacao } from '../../../../../../shared/components/bag-tipo-movimentacao/bag-tipo-movimentacao';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FuncionariosOpcoesForm } from '../../../../shared/TiposFuncionarios';
import type { FileSelectEvent } from 'primeng/fileupload';
import type { NovoFuncionarioForm } from '../registrar-funcionario/forms/NovoFuncionarioForm';

@Component({
  selector: 'app-detalhes-funcionario',
  imports: [
    PrimeNGModule,
    ConverterCpfPipe,
    GeneroBag,
    BagStatusConsulta,
    BagTipoMovimentacao,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './detalhes-funcionario.html',
  styleUrl: './detalhes-funcionario.scss',
})
export class DetalhesFuncionario implements OnInit {
  private readonly router = inject(ActivatedRoute);
  private readonly routerNavigate = inject(Router);
  private readonly service = inject(FuncionarioServices);
  private readonly confirmDialog = inject(ConfirmationService);

  private ID_FUNCIONARIO: number | null = null;

  public carregandoFuncionario = false;
  public funcionario: FuncionarioDto | null = null;

  public carregandoAvaliacoes = false;
  public avaliacoes: AvaliacaoDto[] = [];

  public carregandoConsultas = false;
  public consultas: ConsultasFuncionarioDto[] = [];

  public carregandoMovimentacoes = false;
  public movimentacoes: MovimentacoesEstoquistaDto[] = [];

  public desativandoFuncionario = false;

  public visibilidadeDialogEditarFuncionario = false;
  // public editarFuncionarioForm: EditarFuncionarioForm = {
  //   email: '',
  //   senha: '',
  //   telefone: '',
  //   genero: GeneroEnum.MASCULINO,
  //   dataNascimento: new Date(),
  //   permissao: TiposFuncionarios.A,
  // };

  public readonly generos = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
  ];

  public readonly permissoes = FuncionariosOpcoesForm;

  public formularioEditarFuncionario!: FormGroup;

  ngOnInit(): void {
    this.ID_FUNCIONARIO = this.getFuncionarioId();
    this.buscarFuncionario();
  }

  private getFuncionarioId(): number | null {
    let id = null;
    this.router.paramMap.subscribe((params) => {
      id = Number(params.get('id') || null);
    });
    return id;
  }

  public alterarVisibilidadeEditarFuncionario(): void {
    this.gerarFormularioEditarFuncionario();
    this.visibilidadeDialogEditarFuncionario =
      !this.visibilidadeDialogEditarFuncionario;
  }

  private gerarFormularioEditarFuncionario(): void {
    if (!this.funcionario) return;
    this.formularioEditarFuncionario = new FormGroup({
      nome: new FormControl(this.funcionario.nome, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(this.funcionario.email, [
        Validators.required,
        Validators.email,
      ]),
      telefone: new FormControl(this.funcionario.telefone, [
        Validators.required,
      ]),
      genero: new FormControl(this.funcionario.genero, [Validators.required]),
      dataNascimento: new FormControl(
        this.funcionario.dataNascimento
          ? new Date(this.funcionario.dataNascimento)
          : null,
        [Validators.required],
      ),
      permissao: new FormControl(this.funcionario.permissao, [
        Validators.required,
      ]),
      imagem: new FormControl(null),
    });
  }

  public get getImagemFuncionario(): string {
    if (!this.funcionario) return '';
    const uuid = this.funcionario.arquivo || '';
    return uuid !== '' ? 'http://localhost:8080/arquivos/' + uuid : '';
  }

  public carregarArquivo(event: FileSelectEvent): void {
    const file = event.files[0];
    if (file) this.formularioEditarFuncionario.get('imagem')?.setValue(file);
  }

  public enviarAlteracoes(): void {
    if (!this.funcionario) return;
    const payload = this.formularioEditarFuncionario
      .value as NovoFuncionarioForm;
    const file = this.formularioEditarFuncionario.get('imagem')?.value as File;
    this.service
      .editarFuncionario(this.funcionario.id, payload, file)
      .subscribe({
        next: () => {
          this.visibilidadeDialogEditarFuncionario = false;
          this.buscarFuncionario();
        },
      });
  }

  private buscarFuncionario(): void {
    if (!this.ID_FUNCIONARIO) return;
    this.carregandoFuncionario = true;
    this.funcionario = null;
    this.service.buscarFuncionarioPorId(this.ID_FUNCIONARIO).subscribe({
      next: (res: FuncionarioDto) => {
        this.funcionario = res;
        this.carregandoFuncionario = false;
        if (res.permissao === 'ATENDENTE' || res.permissao === 'VETERINARIO') {
          this.buscarAvaliacoes();
          this.buscarConsultas();
        } else if (res.permissao === 'ESTOQUISTA') {
          this.buscarMovimentacoes();
        }
      },
      error: () => {
        this.carregandoFuncionario = false;
      },
    });
  }

  public verDetalhesConsulta(id: number): void {
    this.routerNavigate.navigate(['gerente/detalhes-consulta', id]);
  }

  public ativarConfirmDialog(): void {
    this.confirmDialog.confirm({
      header: 'Desativar funcionário',
      message: 'Deseja realmente desativar o funcionário?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.desativarFuncionario();
      },
      rejectButtonProps: {
        label: 'Não Desativar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Desativar',
        severity: 'danger',
        icon: 'pi pi-trash',
      },
    });
  }

  private desativarFuncionario(): void {
    if (!this.ID_FUNCIONARIO) return;
    this.desativandoFuncionario = true;
    this.service.desativarFuncionario(this.ID_FUNCIONARIO).subscribe({
      next: () => {
        this.desativandoFuncionario = false;
        this.routerNavigate.navigate(['gerente/funcionarios']);
      },
      error: () => {
        this.desativandoFuncionario = false;
      },
    });
  }

  private buscarAvaliacoes(): void {
    if (!this.ID_FUNCIONARIO) return;
    this.carregandoAvaliacoes = true;
    this.avaliacoes = [];
    this.service.buscarAvaliacoesPorFuncionario(this.ID_FUNCIONARIO).subscribe({
      next: (res: AvaliacaoDto[]) => {
        this.avaliacoes = res;
        this.carregandoAvaliacoes = false;
      },
      error: () => {
        this.carregandoAvaliacoes = false;
      },
    });
  }

  private buscarConsultas(): void {
    if (!this.ID_FUNCIONARIO) return;
    this.carregandoConsultas = true;
    this.consultas = [];
    this.service.buscarConsultasPorFuncionario(this.ID_FUNCIONARIO).subscribe({
      next: (res: ConsultasFuncionarioDto[]) => {
        this.consultas = res;
        this.carregandoConsultas = false;
      },
      error: () => {
        this.carregandoConsultas = false;
      },
    });
  }

  private buscarMovimentacoes(): void {
    if (!this.ID_FUNCIONARIO) return;
    this.carregandoMovimentacoes = true;
    this.movimentacoes = [];
    this.service
      .buscarMovimentacoesPorFuncionario(this.ID_FUNCIONARIO)
      .subscribe({
        next: (res: MovimentacoesEstoquistaDto[]) => {
          this.movimentacoes = res;
          this.carregandoMovimentacoes = false;
        },
        error: () => {
          this.carregandoMovimentacoes = false;
        },
      });
  }
}
