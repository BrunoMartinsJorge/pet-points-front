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
  fotoUsuario: string | null;
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
  remetenteId?: number;
  mensagem: string;
  enviadoEm: Date;
  enviadoPorVoce: boolean;
}

// evento publicado em /topic/chat-atendimento/status/{idChat} sempre que o
// atendimento muda de status (aceito pelo atendente ou finalizado pelo cliente)
export interface StatusAtendimentoEvento {
  idAtendimento: number;
  idChat: number;
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'FINALIZADO';
  cliente: string | null;
  atendente: string | null;
}