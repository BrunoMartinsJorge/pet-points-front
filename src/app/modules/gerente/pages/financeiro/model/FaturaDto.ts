import type { StatusPagamentoEnum } from "../../../../../shared/models/enums/StatusPagamentoEnum";
import type { TipoPagamentoEnum } from "../../../../../shared/models/enums/TipoPagamentoEnum";

export interface FaturaDto {
  id: number;
  numero: string;
  clienteId: number | null;
  clienteNome: string;
  valor: number;
  status: StatusPagamentoEnum;
  data: string;
  tipoPagamento: TipoPagamentoEnum;
}
