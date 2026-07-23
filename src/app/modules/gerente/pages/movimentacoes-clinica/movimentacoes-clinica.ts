import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import type { MovimentacoesDto } from './model/MovimentacoesDto';
import { MovimentacoesClinicaService } from './service/movimentacoes-clinica-service';
import { BagTipoMovimentacao } from '../../../../shared/components/bag-tipo-movimentacao/bag-tipo-movimentacao';
import type { ProdutoFiltroDto } from '../../../../shared/models/ProdutoFiltroDto';
import type { LancadoPorDto } from './model/LancadoPorDto';
import type { FiltroMovimentacoesForm } from './form/FiltroMovimentacoesForm';

@Component({
  selector: 'app-movimentacoes-clinica',
  imports: [PrimeNGModule, BagTipoMovimentacao],
  templateUrl: './movimentacoes-clinica.html',
  styleUrl: './movimentacoes-clinica.scss',
})
export class MovimentacoesClinica implements OnInit {
  public carregandoMovimentacoes = false;
  public carregandoProdutos = false;
  public carregandoEstoquistas = false;
  private movimentacoes: MovimentacoesDto[] = [];
  public movimentacoesFiltradas: MovimentacoesDto[] = [];
  public estoquistas: LancadoPorDto[] = [];
  public produtos: ProdutoFiltroDto[] = [];
  public readonly tiposMovimentacoes = [
    {
      label: 'Todos',
      value: '',
    },
    {
      label: 'Entrada',
      value: 'ENTRADA',
    },
    {
      label: 'Saida',
      value: 'SAIDA',
    },
  ];
  public filtros: FiltroMovimentacoesForm = {
    tipoMovimentacao: '',
    lancadoPor: null,
    produto: null,
  };

  private readonly service = inject(MovimentacoesClinicaService);

  ngOnInit(): void {
    this.listarMovimentacoes();
  }

  private listarMovimentacoes(): void {
    this.carregandoMovimentacoes = true;
    this.movimentacoes = [];
    this.movimentacoesFiltradas = [];
    this.service.listarMovimentacoes().subscribe({
      next: (response) => {
        this.movimentacoes = response;
        this.movimentacoesFiltradas = response;
        this.carregandoMovimentacoes = false;
        this.listarEstoquistas();
        this.listarProdutos();
      },
    });
  }

  public listarEstoquistas(): void {
    this.carregandoEstoquistas = true;
    this.estoquistas = [];
    this.service.listarEstoquistasFiltro().subscribe({
      next: (response) => {
        this.estoquistas = response;
        this.estoquistas.unshift({ id: null, nome: 'Todos' });
        this.carregandoEstoquistas = false;
      },
    });
  }

  public listarProdutos(): void {
    this.produtos = [];
    this.carregandoProdutos = true;
    this.service.listarProdutosFiltro().subscribe({
      next: (response) => {
        this.produtos = response;
        this.produtos.unshift({ id: null, nome: 'Todos' });
        this.carregandoProdutos = false;
      },
    });
  }

  public filtrarMovimentacoes(): void {
    let movimentacoes = this.movimentacoes;

    if (this.filtros.tipoMovimentacao !== '') {
      movimentacoes = movimentacoes.filter(
        (movimentacao) =>
          movimentacao.tipoMovimentacao === this.filtros.tipoMovimentacao,
      );
    }

    if (this.filtros.lancadoPor !== null) {
      movimentacoes = movimentacoes.filter(
        (movimentacao) =>
          movimentacao.lancadoPor.id === this.filtros.lancadoPor,
      );
    }

    if (this.filtros.produto !== null) {
      movimentacoes = movimentacoes.filter(
        (movimentacao) => movimentacao.produto.id === this.filtros.produto,
      );
    }

    this.movimentacoesFiltradas = movimentacoes;
  }

  public limparFiltros(): void {
    this.filtros = {
      tipoMovimentacao: '',
      lancadoPor: null,
      produto: null,
    };
    this.movimentacoesFiltradas = this.movimentacoes;
  }

  public gerarRelatorio(): void {
    this.service.gerarRelatorioMovimentacoes(this.filtros).subscribe({
      next: (res: Blob) => {
        const file = new Blob([res], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      },
    });
  }
}
