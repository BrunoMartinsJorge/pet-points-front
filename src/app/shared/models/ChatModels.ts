export type TipoUsuario = 'C' | 'G' | 'E' | 'V' | 'A';
 
export interface ParticipanteChatInterno {
  id: number;
  nome: string;
  tipoUsuario: TipoUsuario;
}
 
// GET /chat-interno/funcionarios
export interface UsuarioInterno {
  id: number;
  nome: string;
  tipoUsuario: TipoUsuario;
  idChat: number | null;
}
 
// mensagem do chat interno (WS e histórico)
export interface MensagemInterna {
  id: number;
  idChat: number;
  remetente: ParticipanteChatInterno;
  destinatario: ParticipanteChatInterno;
  mensagem: string;
  enviadoEm: string;
  enviadoPorVoce: boolean;
}
 
// mensagem do chat de atendimento (WS e histórico)
export interface MensagemAtendimento {
  id: number;
  idChat: number;
  remetenteId: number;
  enviadoPor: string;
  mensagem: string;
  enviadoEm: string;
  enviadoPorVoce: boolean;
}