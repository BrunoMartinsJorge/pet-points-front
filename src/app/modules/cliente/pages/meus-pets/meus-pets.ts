import { Component, inject } from '@angular/core';
import { MeusPetsService } from './services/meus-pets-service';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import type { MeuPetDto } from './models/MeuPetDto';
import { PetCard } from "./components/pet-card/pet-card";
import { ConsultaPetCard } from "./components/consulta-pet-card/consulta-pet-card";
import type { MeuPetConsultaDto } from './models/MeuPetConsultaDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meus-pets',
  imports: [PrimeNGModule, PetCard, ConsultaPetCard],
  templateUrl: './meus-pets.html',
  styleUrl: './meus-pets.scss',
})
export class MeusPets {
  private readonly service = inject(MeusPetsService);
  private readonly router = inject(Router);

  pets: MeuPetDto[] = [];
  consultas: MeuPetConsultaDto[] = [];

  constructor(){
    this.buscarMeusPets();
    this.buscarAsConsultasDeMeusPets();
  }

  /**
   * 
   * @description Lista todos os pets do cliente
   */
  private buscarMeusPets(): void {
    this.pets = [];
    this.service.buscarMeusPets().subscribe((res: MeuPetDto[]) => {
      this.pets = res;
    });
  }

  /**
   * 
   * @description Lista todas as consultas de seus pets que estejam: Aprovadas, Em Andamento ou Pendentes
   */
  private buscarAsConsultasDeMeusPets(): void {
    this.consultas = [];
    this.service.buscarAsConsultasDeMeusPets().subscribe((res: MeuPetConsultaDto[]) => {
      this.consultas = res;
    });
  }

  public adicionarNovoPet(): void {
    this.router.navigate(['/cliente/meus-pets/novo']);
  }
}
