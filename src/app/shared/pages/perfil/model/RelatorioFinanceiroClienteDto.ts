import type { PagamentosDto } from "../../../../modules/cliente/pages/meus-pagamentos/models/PagamentosDto";

export interface RelatorioFinanceiroClienteDto {
  pagamentosPendentes: number;
  saldoPendente: number;
  meusPagamentosAtrasadosPendentes: PagamentosDto[];
}
