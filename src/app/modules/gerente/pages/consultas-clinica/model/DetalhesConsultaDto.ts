import type { StatusConsultaEnum } from '../../../../../shared/models/enums/StatusConsultaEnum';
import type { ParticipantesConsultaDto } from './ParticipantesConsultaDto';

export interface DetalhesConsultaDto {
  id: number;
  tipo: string;
  observacoes: string;
  cliente: ParticipantesConsultaDto;
  veterinario: ParticipantesConsultaDto;
  atendente: ParticipantesConsultaDto;
  pet: string;
  status: StatusConsultaEnum;
  motivoIndeferimento: string;
  motivoCancelamento: string;
  dataSolicitacao: Date;
  dataConsulta: Date;
  dataAtendimento: Date;
  dataCancelamento: Date;
  dataFinalizado: Date;
  dataIniciado: Date;
}
