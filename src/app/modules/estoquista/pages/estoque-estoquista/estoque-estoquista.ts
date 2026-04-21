import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { EstoqueEstoquistaService } from './service/estoque-estoquista-service';
import type { CardsEstoqueDto } from './model/CardsEstoqueDto';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TipoProdutoOpcoes } from '../../../../shared/models/enums/TipoProdutoEnum';
import type { OptionSelect } from '../../../../shared/models/OptionSelect';
import type { ProdutoEstoqueDto } from '../../../../shared/models/ProdutoEstoqueDto';
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

  /**
   * 
   * @description Busca as informações para os cards do estoque, como valor total, quantidade de produtos e produtos abaixo do estoque.
   */
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

  /**
   * 
   * @description Filtra os produtos em estoque com base nos filtros definidos no formulário de filtros, como nome, tipo, preço mínimo e preço máximo, e se deve mostrar todos os produtos ou apenas os que estão abaixo do estoque mínimo.
   */
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

  /**
   * 
   * @description Verifica se existem filtros ativos no formulário de filtros, ou seja, se algum dos campos de filtro foi preenchido ou se a opção de mostrar todos os produtos está desmarcada.
   * @returns {boolean} - Retorna true se existirem filtros ativos, ou seja, se algum dos campos de filtro foi preenchido ou se a opção de mostrar todos os produtos está desmarcada, e false caso contrário.
   */
  public get possuiFiltrosAtivos(): boolean {
    return (
      this.filtros.nome.trim() !== '' ||
      this.filtros.todosOsProdutos ||
      this.filtros.tipoProduto !== '' ||
      this.filtros.precoMin !== null ||
      this.filtros.precoMax !== null
    );
  }

  /**
   * 
   * @description Lista os produtos em estoque, com suas informações como id, nome, tipo, descrição, valor unitário, quantidade em estoque e se está abaixo do estoque mínimo.
   */
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

  /**
   * 
   * @description Limpa os filtros do formulário de filtros.
   */
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

  /**
   * 
   * @description Navega para a página de detalhes do produto, passando o id do produto como parâmetro na rota.
   */
  public verDetalhesProduto(idProduto: number): void {
    this.route.navigate(['/estoquista/detalhes-produto', idProduto]);
  }

  /**
   * 
   * @description Gera um relatório em PDF dos produtos em estoque, com base nos filtros definidos no formulário de filtros, e o abre em uma nova janela do navegador.
   */
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
