import type { TipoMovimentacaoEnum } from '../../../../../shared/models/enums/TipoMovimentacaoEnum';

export interface MovimentacoesEstoquistaDto {
  id: number;
  dataMovimentacao: string;
  produto: string;
  tipo: TipoMovimentacaoEnum;
  quantidade: number;
}
