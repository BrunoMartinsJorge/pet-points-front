import type { StatusConsultaEnum } from '../../../../../shared/models/enums/StatusConsultaEnum';

export interface ConsultasPendentesIniciadasDto {
  id: number;
  dataConsulta: string;
  status: StatusConsultaEnum;
  tipoConsulta: string;
}
