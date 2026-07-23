import type { OptionSelect } from "../../../../../shared/models/OptionSelect";
import { TipoLogEnum } from "./TipoLogEnum";

export const TipoLogOpcoes: OptionSelect[] = [
    {
        label: 'Login',
        value: TipoLogEnum.LOGIN
    },
    {
        label: 'Registro',
        value: TipoLogEnum.REGISTRO
    },
    {
        label: 'Erro',
        value: TipoLogEnum.ERRO
    },
    {
        label: 'Movimentação Entrada',
        value: TipoLogEnum.MOVIMENTACAO_ENTRADA
    },
    {
        label: 'Movimentação Saida',
        value: TipoLogEnum.MOVIMENTACAO_SAIDA
    },
    {
        label: 'Desativou seu perfil',
        value: TipoLogEnum.SE_DESATIVOU
    },
    {
        label: 'Cancelou a consulta',
        value: TipoLogEnum.CANCELOU_CONSULTA
    },
    {
        label: 'Solicitou a consulta',
        value: TipoLogEnum.SOLICITOU_CONSULTA
    },
    {
        label: 'Deferiu a consulta',
        value: TipoLogEnum.DEFERIU_CONSULTA
    },
    {
        label: 'Consulta iniciada',
        value: TipoLogEnum.CONSULTA_INICIADA
    },
    {
        label: 'Consulta finalizada',
        value: TipoLogEnum.CONSULTA_FINALIZADA
    },
    {
        label: 'Desativou perfil',
        value: TipoLogEnum.DESATIVOU_PERFIL
    },
    {
        label: 'Indeferiu a consulta',
        value: TipoLogEnum.INDEFERIU_CONSULTA
    },
];
