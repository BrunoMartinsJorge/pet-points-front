import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-imagem',
  imports: [CommonModule, ImageModule],
  templateUrl: './imagem.html',
  styleUrl: './imagem.scss',
})
export class Imagem {
  @Input() urlImagem = '';
  @Input() alt = '';
  @Input() width = '';
  @Input() height = '';
  @Input() preview = false;
  @Input() arquivo: File | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() style: any = {};
  @Input() imagemRedonda = true;
  @Input() tamanhoTotal = false;
}
