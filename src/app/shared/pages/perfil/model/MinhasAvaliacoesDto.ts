export interface MinhasAvaliacoesDto {
  id: number;
  mensagem: string;
  pontuacao: number;
  tipo: 'CONSULTA' | 'ATENDIMENTO';
  dataAvaliacao: Date;
}
