import type { TagData } from "../TagData";

export enum StatusAtendimentoEnum {
  PENDENTE = 'PENDENTE',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  FINALIZADO = 'FINALIZADO',
}

export function getTagDataAtendimento(status: StatusAtendimentoEnum): TagData {
  switch (status) {
    case StatusAtendimentoEnum.PENDENTE:
      return {
        label: 'Pendente',
        severity: 'warn',
        icon: 'fa fa-clock',
      };
    case StatusAtendimentoEnum.EM_ANDAMENTO:
      return {
        label: 'Em andamento',
        severity: 'info',
        icon: 'fa fa-play',
      };
    case StatusAtendimentoEnum.FINALIZADO:
      return {
        label: 'Finalizado',
        severity: 'success',
        icon: 'fa fa-check',
      };
  }
}