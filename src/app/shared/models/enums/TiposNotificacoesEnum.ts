export enum TiposNotificacoesEnum {
  CONSULTA = 'CONSULTA',
  ATENDIMENTO = 'ATENDIMENTO',
  MENSAGEM = 'MENSAGEM',
  ALERTA = 'ALERTA',
}

export function getIconPorTipo(tipo: TiposNotificacoesEnum): string {
  switch (tipo) {
    case 'ATENDIMENTO':
      return 'fa fa-headset';
    case 'MENSAGEM':
      return 'fa fa-envelope';
    case 'ALERTA':
      return 'fa fa-exclamation-triangle';
    case 'CONSULTA':
      return 'fa fa-list-alt';
    default:
      return 'fa fa-question';
  }
}