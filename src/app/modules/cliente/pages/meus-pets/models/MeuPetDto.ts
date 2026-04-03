import type { GeneroEnum } from "../../../../../shared/models/enums/GeneroEnum";

export interface MeuPetDto {
  id: number;
  nome: string;
  tipo: string;
  raca: string;
  genero: GeneroEnum;
  dataNascimento: Date;
  observacoes: string;
}
