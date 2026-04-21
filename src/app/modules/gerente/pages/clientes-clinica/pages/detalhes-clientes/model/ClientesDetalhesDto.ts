import type { GeneroEnum } from "../../../../../../../shared/models/enums/GeneroEnum";

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
