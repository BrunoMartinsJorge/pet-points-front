export enum PetTipoEnum {
  CACHORRO = 'CACHORRO',
  GATO = 'GATO',
  COELHO = 'COELHO',
  PEIXE = 'PEIXE',
  HAMSTER = 'HAMSTER',
  PASSARO = 'PASSARO',
}

export const PetOpcoes = [
    {
        label: 'Cachorro',
        value: PetTipoEnum.CACHORRO
    },
    {
        label: 'Gato',
        value: PetTipoEnum.GATO
    },
    {
        label: 'Coelho',
        value: PetTipoEnum.COELHO
    },
    {
        label: 'Peixe',
        value: PetTipoEnum.PEIXE
    },
    {
        label: 'Hamster',
        value: PetTipoEnum.HAMSTER
    },
    {
        label: 'Pássaro',
        value: PetTipoEnum.PASSARO
    }
];

const iconePrefixo = 'fa fa-';

export function getIconePorTipoPet(tipo: PetTipoEnum): string {
    switch (tipo) {
        case PetTipoEnum.CACHORRO:
            return iconePrefixo + 'dog';
        case PetTipoEnum.GATO:
            return iconePrefixo + 'cat';
        case PetTipoEnum.COELHO, PetTipoEnum.HAMSTER:
            return iconePrefixo + 'paw';
        case PetTipoEnum.PEIXE:
            return iconePrefixo + 'fish-fins';
        case PetTipoEnum.PASSARO:
            return iconePrefixo + 'crow';
        default:
            return iconePrefixo + 'paw';
    }
}

export function getPorteAnimal(tipo: PetTipoEnum): string {
    switch (tipo) {
        case PetTipoEnum.CACHORRO:
        case PetTipoEnum.GATO:
            return 'Médio a Grande';
        case PetTipoEnum.COELHO:
        case PetTipoEnum.PEIXE:
        case PetTipoEnum.HAMSTER:
        case PetTipoEnum.PASSARO:
            return 'Pequeno';
        default:
            return 'Médio a Grande';
    }
}