import type { StatusConsultaEnum } from '../../../models/enums/StatusConsultaEnum';

export interface ConsultasAtendenteVeterinarioDto {
  id: number;
  cliente: string;
  pet: string;
  status: StatusConsultaEnum;
  dataHoraConsulta: string;
  observacoes: Date;
  tipoConsulta: string;
  motivoCancelamento: string;
  motivoIndeferimento: string;
}
