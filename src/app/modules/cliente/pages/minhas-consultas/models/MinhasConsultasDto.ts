import type { StatusConsultaEnum } from "../../../../../shared/models/enums/StatusConsultaEnum";

export interface MinhasConsultasDto {
  id: number;
  petConsulta: string;
  veterinarioConsulta: string;
  dataHoraConsulta: string;
  statusConsulta: StatusConsultaEnum;
  tipoConsulta: string;
}
