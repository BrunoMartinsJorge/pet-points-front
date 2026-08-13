import type { StatusPagamentoEnum } from '../../../../../shared/models/enums/StatusPagamentoEnum';
import type { TipoPagamentoEnum } from '../../../../../shared/models/enums/TipoPagamentoEnum';

export interface ResponsavelPagamentoDto {
  nome: string;
  email: string;
  cargo: string;
  data: string;
}

export interface TransacaoPagamentoDto {
  identificador: string;
  gateway: string;
  metodo: string | null;
  /** Só é preenchido após consultar o gateway pelo botão "Consultar status" */
  statusGateway: string | null;
  detalheStatus: string | null;
  valorTotal: string | null;
  valorPago: string | null;
  dataProcessamento: string | null;
  ultimaSincronizacao: string | null;
}

export interface EventoPagamentoDto {
  titulo: string;
  descricao: string;
  responsavel: string;
  data: string;
  status: StatusPagamentoEnum;
}

export interface DetalhesPagamentoClinicaDto {
  id: number;
  valor: number;
  forma: TipoPagamentoEnum;
  status: StatusPagamentoEnum;
  dataLimite: string | null;
  dataCriacao: string | null;
  dataPagamento: string | null;
  dataAtualizacao: string | null;
  motivoIndeferimento: string | null;
  emitidoPor: ResponsavelPagamentoDto | null;
  aprovadoPor: ResponsavelPagamentoDto | null;
  transacao: TransacaoPagamentoDto | null;
  historico: EventoPagamentoDto[];
}
