import type { StatusConsultaEnum } from '../../../../../shared/models/enums/StatusConsultaEnum';

export interface ConsultasAtendenteDto {
  id: number;
  iniciadoEm: Date;
  finalizadoEm: Date;
  status: StatusConsultaEnum;
  solicitante: string;
  atendente: string;
  veterinario: string;
  pet: string;
  tipoConsulta: string;
  solicitadoEm: Date;
  deferidoEm: Date;
  motivoIndeferimento: string;
  dataConsulta: Date;
  resumoConsulta: string;
  canceladoEm: Date;
  motivoCancelamento: string;
  observacoes: string;
}
