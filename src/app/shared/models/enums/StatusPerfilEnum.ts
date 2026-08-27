import type { TagData } from '../TagData';

export enum StatusPerfilEnum {
  ATIVO = 'A',
  DESATIVADO = 'D',
}

export function getTagPerfilData(
  status: StatusPerfilEnum | null | undefined,
): TagData {
  if (status == null || status == undefined)
    return {
      label: 'Incompatível',
      severity: 'contrast',
      icon: 'fa fa-question',
    };
  if (status === StatusPerfilEnum.ATIVO) {
    return {
      label: 'Ativo',
      severity: 'success',
      icon: 'fa fa-check',
    };
  } else if (status === StatusPerfilEnum.DESATIVADO) {
    return {
      label: 'Desativado',
      severity: 'danger',
      icon: 'fa fa-times',
    };
  } else {
    return {
      label: 'Incompatível',
      severity: 'contrast',
      icon: 'fa fa-question',
    };
  }
}
