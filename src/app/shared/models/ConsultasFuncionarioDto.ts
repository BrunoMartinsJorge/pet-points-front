import type { StatusConsultaEnum } from "./enums/StatusConsultaEnum";

export interface ConsultasFuncionarioDto {
    id: number,
    tipo: string;
    status: StatusConsultaEnum;
    observacoes: string;
    dataConsulta: string;
}