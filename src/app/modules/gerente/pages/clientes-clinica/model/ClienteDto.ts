import type { GeneroEnum } from "../../../../../shared/models/enums/GeneroEnum";

export interface ClienteDto {
  id: number;
  nome: string;
  telefone: string;
  genero: GeneroEnum;
  registradoEm: string;
}
