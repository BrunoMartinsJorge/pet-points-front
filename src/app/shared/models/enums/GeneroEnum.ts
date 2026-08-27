import type { TagData } from '../TagData';

export enum GeneroEnum {
  MASCULINO = 'M',
  FEMININO = 'F',
}

export const GeneroEnumOpcoes = [
  {
    label: 'Todos',
    value: '',
  },
  {
    label: 'Masculino',
    value: GeneroEnum.MASCULINO,
  },
  {
    label: 'Feminino',
    value: GeneroEnum.FEMININO,
  },
];

export const GeneroEnumOpcoesFormulario = [
  {
    label: 'Masculino',
    value: GeneroEnum.MASCULINO,
  },
  {
    label: 'Feminino',
    value: GeneroEnum.FEMININO,
  },
];

export function getTagDataGenero(genero: 'M' | 'F'): TagData {
  if (genero === 'M') {
    return {
      label: 'Masculino',
      severity: 'info',
      icon: 'fa fa-mars',
    };
  } else if (genero === 'F') {
    return {
      label: 'Feminino',
      severity: 'danger',
      icon: 'fa fa-venus',
    };
  } else {
    return {
      label: 'Incompatível',
      severity: 'contrast',
      icon: 'fa fa-question',
    };
  }
}
