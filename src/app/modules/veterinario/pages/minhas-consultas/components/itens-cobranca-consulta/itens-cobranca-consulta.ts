import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import type { OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import type { ProdutoCobrancaDto } from '../../model/ProdutoCobrancaDto';
import type { ItemCobrancaForm } from '../../form/FinalizarConsultaForm';
import { MinhasConsultasService } from '../../service/minhas-consultas-service';

interface ItemCobrancaSelecionado {
  idProduto: number;
  nome: string;
  quantidade: number;
  valorUnitario: number;
}

/**
 * Lançamento dos produtos consumidos na consulta (vacinas, medicamentos, etc.).
 * Utilizado nos dois pontos em que o veterinário finaliza uma consulta: no card
 * da consulta atual e na tela de detalhes da consulta.
 */
@Component({
  selector: 'app-itens-cobranca-consulta',
  imports: [PrimeNGModule],
  templateUrl: './itens-cobranca-consulta.html',
  styleUrl: './itens-cobranca-consulta.scss',
})
export class ItensCobrancaConsulta implements OnInit {
  /** Valor do tipo de consulta, exibido no resumo dos totais. */
  @Input() public valorConsulta: number | null = null;
  @Output() public itensAlterados = new EventEmitter<ItemCobrancaForm[]>();

  private readonly service = inject(MinhasConsultasService);
  private readonly toast = inject(MessageService);

  public produtos: ProdutoCobrancaDto[] = [];
  public itens: ItemCobrancaSelecionado[] = [];
  public produtoSelecionado: number | null = null;
  public quantidadeSelecionada = 1;

  public ngOnInit(): void {
    this.buscarProdutos();
  }

  private buscarProdutos(): void {
    this.produtos = [];
    this.service.buscarProdutosParaCobranca().subscribe({
      next: (response: ProdutoCobrancaDto[]) => {
        this.produtos = response;
      },
    });
  }

  public get produtosParaSelecao(): (ProdutoCobrancaDto & {
    rotulo: string;
  })[] {
    return this.produtos.map((produto) => ({
      ...produto,
      rotulo: `${produto.nome} (${produto.quantidadeEstoque} em estoque)`,
    }));
  }

  public adicionarItem(): void {
    const produto = this.produtos.find(
      (item) => item.id === this.produtoSelecionado,
    );
    if (!produto || this.quantidadeSelecionada < 1) return;

    const itemExistente = this.itens.find(
      (item) => item.idProduto === produto.id,
    );
    const quantidadeTotal =
      (itemExistente?.quantidade ?? 0) + this.quantidadeSelecionada;

    if (quantidadeTotal > produto.quantidadeEstoque) {
      this.toast.add({
        severity: 'warn',
        summary: 'Estoque insuficiente',
        detail: `${produto.nome} possui apenas ${produto.quantidadeEstoque} unidade(s) em estoque!`,
      });
      return;
    }

    if (itemExistente) {
      itemExistente.quantidade = quantidadeTotal;
    } else {
      this.itens.push({
        idProduto: produto.id,
        nome: produto.nome,
        quantidade: this.quantidadeSelecionada,
        valorUnitario: produto.valorUnitario,
      });
    }

    this.produtoSelecionado = null;
    this.quantidadeSelecionada = 1;
    this.emitirItens();
  }

  public removerItem(idProduto: number): void {
    this.itens = this.itens.filter((item) => item.idProduto !== idProduto);
    this.emitirItens();
  }

  private emitirItens(): void {
    this.itensAlterados.emit(
      this.itens.map((item) => ({
        idProduto: item.idProduto,
        quantidade: item.quantidade,
      })),
    );
  }

  public get valorItens(): number {
    return this.itens.reduce(
      (total, item) => total + item.valorUnitario * item.quantidade,
      0,
    );
  }

  public get valorTotal(): number {
    return (this.valorConsulta ?? 0) + this.valorItens;
  }
}
