import type { StatusAtendimentoEnum } from '../../../../../../shared/models/enums/StatusAtendimentoEnum';

export interface ChatAtendimentoDto {
  id: number;
  chatId: number;
  mensagem: string;
  solicitadoEm: Date;
  status: StatusAtendimentoEnum;
  atendente: string;
}
