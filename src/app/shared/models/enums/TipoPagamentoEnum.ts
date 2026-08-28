import type { TagData } from "../TagData";

export enum TipoPagamentoEnum {
  PIX = 'PIX',
  CARTAO = 'CARTAO',
  DINHEIRO = 'DINHEIRO',
}

export const TipoPagamentoOpcoesFiltros = [
  {
    label: 'Todos',
    value: '',
  },
  {
    label: 'Pix',
    value: 'PIX',
  },
  {
    label: 'Cartão',
    value: 'CARTAO',
  },
  {
    label: 'Dinheiro',
    value: 'DINHEIRO',
  },
];

export const TipoPagamentoOpcoes = [
  {
    label: 'Pix',
    value: 'PIX',
  },
  {
    label: 'Cartão',
    value: 'CARTAO',
  },
  {
    label: 'Dinheiro',
    value: 'DINHEIRO',
  },
];

export function getTagDataTipoPagamento(tipo: TipoPagamentoEnum): TagData {
  switch (tipo) {
    case TipoPagamentoEnum.PIX:
      return {
        label: 'Pix',
        severity: 'success',
        icon: 'fa fa-qrcode'
      };
    case TipoPagamentoEnum.CARTAO:
      return {
        label: 'Cartão',
        severity: 'info',
        icon: 'fa fa-credit-card'
      };
    case TipoPagamentoEnum.DINHEIRO:
      return {
        label: 'Dinheiro',
        severity: 'warn',
        icon: 'fa fa-money-bill'
      };
    default:
      return {
        label: 'Incompativel',
        severity: 'contrast',
        icon: 'fa fa-question'
      };
  }
}