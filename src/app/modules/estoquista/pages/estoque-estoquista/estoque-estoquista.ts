import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { EstoqueEstoquistaService } from './service/estoque-estoquista-service';
import type { CardsEstoqueDto } from './model/CardsEstoqueDto';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TipoProdutoOpcoes } from '../../../../shared/models/enums/TipoProdutoEnum';
import type { OptionSelect } from '../../../../shared/models/OptionSelect';
import type { ProdutoEstoqueDto } from './model/ProdutoEstoqueDto';
import type { FiltrosProdutosForm } from './forms/FiltrosProdutosForm';
import { Router } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-estoque-estoquista',
  imports: [PrimeNGModule, ToggleButtonModule, SkeletonModule],
  templateUrl: './estoque-estoquista.html',
  styleUrl: './estoque-estoquista.scss',
})
export class EstoqueEstoquista implements OnInit {
  private readonly service = inject(EstoqueEstoquistaService);
  private readonly route = inject(Router);

  public readonly opcoesTipoProduto: OptionSelect[] = TipoProdutoOpcoes;

  public carregandoCards = true;
  public carregandoProdutos = false;
  public carregandoRelatorio = false;

  public cards: CardsEstoqueDto | null = null;
  private produtos: ProdutoEstoqueDto[] = [];
  public produtosFiltrados: ProdutoEstoqueDto[] = [];
  public filtros: FiltrosProdutosForm = {
    nome: '',
    todosOsProdutos: true,
    tipoProduto: '',
    precoMin: null,
    precoMax: null,
  };

  ngOnInit(): void {
    this.buscarInformacoesCards();
    this.listarProdutosEstoque();
    this.opcoesTipoProduto.push({ label: 'Todos os Tipos', value: '' });
  }

  private buscarInformacoesCards(): void {
    this.carregandoCards = true;
    this.service.buscarInformacoesCards().subscribe({
      next: (cards) => {
        this.cards = cards;
      },
      complete: () => {
        this.carregandoCards = false;
      }
    });
  }

  public filtrarProdutos(): void {
    let produtos = this.produtos;
    if (!this.filtros.todosOsProdutos)
      produtos = produtos.filter((p) => p.quantidadeAbaixoEstoque);
    if (this.filtros.nome.trim() !== '')
      produtos = produtos.filter((p) =>
        p.nome.toLowerCase().includes(this.filtros.nome.toLowerCase()),
      );
    if (this.filtros.precoMin !== null) {
      produtos = produtos.filter(
        (p) => p.valorUnitario >= this.filtros.precoMin!,
      );
    }
    if (this.filtros.precoMax !== null) {
      produtos = produtos.filter(
        (p) => p.valorUnitario <= this.filtros.precoMax!,
      );
    }
    if (this.filtros.tipoProduto !== '')
      produtos = produtos.filter((p) => p.tipo === this.filtros.tipoProduto);
    this.produtosFiltrados = produtos;
  }

  public get possuiFiltrosAtivos(): boolean {
    return (
      this.filtros.nome.trim() !== '' ||
      this.filtros.todosOsProdutos ||
      this.filtros.tipoProduto !== '' ||
      this.filtros.precoMin !== null ||
      this.filtros.precoMax !== null
    );
  }

  private listarProdutosEstoque(): void {
    this.carregandoProdutos = true;
    this.produtos = [];
    this.service.listarProdutosEstoque().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.produtosFiltrados = produtos;
        this.carregandoProdutos = false;
      },
      error: () => {
        this.carregandoProdutos = false;
      },
    });
  }

  public limparFiltros(): void {
    this.filtros = {
      nome: '',
      todosOsProdutos: true,
      tipoProduto: '',
      precoMin: null,
      precoMax: null,
    };
    this.filtrarProdutos();
  }

  public verDetalhesProduto(idProduto: number): void {
    this.route.navigate(['/estoquista/detalhes-produto', idProduto]);
  }

  public gerarRelatorio(): void {
    this.carregandoRelatorio = true;
    this.service.gerarRelatorioProdutos(this.filtros).subscribe({
      next: (res: Blob) => {
        const file = new Blob([res], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      },
      complete: () => {
        this.carregandoRelatorio = false;
      }
    });
  }
}
