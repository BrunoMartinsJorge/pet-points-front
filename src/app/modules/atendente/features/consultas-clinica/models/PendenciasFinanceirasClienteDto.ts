import type { StatusPagamentoEnum } from '../../../../../shared/models/enums/StatusPagamentoEnum';
import type { TipoPagamentoEnum } from '../../../../../shared/models/enums/TipoPagamentoEnum';

/** Uma cobrança em aberto do cliente, com o contexto da consulta que a gerou. */
export interface PendenciaPagamentoClienteDto {
  idPagamento: number;
  idConsulta: number;
  valor: number;
  forma: TipoPagamentoEnum;
  status: StatusPagamentoEnum;
  dataLimite: string | null;
  emitidoEm: string | null;
  pet: string | null;
  imagemPet: string | null;
  tipoConsulta: string | null;
  dataConsulta: string | null;
  atrasado: boolean;
  diasEmAtraso: number;
}

/** Situação financeira do cliente exibida antes de aprovar uma solicitação. */
export interface PendenciasFinanceirasClienteDto {
  idCliente: number;
  cliente: string;
  email: string;
  quantidadePendentes: number;
  quantidadeAtrasadas: number;
  valorTotalPendente: number;
  valorTotalAtrasado: number;
  pendencias: PendenciaPagamentoClienteDto[];
}
