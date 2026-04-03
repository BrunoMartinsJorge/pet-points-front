export enum TiposFuncionarios {
  GERENTE = 'GERENTE',
  ATENDENTE = 'ATENDENTE',
  VETERINARIO = 'VETERINARIO',
  ESTOQUISTA = 'ESTOQUISTA',
}

export const FuncionariosOpcoes = [
  {
    label: 'Gerente',
    value: TiposFuncionarios.GERENTE,
  },
  {
    label: 'Atendente',
    value: TiposFuncionarios.ATENDENTE,
  },
  {
    label: 'Veterinario',
    value: TiposFuncionarios.VETERINARIO,
  },
  {
    label: 'Estoquista',
    value: TiposFuncionarios.ESTOQUISTA,
  },
];

const iconePrefixo = 'fa fa-';

export function getIconePorTipoFuncionario(tipo: TiposFuncionarios): string {
  switch (tipo) {
    case TiposFuncionarios.GERENTE:
      return iconePrefixo + 'user-gear';
    case TiposFuncionarios.ATENDENTE:
      return iconePrefixo + 'user-tie';
    case TiposFuncionarios.VETERINARIO:
      return iconePrefixo + 'user-doctor';
    case TiposFuncionarios.ESTOQUISTA:
      return iconePrefixo + 'people-carry-box';
    default:
      return iconePrefixo + 'user';
  }
}

export function getPermissoesPorUsuario(tipo: TiposFuncionarios): string[] {
  switch (tipo) {
    case TiposFuncionarios.GERENTE:
      return [
        'Adicionar e Listar Funcionários',
        'Listar Logs do Sistema',
        'Listar Pets',
        'Listar Consultas',
        'Listar Clientes',
        'Listar e Adicionar Novos Tipos de Consultas',
        'Gerar Relatórios de Funcionários, Clientes, Logs, Pets e etc',
      ];
    case TiposFuncionarios.ATENDENTE:
      return ['ATENDENTE'];
    case TiposFuncionarios.VETERINARIO:
      return ['VETERINARIO'];
    case TiposFuncionarios.ESTOQUISTA:
      return ['ESTOQUISTA'];
    default:
      return [];
  }
}
