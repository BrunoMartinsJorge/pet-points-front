import type { GeneroEnum } from '../../../../../shared/models/enums/GeneroEnum';
import type { TipoAnimalEnum } from '../../../../../shared/models/enums/TipoAnimalEnum';

export interface InformacoesPetVeterinarioDto {
  nome: string;
  genero: GeneroEnum;
  tipo: TipoAnimalEnum;
  raca: string;
  idade: string;
  nomeTutor: string;
}
