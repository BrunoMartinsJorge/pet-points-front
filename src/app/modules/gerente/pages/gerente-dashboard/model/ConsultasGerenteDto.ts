import type { TipoMovimentacaoEnum } from "../../../../../shared/models/enums/TipoMovimentacaoEnum";

export interface ConsultasGerenteDto {
  tipo: TipoMovimentacaoEnum;
  descricao: string;
  dataSolicitacao: Date;
}
