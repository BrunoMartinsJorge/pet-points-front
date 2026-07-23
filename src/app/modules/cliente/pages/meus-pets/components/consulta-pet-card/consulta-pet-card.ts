import { Component, inject, Input } from '@angular/core';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import type { MeuPetConsultaDto } from '../../models/MeuPetConsultaDto';
import { BagStatusConsulta } from '../../../../../../shared/components/bag-status-consulta/bag-status-consulta';
import { Router } from '@angular/router';
import { MinhasConsultasService } from '../../../minhas-consultas/services/minhas-consultas-service';
import { Imagem } from '../../../../../../shared/components/imagem/imagem';

@Component({
  selector: 'app-consulta-pet-card',
  imports: [PrimeNGModule, BagStatusConsulta, Imagem],
  templateUrl: './consulta-pet-card.html',
  styleUrl: './consulta-pet-card.scss',
})
export class ConsultaPetCard {
  private readonly consultaService = inject(MinhasConsultasService);
  private readonly router = inject(Router);

  @Input() consulta: MeuPetConsultaDto | null = null;

  public getUrlImagem(consulta: MeuPetConsultaDto): string {
    if (consulta.imagem == null) return '';
    return 'http://localhost:8080/cliente/meus-pets/imagem/' + consulta.idPet;
  }

  public acessarConsulta(consulta: MeuPetConsultaDto): void {
    this.consultaService.idConsultaSelecionada = consulta.id;
    this.consultaService.acessoPorPetSelecionado = true;
    this.router.navigate([`/cliente/minhas-consultas`]);
  }
}
