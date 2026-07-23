import type { GeneroEnum } from "../../../../../models/enums/GeneroEnum";
import type { TipoAnimalEnum } from "../../../../../models/enums/TipoAnimalEnum";

export interface PetsClienteDto {
  id: number;
  nome: string;
  tipo: TipoAnimalEnum;
  genero: GeneroEnum;
  dataNascimento: Date;
  registradoEm: Date;
}
