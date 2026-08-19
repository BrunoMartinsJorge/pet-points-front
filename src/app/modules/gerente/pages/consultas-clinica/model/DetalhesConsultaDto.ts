import type { StatusConsultaEnum } from '../../../../../shared/models/enums/StatusConsultaEnum';
import type { ParticipantesConsultaDto } from './ParticipantesConsultaDto';

export interface DetalhesConsultaDto {
  id: number;
  tipo: string;
  observacoes: string | null;
  cliente: ParticipantesConsultaDto;
  veterinario: ParticipantesConsultaDto | null;
  atendente: ParticipantesConsultaDto | null;
  pet: string;
  status: StatusConsultaEnum;
  motivoIndeferimento: string | null;
  motivoCancelamento: string | null;
  dataSolicitacao: Date;
  dataConsulta: Date;
  dataAtendimento: Date | null;
  dataCancelamento: Date | null;
  dataFinalizado: Date | null;
  dataIniciado: Date | null;
}
