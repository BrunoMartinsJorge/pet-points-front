import type { StatusConsultaEnum } from "../../../models/enums/StatusConsultaEnum";

export interface HistoricoConsultasPetDto {
    id: number;
    tipoConsulta: string;
    status: StatusConsultaEnum;
    dataHoraConsulta: Date;
    veterinario: string;
}