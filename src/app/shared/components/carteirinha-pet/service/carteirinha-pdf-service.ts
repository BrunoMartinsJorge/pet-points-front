/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Injectable({ providedIn: 'root' })
export class CarteirinhaPdfService {
  private readonly escala = 3;

  /**
   * Gera e baixa um PDF do tamanho exato do elemento informado.
   * @param elemento nó DOM da carteirinha (ex.: ElementRef.nativeElement)
   */
  public async gerarPdf(
    elemento: HTMLElement,
    nomeArquivo = 'carteirinha.pdf',
  ): Promise<void> {
    await this.aguardarRecursos(elemento);

    const canvas = await html2canvas(elemento, {
      scale: this.escala,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');

    const larguraPt = (canvas.width / this.escala) * 0.75;
    const alturaPt = (canvas.height / this.escala) * 0.75;

    const pdf = new jsPDF({
      orientation: alturaPt >= larguraPt ? 'portrait' : 'landscape',
      unit: 'pt',
      format: [larguraPt, alturaPt],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, larguraPt, alturaPt, undefined, 'FAST');
    pdf.save(nomeArquivo);
  }

  private async aguardarRecursos(elemento: HTMLElement): Promise<void> {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    const imagens = Array.from(elemento.querySelectorAll('img'));
    await Promise.all(
      imagens.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }),
      ),
    );
  }
}