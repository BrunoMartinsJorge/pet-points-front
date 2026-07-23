import type { TipoLogEnum } from "./TipoLogEnum";

export interface LogDto {
  mensagem: string;
  tipo: TipoLogEnum;
  lancadoPor: string;
  registradoEm: string;
  lancadoPorId: number;
}
