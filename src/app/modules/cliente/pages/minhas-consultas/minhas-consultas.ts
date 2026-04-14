import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { MinhasConsultasService } from './services/minhas-consultas-service';
import type { ConsultasPendentesConfirmadasDto } from './models/ConsultasPendentesConfirmadasDto';

@Component({
  selector: 'app-minhas-consultas',
  imports: [PrimeNGModule],
  templateUrl: './minhas-consultas.html',
  styleUrl: './minhas-consultas.scss',
})
export class MinhasConsultas implements OnInit {
  private readonly minhasConsultasService = inject(MinhasConsultasService);
  public consultasPendentesConfirmadas: ConsultasPendentesConfirmadasDto[] = [];

  ngOnInit(): void {
    this.listarConsultasPendentesConfirmadasOuIniciadas();
  }

  private listarConsultasPendentesConfirmadasOuIniciadas(): void {
    this.consultasPendentesConfirmadas = [];
    this.minhasConsultasService.listarConsultasPendentesConfirmadasOuIniciadas().subscribe({
      next: (consultas) => {
        this.consultasPendentesConfirmadas = consultas;
      }
    });
  }
}
