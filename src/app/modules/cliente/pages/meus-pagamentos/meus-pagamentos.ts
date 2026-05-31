import { Component, inject } from '@angular/core';
import type { OnInit } from '@angular/core';
import { MeusPagamentosService } from './service/meus-pagamentos-service';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import type { PagamentosDto } from './models/PagamentosDto';
import type { CardsPagamentoDto } from './models/CardsPagamentoDto';
import { TipoPagamentoEnum } from '../../../../shared/models/enums/TipoPagamentoEnum';
import { DetalhesPagamento } from "./components/detalhes-pagamento/detalhes-pagamento";

@Component({
  selector: 'app-meus-pagamentos',
  imports: [PrimeNGModule, DetalhesPagamento],
  templateUrl: './meus-pagamentos.html',
  styleUrl: './meus-pagamentos.scss',
})
export class MeusPagamentos implements OnInit {
  // Variavel responsável por conter o acesso ao service do componente em questão com acesso as requests de endpoint
  private readonly service = inject(MeusPagamentosService);

  // Variavel responsável por armazenar as informacoes dos cards
  public informacoesCards: CardsPagamentoDto = {
    pagamentosEfetuados: 0,
    pagamentosAtrasados: 0,
    pagamentosReprovados: 0,
  };
  // Variavel responsável por delimitar o carregamento dos cards
  public carregandoInformacoesCards = false;

  // Variaveis responsaveis por armazenar os pagamentos
  public pagamentosPendentesAtrasados: PagamentosDto[] = [];
  // Variavel responsável por delimitar o carregamento dos pagamentos pendentes ou atrasados
  public carregandoPagamentosPendentesAtrasados = false;

  // Variaveis responsaveis por armazenar os pagamentos
  public pagamentosReprovados: PagamentosDto[] = [];
  // Variavel responsável por delimitar o carregamento dos pagamentos reprovados
  public carregandoPagamentosReprovados = false;

  // Variaveis responsaveis por armazenar os pagamentos
  public historicoPagamentos: PagamentosDto[] = [];
  // Variavel responsável por delimitar o carregamento dos pagamentos com status finalizado ou enviado
  public carregandoHistoricoPagamentos = false;

  // Variavel responsável por armazenar o pagamento selecionado
  public pagamentoSelecionado: PagamentosDto | null = null;
  // Variavel responsável por deteriminar a visibilidade do dialog que mostra as informações do pagamento selecionado
  public visibilidadeDialogDetalhesPagamento = false;

  ngOnInit(): void {
    this.buscarInformacoesCards();
    this.listarPagamentosPendentesAtrasados();
    this.listarPagamentosReprovados();
    this.listarHistoricoPagamentos();
  }

  /**
   * 
   * @description Metodo responsável por carregar alterações feitas no componente de a detalhes-pagamento
   */
  public carregarAlteracoes(): void {
    this.buscarInformacoesCards();
    this.listarPagamentosPendentesAtrasados();
    this.listarPagamentosReprovados();
    this.listarHistoricoPagamentos();
  }

  /**
   * 
   * @description Metodo responsável por buscar as informacoes dos cards iniciais de pagamento
   */
  private buscarInformacoesCards(): void {
    this.informacoesCards = {
      pagamentosEfetuados: 0,
      pagamentosAtrasados: 0,
      pagamentosReprovados: 0,
    };
    this.carregandoInformacoesCards = true;
    this.service.buscarInformacoesCards().subscribe({
      next: (response: CardsPagamentoDto) => {
        this.informacoesCards = response;
        this.carregandoInformacoesCards = false;
      },
      error: () => (this.carregandoInformacoesCards = false),
    });
  }

  /**
   * 
   * @description Metodo responsável por listar os pagamentos com status pendentes ou que estejam atrasados
   */
  private listarPagamentosPendentesAtrasados(): void {
    this.pagamentosPendentesAtrasados = [];
    this.carregandoPagamentosPendentesAtrasados = true;
    this.service.listarPagamentosPendentesAtrasados().subscribe({
      next: (response: PagamentosDto[]) => {
        this.pagamentosPendentesAtrasados = response;
        this.carregandoPagamentosPendentesAtrasados = false;
      },
      error: () => (this.carregandoPagamentosPendentesAtrasados = false),
    });
  }

  /**
   * 
   * @description Metodo responsável por listar os pagamentos reprovados
   */
  private listarPagamentosReprovados(): void {
    this.pagamentosPendentesAtrasados = [];
    this.carregandoPagamentosReprovados = true;
    this.service.listarPagamentosReprovados().subscribe({
      next: (response: PagamentosDto[]) => {
        this.pagamentosReprovados = response;
        this.carregandoPagamentosReprovados = false;
      },
      error: () => (this.carregandoPagamentosReprovados = false),
    });
  }

  /**
   * 
   * @description Metodo responsável por listar os pagamentos com status finalizado ou enviado
   */
  private listarHistoricoPagamentos(): void {
    this.pagamentosPendentesAtrasados = [];
    this.carregandoHistoricoPagamentos = true;
    this.service.listarHistoricoPagamentos().subscribe({
      next: (response: PagamentosDto[]) => {
        this.historicoPagamentos = response;
        this.carregandoHistoricoPagamentos = false;
      },
      error: () => (this.carregandoHistoricoPagamentos = false),
    });
  }

  /**
   * 
   * @param tipoPagamento {TipoPagamentoEnum} tipoPagamento - Tipo ou forma de pagamento escolhida
   * @description Metodo responsável por retornar o icone referente ao tipo de pagamento
   * @returns {string} iconePagamento - icone referente ao tipo de pagamento
   */
  public iconePagamento(tipoPagamento: TipoPagamentoEnum): string {
    if (tipoPagamento === TipoPagamentoEnum.PIX)
      return 'fa fas fas fas fa-qrcode';
    else if (tipoPagamento === TipoPagamentoEnum.DINHEIRO)
      return 'fa fas fa-money-bill';
    else return 'fa fas fas fa-money-check';
  }

  /**
   * 
   * @param pagamento {PagamentosDto} pagamento - Pagamento selecionado
   * @description Metodo responsável por selecionar um pagamento
   */
  public selecionarPagamento(pagamento: PagamentosDto): void {
    this.pagamentoSelecionado = pagamento;
    this.visibilidadeDialogDetalhesPagamento = true;
  }
}
