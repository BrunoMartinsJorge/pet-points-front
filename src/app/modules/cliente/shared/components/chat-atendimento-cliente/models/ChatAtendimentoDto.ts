import type { StatusAtendimentoEnum } from '../../../../../../shared/models/enums/StatusAtendimentoEnum';

export interface ChatAtendimentoDto {
  id: number;
  mensagem: string;
  solicitadoEm: Date;
  status: StatusAtendimentoEnum;
  atendente: string;
}
