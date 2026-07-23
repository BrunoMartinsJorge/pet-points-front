import type { StatusConsultaEnum } from "../../../../../shared/models/enums/StatusConsultaEnum";

export interface ConsultasVeterinarioDashboardDto {
  id: number;
  tipo: string;
  data: Date;
  cliente: string;
  pet: string;
  status: StatusConsultaEnum;
  observacoes: string;
};
