import type { TipoMovimentacaoEnum } from "../../../../../shared/models/enums/TipoMovimentacaoEnum";

export interface MovimentacoesGerenteDto {
  produto: string;
  quantidade: number;
  estoquista: string;
  tipo: TipoMovimentacaoEnum;
}
