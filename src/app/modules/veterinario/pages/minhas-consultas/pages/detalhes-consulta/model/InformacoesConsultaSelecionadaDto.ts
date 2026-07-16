import type { StatusConsultaEnum } from '../../../../../../../shared/models/enums/StatusConsultaEnum';
import type { AvaliacaoConsultaDto } from '../../../../../../cliente/pages/minhas-consultas/models/AvaliacaoConsultaDto';
import type { InformacoesClienteConsultaSelecionadaDto } from './InformacoesClienteConsultaSelecionadaDto';
import type { InformacoesPetConsultaSelecionadaDto } from './InformacoesPetConsultaSelecionadaDto';

export interface InformacoesConsultaSelecionadaDto {
  id: number;
  pet: InformacoesPetConsultaSelecionadaDto;
  cliente: InformacoesClienteConsultaSelecionadaDto;
  avaliacao: AvaliacaoConsultaDto;
  tipo: string;
  observacoes: string;
  status: StatusConsultaEnum;
  dataSolicitacao: Date;
  dataDeferimento: Date;
  dataConsulta: Date;
  dataFinalizacao: Date | null;
  atendente: string;
}
