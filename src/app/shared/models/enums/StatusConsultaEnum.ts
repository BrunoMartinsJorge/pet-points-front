import type { TagData } from '../TagData';

export enum StatusConsultaEnum {
  PENDENTE = 'PENDENTE',
  APROVADA = 'APROVADA',
  REPROVADA = 'REPROVADA',
  INICIADO = 'INICIADO',
  FINALIZADO = 'FINALIZADO',
  CANCELADO = 'CANCELADO',
}

export function getTagData(status: StatusConsultaEnum | null | undefined): TagData {
  if (status == null || status == undefined)
    return {
      label: 'Incompatível',
      severity: 'contrast',
      icon: 'fa fa-question',
    };

  switch (status) {
    case StatusConsultaEnum.PENDENTE:
      return {
        label: 'Pendente',
        severity: 'warn',
        icon: 'fa fa-clock',
      };
    case StatusConsultaEnum.APROVADA:
      return {
        label: 'Aprovada',
        severity: 'success',
        icon: 'fa fa-check',
      };
    case StatusConsultaEnum.REPROVADA:
      return {
        label: 'Reprovada',
        severity: 'danger',
        icon: 'fa fa-times',
      };
    case StatusConsultaEnum.INICIADO:
      return {
        label: 'Iniciada',
        severity: 'info',
        icon: 'fa fa-play',
      };
    case StatusConsultaEnum.FINALIZADO:
      return {
        label: 'Finalizada',
        severity: 'success',
        icon: 'fa fa-stop',
      };
    case StatusConsultaEnum.CANCELADO:
      return {
        label: 'Cancelada',
        severity: 'danger',
        icon: 'fa fa-times',
      };
    default:
      return {
        label: 'Incompatível',
        severity: 'contrast',
        icon: 'fa fa-question',
      };
  }
}
