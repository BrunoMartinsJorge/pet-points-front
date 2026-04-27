import type { StatusConsultaEnum } from "../../../../../shared/models/enums/StatusConsultaEnum";

export interface HistoricoConsultasPetDto {
    id: number;
    tipoConsulta: string;
    status: StatusConsultaEnum;
    dataHoraConsulta: Date;
    veterinario: string;
}