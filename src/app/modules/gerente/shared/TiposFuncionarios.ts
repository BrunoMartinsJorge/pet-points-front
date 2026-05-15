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
      ];
    case 'A':
      return ['ATENDENTE'];
    case 'V':
      return ['VETERINARIO'];
    case 'E':
      return ['ESTOQUISTA'];
    default:
      return [];
  }
}
