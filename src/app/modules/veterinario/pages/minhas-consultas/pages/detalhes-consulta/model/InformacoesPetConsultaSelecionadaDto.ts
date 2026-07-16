import type { GeneroEnum } from '../../../../../../../shared/models/enums/GeneroEnum';
import type { TipoAnimalEnum } from '../../../../../../../shared/models/enums/TipoAnimalEnum';

export interface InformacoesPetConsultaSelecionadaDto {
  id: number;
  imagem: string | null;
  nome: string;
  genero: GeneroEnum;
  tipo: TipoAnimalEnum;
  raca: string;
  dataNascimento: Date;
  registradoEm: Date;
  problemasSaude: string;
}
