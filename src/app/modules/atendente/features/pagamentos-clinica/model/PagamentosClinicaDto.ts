import type { StatusPagamentoEnum } from "../../../../../shared/models/enums/StatusPagamentoEnum";
import type { TipoPagamentoEnum } from "../../../../../shared/models/enums/TipoPagamentoEnum";

export interface PagamentosClinicaDto {
  id: number;
  valor: number;
  forma: TipoPagamentoEnum;
  dataPagamento: Date;
  cliente: string;
  atendente: string;
  status: StatusPagamentoEnum;
  motivoIndeferimento: string;
}
