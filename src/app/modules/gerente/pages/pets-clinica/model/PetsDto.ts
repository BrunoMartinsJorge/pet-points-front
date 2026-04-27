import type { GeneroEnum } from '../../../../../shared/models/enums/GeneroEnum';
import type { TipoAnimalEnum } from '../../../../../shared/models/enums/TipoAnimalEnum';

export interface PetsDto {
  id: number;
  nome: string;
  tipo: TipoAnimalEnum;
  genero: GeneroEnum;
  registradoEm: Date;
  tutor: {
    id: number;
    nome: string;
  };
}
