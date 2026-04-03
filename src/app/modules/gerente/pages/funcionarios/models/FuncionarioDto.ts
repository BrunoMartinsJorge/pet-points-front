import type { GeneroEnum } from '../../../../../shared/models/enums/GeneroEnum';
import type { StatusPerfilEnum } from '../../../../../shared/models/enums/StatusPerfilEnum';

export interface FuncionarioDto {
  id: number;
  email: string;
  nome: string;
  cpf: string;
  telefone: string;
  genero: GeneroEnum;
  dataNascimento: string;
  dataCadastro: string;
  permissao: string;
  statusPerfil: StatusPerfilEnum;
}
