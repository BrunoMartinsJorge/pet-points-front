import type { StatusConsultaEnum } from '../../../../../shared/models/enums/StatusConsultaEnum';

export interface ConsultasDashboardDto {
  id: number;
  dataConsulta: string;
  status: StatusConsultaEnum;
  tipoConsulta: string;
  veterinario: string;
  pet: string;
  dataSolicitacao: string;
}
