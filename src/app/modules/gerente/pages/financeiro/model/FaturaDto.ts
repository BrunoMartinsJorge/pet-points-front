export interface FaturaDto {
  id: number;
  numero: string;
  clienteId: number | null;
  clienteNome: string;
  valor: number;
  status: string;
  data: string;
  tipoPagamento: string;
}
