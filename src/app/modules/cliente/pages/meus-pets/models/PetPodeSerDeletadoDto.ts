import type { ConsultasPendentesIniciadasDto } from './ConsultasPendentesIniciadasDto';

export interface PetPodeSerDeletadoDto {
  possuiConsultasEmAndamento: boolean;
  consultas: ConsultasPendentesIniciadasDto[];
}
