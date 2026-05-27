import type { GeneroEnum } from "../../../../../../../shared/models/enums/GeneroEnum";
import type { StatusPerfilEnum } from "../../../../../../../shared/models/enums/StatusPerfilEnum";
import type { TipoAnimalEnum } from "../../../../../../../shared/models/enums/TipoAnimalEnum";

export interface PetDetalhesDto {
  nome: string;
  raca: string;
  dataNascimento: string;
  dataRegistro: string;
  tipo: TipoAnimalEnum;
  genero: GeneroEnum;
  observacoes: string;
  imagem: string;
  petsRelacionados: PetSemelhantesDto[];
  status: StatusPerfilEnum;
}

export interface PetSemelhantesDto {
  id: number;
  nome: TipoAnimalEnum;
  genero: GeneroEnum;
  tipo: string;
  arquivo: string;
}
