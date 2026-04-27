import type { GeneroEnum } from '../../../../../shared/models/enums/GeneroEnum';
import type { TipoAnimalEnum } from '../../../../../shared/models/enums/TipoAnimalEnum';

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
