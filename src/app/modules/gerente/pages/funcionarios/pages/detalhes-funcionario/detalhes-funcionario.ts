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
