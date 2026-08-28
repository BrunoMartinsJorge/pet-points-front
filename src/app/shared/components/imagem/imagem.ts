import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ImageModule } from 'primeng/image';

/** Define o ícone exibido no placeholder quando não existe imagem. */
export type TipoImagem = 'usuario' | 'pet' | 'generico';

/**
 * Exibe a foto de um usuário ou pet. Sem imagem, mostra um placeholder cinza
 * com o ícone do tipo — mesmo tamanho e mesma forma da imagem que substitui.
 *
 * `width` e `height` aceitam número ("48") ou medida CSS ("48px"): o componente
 * normaliza os dois formatos, porque o `p-image` usa os valores como atributo
 * HTML da img (que exige número puro) e monta a máscara de preview com
 * `width + 'px'`.
 */
@Component({
  selector: 'app-imagem',
  imports: [CommonModule, ImageModule],
  templateUrl: './imagem.html',
  styleUrl: './imagem.scss',
})
export class Imagem {
  @Input() urlImagem: string | null = '';
  @Input() alt = '';
  @Input() width = '';
  @Input() height = '';
  @Input() preview = false;
  @Input() imagemRedonda = true;
  @Input() tamanhoTotal = false;
  @Input() tipo: TipoImagem = 'generico';

  public get possuiImagem(): boolean {
    return this.urlImagem != null && this.urlImagem.trim() !== '';
  }

  public get srcImagem(): string {
    return this.urlImagem ?? '';
  }

  /** Medida em CSS, usada no placeholder e no estilo da imagem. */
  public get larguraCss(): string | null {
    return this.normalizarMedida(this.width);
  }

  public get alturaCss(): string | null {
    const altura = this.normalizarMedida(this.height);
    if (altura !== null) return altura;
    // Sem altura explícita, um avatar redondo acompanha a largura
    return this.imagemRedonda ? this.larguraCss : null;
  }

  /** Número puro exigido pelos atributos width/height da img do p-image. */
  public get larguraAttr(): string | undefined {
    return this.somenteNumero(this.width) ?? undefined;
  }

  public get alturaAttr(): string | undefined {
    const altura = this.somenteNumero(this.height);
    if (altura !== null) return altura;
    return this.imagemRedonda ? this.larguraAttr : undefined;
  }

  private normalizarMedida(medida: string): string | null {
    const valor = (medida ?? '').trim();
    if (valor === '') return null;
    return /^\d+(\.\d+)?$/.test(valor) ? valor + 'px' : valor;
  }

  private somenteNumero(medida: string): string | null {
    const valor = (medida ?? '').trim();
    const numero = /^(\d+(?:\.\d+)?)(px)?$/.exec(valor);
    return numero ? numero[1] : null;
  }

  public get iconePlaceholder(): string {
    if (this.tipo === 'usuario') return 'fa fas fa-user';
    if (this.tipo === 'pet') return 'fa fas fa-paw';
    return 'fa fas fa-image';
  }

  /**
   *
   * @description - Fixa no CSS o mesmo box do placeholder, para que uma foto
   * fora de proporção seja recortada em vez de deformar o avatar
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public get estiloImagem(): Record<string, any> {
    const estilo: Record<string, string> = { 'object-fit': 'cover' };

    if (this.tamanhoTotal) {
      estilo['aspect-ratio'] = '1 / 1';
    } else {
      if (this.larguraCss !== null) estilo['width'] = this.larguraCss;
      if (this.alturaCss !== null) estilo['height'] = this.alturaCss;
    }

    if (this.imagemRedonda) estilo['border-radius'] = '50%';
    return estilo;
  }
}
