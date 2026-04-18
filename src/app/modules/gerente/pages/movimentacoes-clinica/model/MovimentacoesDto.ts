import type { TipoMovimentacaoEnum } from '../../../../../shared/models/enums/TipoMovimentacaoEnum';
import type { ProdutoFiltroDto } from '../../../../../shared/models/ProdutoFiltroDto';
import type { LancadoPorDto } from './LancadoPorDto';

export interface MovimentacoesDto {
  id: number;
  dataHora: Date;
  produto: ProdutoFiltroDto;
  tipoMovimentacao: TipoMovimentacaoEnum;
  lancadoPor: LancadoPorDto;
  quantidadeMovimentada: number;
}
