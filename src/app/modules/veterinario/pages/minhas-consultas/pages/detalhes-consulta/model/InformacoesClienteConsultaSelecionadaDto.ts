import type { GeneroEnum } from '../../../../../../../shared/models/enums/GeneroEnum';

export interface InformacoesClienteConsultaSelecionadaDto {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  genero: GeneroEnum;
  imagem: string | null;
}
