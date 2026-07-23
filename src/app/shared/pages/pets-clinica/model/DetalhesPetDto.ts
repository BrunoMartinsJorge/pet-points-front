import type { GeneroEnum } from '../../../models/enums/GeneroEnum';
import type { TipoAnimalEnum } from '../../../models/enums/TipoAnimalEnum';

export interface DetalhesPetDto {
  id: number;
  nome: string;
  genero: GeneroEnum;
  tipo: TipoAnimalEnum;
  dataNascimento: Date;
  registradoEm: Date;
  raca: string;
  observacoes: string;
}
