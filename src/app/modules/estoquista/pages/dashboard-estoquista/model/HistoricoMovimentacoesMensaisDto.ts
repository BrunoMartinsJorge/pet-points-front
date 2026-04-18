import type { TipoMovimentacaoEnum } from "../../../../../shared/models/enums/TipoMovimentacaoEnum";

export interface HistoricoMovimentacoesMensaisDto {
    tipoMovimentacao: TipoMovimentacaoEnum;
    dataHora: Date;
}