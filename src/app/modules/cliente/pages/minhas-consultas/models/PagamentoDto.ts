import type { StatusPagamentoEnum } from "../../../../../shared/models/enums/StatusPagamentoEnum";
import type { TipoPagamentoEnum } from "../../../../../shared/models/enums/TipoPagamentoEnum";

export interface PagamentoDto {
  id: number;
  forma: TipoPagamentoEnum;
  valor: number;
  dataLimite: string;
  status: StatusPagamentoEnum;
  motivoIndeferimento: string;
  dataPagamento: string;
  atrasado: boolean;
  comprovante: string;
  tipoArquivo: string;
}
