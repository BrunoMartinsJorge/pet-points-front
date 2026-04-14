import type { TipoMovimentacaoEnum } from "../../../../../shared/models/enums/TipoMovimentacaoEnum";

export interface HistoricoMovimentacoesDto {
    id: number;
    tipoMovimentacao: TipoMovimentacaoEnum;
    produto: string;
    dataHoraMovimentacao: Date;
    quantidadeMovimentada: number;
}