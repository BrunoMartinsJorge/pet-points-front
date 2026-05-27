import type { StatusPagamentoEnum } from '../../../../../shared/models/enums/StatusPagamentoEnum';
import type { TipoPagamentoEnum } from '../../../../../shared/models/enums/TipoPagamentoEnum';

export interface PagamentosPendentesDto {
  id: number;
  dataLimitePagamento: string;
  tipoPagamento: TipoPagamentoEnum;
  valor: number;
  statusPagamento: StatusPagamentoEnum;
  atrasado: boolean;
}
