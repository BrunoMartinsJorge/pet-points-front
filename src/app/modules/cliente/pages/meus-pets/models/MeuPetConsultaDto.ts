import type { StatusConsultaEnum } from "../../../../../shared/models/enums/StatusConsultaEnum";

export interface MeuPetConsultaDto {
  id: number;
  status: StatusConsultaEnum;
  pet: string;
  tipoConsulta: string;
  solicitadoEm: string;
  dataConsulta: string;
  imagem: string;
  idPet: number;
}
