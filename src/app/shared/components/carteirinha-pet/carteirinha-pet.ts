import { Component, Input } from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import type { CarteirinhaPetDto } from './dto/CarteirinhaPetDto';

@Component({
  selector: 'app-carteirinha-pet',
  imports: [DecimalPipe, TitleCasePipe],
  templateUrl: './carteirinha-pet.html',
  styleUrl: './carteirinha-pet.scss',
})
export class CarteirinhaPet {
  @Input({ required: true }) pet!: CarteirinhaPetDto;

  @Input() imagemBaseUrl = '';

  @Input() mascararCpf = true;

  public get imagemUrl(): string | null {
    return this.pet.imagem ? `${this.imagemBaseUrl}${this.pet.imagem}` : null;
  }

  public get iniciaisPet(): string {
    return this.iniciais(this.pet.nome);
  }

  public get iniciaisTutor(): string {
    return this.iniciais(this.pet.nomeTutor);
  }

  public get iconeGeneroPet(): string {
    return this.iconeGenero(this.pet.genero);
  }

  public get classeGeneroPet(): string {
    return this.ehFeminino(this.pet.genero) ? 'pill-fem' : 'pill-masc';
  }

  public get iconeTipo(): string {
    const tipo = (this.pet.tipo ?? '').toLowerCase();
    if (tipo.includes('gato') || tipo.includes('cat')) return 'fa-cat';
    if (tipo.includes('peixe') || tipo.includes('fish')) return 'fa-fish';
    if (tipo.includes('cach') || tipo.includes('cão') || tipo.includes('cao') || tipo.includes('dog')) {
      return 'fa-dog';
    }
    return 'fa-paw';
  }

  public get cpfExibicao(): string {
    const cpf = this.pet.cpfTutor ?? '';
    if (!this.mascararCpf) return cpf;

    const digitos = cpf.replace(/\D/g, '');
    if (digitos.length !== 11) return cpf;
    return `•••.${digitos.substring(3, 6)}.${digitos.substring(6, 9)}-••`;
  }

  private ehFeminino(genero: string): boolean {
    return (genero ?? '').trim().toLowerCase().startsWith('f');
  }

  private iconeGenero(genero: string): string {
    return this.ehFeminino(genero) ? 'fa-venus' : 'fa-mars';
  }

  private iniciais(nome: string): string {
    const limpo = (nome ?? '').trim();
    if (!limpo) return '';
    return limpo.substring(0, 2);
  }
}