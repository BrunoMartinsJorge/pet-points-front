import type { AvaliacaoDto } from '../../../models/AvaliacaoDto';

export interface RankingFuncionarioDto {
  classificacao: number;
  pontuacao: number;
  melhorAvaliacao: AvaliacaoDto;
  piorAvaliacao: AvaliacaoDto;
}
