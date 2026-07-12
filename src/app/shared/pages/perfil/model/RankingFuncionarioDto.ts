import type { AvaliacaoConsultaDto } from '../../../../modules/atendente/features/consultas-clinica/models/AvaliacaoConsultaDto';

export interface RankingFuncionarioDto {
  classificacao: number;
  pontuacao: number;
  melhorAvaliacao: AvaliacaoConsultaDto;
  piorAvaliacao: AvaliacaoConsultaDto;
}
