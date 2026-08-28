import type { TagData } from "../TagData";

export enum StatusPagamentoEnum {
  PENDENTE = 'PENDENTE',
  ENVIADO = 'ENVIADO',
  APROVADO = 'APROVADO',
  REPROVADO = 'REPROVADO',
  CANCELADO = 'CANCELADO',
  DEVOLVIDO = 'DEVOLVIDO',
  RECUSADO = 'RECUSADO',
}

export function getTagDataPagamentos(status: StatusPagamentoEnum): TagData {
  switch (status) {
    case StatusPagamentoEnum.PENDENTE:
      return {
        label: 'Pendente',
        severity: 'warn',
        icon: 'fa fa-clock',
      };
    case StatusPagamentoEnum.ENVIADO:
      return {
        label: 'Enviado',
        severity: 'info',
        icon: 'fa fa-play',
      };
    case StatusPagamentoEnum.APROVADO:
      return {
        label: 'Aprovado',
        severity: 'success',
        icon: 'fa fa-check',
      };
    case StatusPagamentoEnum.REPROVADO:
      return {
        label: 'Reprovado',
        severity: 'danger',
        icon: 'fa fa-times',
      };
    case StatusPagamentoEnum.CANCELADO:
      return {
        label: 'Cancelado',
        severity: 'danger',
        icon: 'fa fa-times',
      };
    case StatusPagamentoEnum.DEVOLVIDO:
      return {
        label: 'Devolvido',
        severity: 'danger',
        icon: 'fa fa-times',
      };
    case StatusPagamentoEnum.RECUSADO:
      return {
        label: 'Recusado',
        severity: 'danger',
        icon: 'fa fa-times',
      };
  }
}