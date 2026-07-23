import type { GeneroEnum } from "../../../../../models/enums/GeneroEnum";

export interface ClientesDetalhesDto {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: Date;
  dataCadastro: Date;
  genero: GeneroEnum;
}
