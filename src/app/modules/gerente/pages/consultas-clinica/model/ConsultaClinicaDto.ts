import type { StatusConsultaEnum } from '../../../../../shared/models/enums/StatusConsultaEnum';
import type { ParticipantesConsultaDto } from './ParticipantesConsultaDto';

export interface ConsultaClinicaDto {
  id: number;
  tipo: {
    id: number;
    nome: string;
  };
  status: StatusConsultaEnum;
  solicitadoEm: Date;
  observacoes: string;
  cliente: ParticipantesConsultaDto;
  veterinario: ParticipantesConsultaDto;
}
