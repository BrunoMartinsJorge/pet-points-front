export interface DetalhesTipoConsultaDto {
  id: number;
  nome: string;
  descricao: string;
  valor: number;
  veterinario: {
    id: number;
    nome: string;
    especializacao: string;
  }[];
}
