import type { ParticipantesConsultaDto } from './ParticipantesConsultaDto';

export interface DetalhesEspecializacaoDto {
  id: number;
  nome: string;
  veterinarios: ParticipantesConsultaDto[];
  veterinariosNaoRelacionados: ParticipantesConsultaDto[];
}
