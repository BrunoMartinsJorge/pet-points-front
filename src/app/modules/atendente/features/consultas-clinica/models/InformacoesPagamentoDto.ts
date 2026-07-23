import type { StatusPagamentoEnum } from '../../../../../shared/models/enums/StatusPagamentoEnum';
import type { TipoPagamentoEnum } from '../../../../../shared/models/enums/TipoPagamentoEnum';

export interface InformacoesPagamentoDto {
  id: number;
  valor: number;
  dataLimite: string;
  enviadoEm: string;
  comprovante: string;
  formaPagamento: TipoPagamentoEnum;
  motivoIndeferimento: string;
  status: StatusPagamentoEnum;
}
