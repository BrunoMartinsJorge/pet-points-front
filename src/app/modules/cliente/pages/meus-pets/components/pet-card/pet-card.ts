import { Component, inject, Input } from '@angular/core';
import type { MeuPetDto } from '../../models/MeuPetDto';
import { CommonModule } from '@angular/common';
import { GeneroBag } from '../../../../../../shared/components/genero-bag/genero-bag';
import { TipoPetBag } from '../../../../../../shared/components/tipo-pet-bag/tipo-pet-bag';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-card',
  imports: [CommonModule, GeneroBag, TipoPetBag, ButtonModule],
  templateUrl: './pet-card.html',
  styleUrl: './pet-card.scss',
})
export class PetCard {
  @Input() pet!: MeuPetDto;

  private router = inject(Router);

  public acessarPet(): void {
    this.router.navigate([`/cliente/meus-pets/informacoes/${this.pet.id}`]);
  }

  public getUrlImagem(pet: MeuPetDto): string {
    if (pet.imagem == null) return '';
    return 'http://localhost:8080/cliente/meus-pets/imagem/' + pet.id;
  }
}
