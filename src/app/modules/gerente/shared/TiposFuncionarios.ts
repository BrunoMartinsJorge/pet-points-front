export enum TiposFuncionarios {
  G = 'GERENTE',
  A = 'ATENDENTE',
  V = 'VETERINARIO',
  E = 'ESTOQUISTA',
}

export const FuncionariosOpcoes = [
  {
    label: 'Todos',
    value: '',
  },
  {
    label: 'Gerente',
    value: TiposFuncionarios.G,
  },
  {
    label: 'Atendente',
    value: TiposFuncionarios.A,
  },
  {
    label: 'Veterinario',
    value: TiposFuncionarios.V,
  },
  {
    label: 'Estoquista',
    value: TiposFuncionarios.E,
  },
];

export const FuncionariosOpcoesForm = [
  {
    label: 'Gerente',
    value: TiposFuncionarios.G,
  },
  {
    label: 'Atendente',
    value: TiposFuncionarios.A,
  },
  {
    label: 'Veterinario',
    value: TiposFuncionarios.V,
  },
  {
    label: 'Estoquista',
    value: TiposFuncionarios.E,
  },
];

const iconePrefixo = 'fa fa-';

export function getIconePorTipoFuncionario(tipo: TiposFuncionarios): string {
  switch (tipo) {
    case TiposFuncionarios.G:
      return iconePrefixo + 'user-gear';
    case TiposFuncionarios.A:
      return iconePrefixo + 'user-tie';
    case TiposFuncionarios.V:
      return iconePrefixo + 'user-doctor';
    case TiposFuncionarios.E:
      return iconePrefixo + 'people-carry-box';
    default:
      return iconePrefixo + 'user';
  }
}

export function getPermissoesPorUsuario(tipo: string): string[] {
  switch (tipo) {
    case 'G':
      return [
        'Adicionar e Listar Funcionários',
        'Listar Logs do Sistema',
        'Listar Pets',
        'Listar Consultas',
        'Listar Clientes',
        'Listar e Adicionar Novos Tipos de Consultas',
        'Gerar Relatórios de Funcionários, Clientes, Logs, Pets e etc',
        'etc...',
      ];
    case 'A':
      return [
        'Listar e Visualizar Consultas',
        'Listar, Cadastrar e Visualizar Pets',
        'Listar, Cadastrar e Visualizar Clientes',
        'Listar e Deferir/Indeferir Solicitações de Consultas',
        'Interagir com os demais Funcionarios',
        'Iniciar e Participar de Atendimentos',
        'etc...',
      ];
    case 'V':
      return [
        'Listar e Acessar Suas Proprias Consultas',
        'Interagir com os demais Funcionarios',
        'Iniciar e Finalizar suas Consultas',
        'Gerar Prescrições de suas Consultas',
        'etc...',
      ];
    case 'E':
      return [
        'Realizar Movimentações de Entrada e Saída de Itens',
        'Interagir com os demais Funcionarios',
        'Atuar no Controle de Estoque da Clínica',
        'Gerar Relatórios de Movimentações',
        'Listar Suas Movimentações',
        'etc...',
      ];
    default:
      return [];
  }
}
