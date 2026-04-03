import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import type { PetDetalhesDto, PetSemelhantesDto } from './model/PetDetalhesDto';
import { MeusPetsService } from '../../services/meus-pets-service';
import { Router } from '@angular/router';
import { TipoPetBag } from '../../../../../../shared/components/tipo-pet-bag/tipo-pet-bag';
import { GeneroBag } from '../../../../../../shared/components/genero-bag/genero-bag';
import { ActivatedRoute } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-informacoes-pet',
  imports: [PrimeNGModule, TipoPetBag, GeneroBag, DialogModule],
  templateUrl: './informacoes-pet.html',
  styleUrl: './informacoes-pet.scss',
})
export class InformacoesPet implements OnInit {
  public petSelecionado: PetDetalhesDto | undefined = undefined;
  public petsRelacionados: PetSemelhantesDto[] = [];
  public htmlCarteirinha = "";
  public modalCarteirinha = false;
  private idPetSelecionado = 0;

  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(MeusPetsService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idPetSelecionado = Number(params.get('petId') || 0);
      this.buscarPetSelecionado();
    });
  }

  private buscarPetSelecionado(): void {
    this.petSelecionado = undefined;
    this.service
      .buscarPetSelecionado(this.idPetSelecionado)
      .subscribe((res: PetDetalhesDto) => {
        this.petSelecionado = res;
        this.petsRelacionados = res.petsRelacionados;
      });
  }

  public acessarPet(idPet: number): void {
    this.router.navigate([`/cliente/meus-pets/informacoes/${idPet}`]);
  }

  public buscarCarteirinha(): void {
    this.htmlCarteirinha = "";
    this.service.verCarteirinha(this.idPetSelecionado).subscribe((res: string) => {
      this.htmlCarteirinha = res;
    })
  }
}
