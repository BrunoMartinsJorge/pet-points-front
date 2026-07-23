import type { EspecializacaoDto } from "./EspecializacaoDto";

export interface VeterinarioEspecializacoesDto {
  id: number;
  nome: string;
  especializacoes: EspecializacaoDto[];
}
