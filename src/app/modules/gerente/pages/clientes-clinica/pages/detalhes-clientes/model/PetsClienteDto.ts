import type { GeneroEnum } from "../../../../../../../shared/models/enums/GeneroEnum";
import type { TipoAnimalEnum } from "../../../../../../../shared/models/enums/TipoAnimalEnum";

export interface PetsClienteDto {
  id: number;
  nome: string;
  tipo: TipoAnimalEnum;
  genero: GeneroEnum;
  dataNascimento: Date;
  registradoEm: Date;
}
