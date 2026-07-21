import type { StatusConsultaEnum } from "../../../../../models/enums/StatusConsultaEnum";

export interface HistoricoConsultasClienteDto {
  id: number;
  tipoConsulta: string;
  status: StatusConsultaEnum;
  deferidoEm: Date;
  solicitadoEm: Date;
  dataHoraConsulta: Date;
  descricao: string;
  veterinario: string;
  motivoIndeferimento: string;
  motivoCancelamento: string;
}
