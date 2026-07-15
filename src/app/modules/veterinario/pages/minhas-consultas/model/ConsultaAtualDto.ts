import type { StatusConsultaEnum } from '../../../../../shared/models/enums/StatusConsultaEnum';
import type { InformacoesPetVeterinarioDto } from './InformacoesPetVeterinarioDto';

export interface ConsultaAtualDto {
  id: number;
  status: StatusConsultaEnum;
  pet: InformacoesPetVeterinarioDto;
  data: Date;
  imagemCliente: string | null;
  tipo: string;
  observacoes: string;
  iniciadoEm: Date;
  finalizadoEm: Date | null;
}
