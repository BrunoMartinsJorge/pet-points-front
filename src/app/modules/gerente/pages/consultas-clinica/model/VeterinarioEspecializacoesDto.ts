export interface VeterinarioEspecializacoesDto {
  id: number;
  nome: string;
  especializacoes: {
    id: number;
    descricao: string;
  }[];
}
