import type { StatusConsultaEnum } from '../../../../../shared/models/enums/StatusConsultaEnum';

export interface ConsultaVeterinarioDto {
  id: number;
  status: StatusConsultaEnum;
  pet: string;
  cliente: string;
  data: Date;
  imagemCliente: string | null;
  tipo: string;
  observacoes: string;
}
