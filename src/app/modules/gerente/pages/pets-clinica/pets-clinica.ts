import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { PetsClinicaService } from './service/pets-clinica-service';
import type { PetsDto } from './model/PetsDto';
import { GeneroBag } from '../../../../shared/components/genero-bag/genero-bag';
import { TipoPetBag } from '../../../../shared/components/tipo-pet-bag/tipo-pet-bag';
import type { TutorDto } from './model/TutorDto';
import { GeneroEnumOpcoes } from '../../../../shared/models/enums/GeneroEnum';
import { PetOpcoes } from '../../../../shared/models/PetOpcoes';
import { Router } from '@angular/router';
import type { RelatorioPetsClinicaForm } from './form/RelatorioPetsClinicaForm';

@Component({
  selector: 'app-pets-clinica',
  imports: [PrimeNGModule, GeneroBag, TipoPetBag],
  templateUrl: './pets-clinica.html',
  styleUrl: './pets-clinica.scss',
})
export class PetsClinica implements OnInit {
  private readonly service = inject(PetsClinicaService);
  private readonly router = inject(Router);

  private pets: PetsDto[] = [];
  public petsFiltrados: PetsDto[] = [];
  public tutores: TutorDto[] = [];

  public carregandoPets = false;
  public carregandoTutores = false;
  public carregandoRelatorio = false;

  public readonly generosOpcoes = GeneroEnumOpcoes;
  public readonly tipoAnimalOpcoes = PetOpcoes;

  public filtros: RelatorioPetsClinicaForm = {
    nome: '',
    tipo: '',
    genero: '',
    idTutor: null as number | null,
  };

  ngOnInit(): void {
    this.buscarPets();
  }

  private buscarPets(): void {
    this.carregandoPets = true;
    this.pets = [];
    this.petsFiltrados = [];
    this.service.listarPets().subscribe({
      next: (res: PetsDto[]) => {
        this.pets = res;
        this.petsFiltrados = res;
        this.buscarTutores();
        this.carregandoPets = false;
      },
      error: () => {
        this.carregandoPets = false;
      }
    });
  }

  private buscarTutores(): void {
    this.carregandoTutores = true;
    this.tutores = [];
    this.service.buscarTutoresFiltro().subscribe({
      next: (res: TutorDto[]) => {
        this.tutores = res;
        this.carregandoTutores = false;
        if (!this.tutores.find((tutor) => tutor.label === 'Todos')) {
          this.tutores.unshift({ label: 'Todos', value: null });
        }
      },
    });
  }

  public filtrarPets(): void {
    let pets = this.pets;
    if (this.filtros.nome !== '' || this.filtros.nome.trim() !== '') {
      pets = pets.filter((pet) =>
        pet.nome.toLowerCase().includes(this.filtros.nome.toLowerCase()),
      );
    }
    if (this.filtros.tipo !== '' || this.filtros.tipo.trim() !== '') {
      pets = pets.filter((pet) =>
        pet.tipo.toLowerCase().includes(this.filtros.tipo.toLowerCase()),
      );
    }
    if (this.filtros.genero !== '' || this.filtros.genero.trim() !== '') {
      pets = pets.filter((pet) =>
        pet.genero.toLowerCase().includes(this.filtros.genero.toLowerCase()),
      );
    }
    if (this.filtros.idTutor !== null) {
      pets = pets.filter((pet) => pet.tutor.id === this.filtros.idTutor);
    }
    this.petsFiltrados = pets;
  }

  public limparFiltros(): void {
    this.filtros = {
      nome: '',
      tipo: '',
      genero: '',
      idTutor: null,
    };
    this.filtrarPets();
  }

  public verDetalhesPet(idPet: number): void {
    this.router.navigate(['gerente/detalhes-pet', idPet]);
  }

  public gerarRelatorio(): void {
    this.carregandoRelatorio = true;
    this.service.gerarRelatorioPets(this.filtros).subscribe({
      next: (res: Blob) => {
        const file = new Blob([res], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        this.carregandoRelatorio = false;
      },
      error: () => {  
        this.carregandoRelatorio = false;
      }
    })
  }
}
