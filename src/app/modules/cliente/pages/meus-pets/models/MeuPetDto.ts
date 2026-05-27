import type { GeneroEnum } from "../../../../../shared/models/enums/GeneroEnum";
import type { StatusPerfilEnum } from "../../../../../shared/models/enums/StatusPerfilEnum";

export interface MeuPetDto {
  id: number;
  nome: string;
  tipo: string;
  raca: string;
  genero: GeneroEnum;
  dataNascimento: Date;
  observacoes: string;
  imagem: string;
  status: StatusPerfilEnum;
}
