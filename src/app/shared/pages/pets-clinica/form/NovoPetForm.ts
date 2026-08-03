import type { GeneroEnum } from '../../../models/enums/GeneroEnum';
import type { TipoAnimalEnum } from '../../../models/enums/TipoAnimalEnum';

export interface NovoPetForm {
  nome: string;
  tipo: TipoAnimalEnum;
  genero: GeneroEnum;
  dataNascimento: Date;
  idTutor: number;
  raca: string;
  observacoes: string;
}
