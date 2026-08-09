// Fonte única de verdade para as cores de cada tipo de log,

import { TipoLogEnum } from "../../modules/gerente/pages/logs-sistema/models/TipoLogEnum";

// usada tanto no gráfico quanto no badge (BagLog).
export const CORES_POR_TIPO_LOG: Record<TipoLogEnum, string> = {
  [TipoLogEnum.LOGIN]: '--color-card-primary',
  [TipoLogEnum.REGISTRO]: '--color-card-primary',
  [TipoLogEnum.ERRO]: '--bag-reprovado',
  [TipoLogEnum.MOVIMENTACAO_ENTRADA]: '--p-green-500',
  [TipoLogEnum.MOVIMENTACAO_SAIDA]: '--p-orange-500',
  [TipoLogEnum.SE_DESATIVOU]: '--p-gray-500',
  [TipoLogEnum.CANCELOU_CONSULTA]: '--p-red-500',
  [TipoLogEnum.SOLICITOU_CONSULTA]: '--p-cyan-500',
  [TipoLogEnum.DEFERIU_CONSULTA]: '--p-green-500',
  [TipoLogEnum.CONSULTA_INICIADA]: '--p-blue-500',
  [TipoLogEnum.CONSULTA_FINALIZADA]: '--p-indigo-500',
  [TipoLogEnum.DESATIVOU_PERFIL]: '--p-gray-500',
  [TipoLogEnum.INDEFERIU_CONSULTA]: '--p-red-500',
  [TipoLogEnum.EDITOU_TIPO_CONSULTA]: '--p-purple-500',
  [TipoLogEnum.ADICIONOU_CLIENTE]: '--p-teal-500',
  [TipoLogEnum.REGISTROU_PRODUTO]: '--p-green-500',
  [TipoLogEnum.REMOVEU_PRODUTO]: '--p-red-500',
  [TipoLogEnum.EDITOU_PRODUTO]: '--p-yellow-500',
  [TipoLogEnum.REGISTROU_PAGAMENTO_PRESENCIAL]: '--p-cyan-500',
};

// Array cíclico usado quando não há cor fixa aplicável (ex: agrupamento por usuário no gráfico)
export const CORES_GRAFICO_CICLICAS = [
  '--p-cyan-500',
  '--p-red-500',
  '--p-orange-500',
  '--p-green-500',
  '--p-purple-500',
  '--p-yellow-500',
  '--p-blue-500',
  '--p-pink-500',
  '--p-teal-500',
  '--p-indigo-500',
  '--p-gray-500',
];