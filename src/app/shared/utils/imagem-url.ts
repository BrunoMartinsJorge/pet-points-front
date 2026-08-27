import { environment } from '../../../environments/environment';

/**
 * Monta as URLs das imagens de usuários e pets num único lugar. Todas as fotos
 * são servidas pelo endpoint público `/arquivos/{uuid}`, onde o uuid é o campo
 * `imagem` do usuário ou do pet.
 *
 * Retorna string vazia quando não existe imagem, que é o que o componente
 * `app-imagem` espera para exibir o placeholder cinza.
 */
export function urlArquivo(uuid: string | null | undefined): string {
  if (uuid == null || uuid.trim() === '') return '';
  return `${environment.apiUrl}/arquivos/${uuid.trim()}`;
}

/**
 * Foto do usuário a partir do id, para os casos em que só o id está disponível
 * (por exemplo, o usuário logado). Devolve 404 quando não há foto, e o
 * `app-imagem` cai no placeholder.
 */
export function urlImagemUsuarioPorId(
  idUsuario: number | string | null | undefined,
): string {
  if (idUsuario == null || String(idUsuario).trim() === '') return '';
  return `${environment.apiUrl}/arquivos/usuario/${idUsuario}`;
}
