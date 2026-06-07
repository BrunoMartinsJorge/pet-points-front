export enum GeneroEnum {
    MASCULINO = 'M',
    FEMININO = 'F'
}

export const GeneroEnumOpcoes = [
    {
        label: 'Todos',
        value: ''
    },
    {
        label: 'Masculino',
        value: GeneroEnum.MASCULINO
    },
    {
        label: 'Feminino',
        value: GeneroEnum.FEMININO
    }
];

export const GeneroEnumOpcoesFormulario = [
    {
        label: 'Masculino',
        value: GeneroEnum.MASCULINO
    },
    {
        label: 'Feminino',
        value: GeneroEnum.FEMININO
    }
];