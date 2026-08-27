import type { StatusPagamentoEnum } from '../../../../../shared/models/enums/StatusPagamentoEnum';
import type { TipoPagamentoEnum } from '../../../../../shared/models/enums/TipoPagamentoEnum';

/**
 * Resumo somente leitura da cobrança da consulta. A avaliação do pagamento
 * (baixa e indeferimento) é feita na tela de Pagamentos da Clínica.
 */
export interface InformacoesPagamentoDto {
  id: number;
  valor: number;
  dataLimite: string | null;
  emitidoEm: string | null;
  pagoEm: string | null;
  formaPagamento: TipoPagamentoEnum;
  motivoIndeferimento: string | null;
  avaliadoPor: string | null;
  status: StatusPagamentoEnum;
}
