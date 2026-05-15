import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetsClinicaService } from '../../service/pets-clinica-service';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import type { DetalhesPetDto } from '../../model/DetalhesPetDto';
import type { DetalhesTutorPetDto } from '../../model/DetalhesTutorPetDto';
import type { HistoricoConsultasPetDto } from '../../model/HistoricoConsultasPetDto';
import { BagStatusConsulta } from "../../../../../../shared/components/bag-status-consulta/bag-status-consulta";

@Component({
  selector: 'app-detalhes-pet',
  imports: [PrimeNGModule, BagStatusConsulta],
  templateUrl: './detalhes-pet.html',
  styleUrl: './detalhes-pet.scss',
})
export class DetalhesPet implements OnInit {
  private readonly router = inject(ActivatedRoute);
  private readonly routerNavigate = inject(Router);
  private readonly service = inject(PetsClinicaService);

  private PET_ID: number | null = null;

  public detalhesPet: DetalhesPetDto | null = null;
  public detalhesTutor: DetalhesTutorPetDto | null = null;
  public historicoConsultas: HistoricoConsultasPetDto[] = [];

  public carregandoDetalhesPet = false;
  public carregandoDetalhesTutor = false;
  public carregandoHistoricoConsultas = false;

  private get getPetId(): number | null {
    let id;
    this.router.paramMap.subscribe((params) => {
      id = Number(params.get('id') || null);
    });
    return id || null;
  }

  ngOnInit(): void {
    this.PET_ID = this.getPetId;
    this.buscarDetalhesDoPet();
  }

  public buscarDetalhesDoPet(): void {
    if (!this.PET_ID) return;
    this.carregandoDetalhesPet = true;
    this.detalhesPet = null;
    this.service.buscarDetalhesPet(this.PET_ID).subscribe({
      next: (res) => {
        this.detalhesPet = res;
        this.buscarDetalhesTutor();
        this.buscarHistoricoConsultasPet()
        this.carregandoDetalhesPet = false;
      },
      error: () => {
        this.carregandoDetalhesPet = false;
      }
    });
  }

  public buscarDetalhesTutor(): void {
    if (!this.PET_ID) return;
    this.carregandoDetalhesTutor = true;
    this.detalhesTutor = null;
    this.service.buscarDetalhesTutor(this.PET_ID).subscribe({
      next: (res) => {
        this.detalhesTutor = res;
        this.carregandoDetalhesTutor = false;
      },
      error: () => {
        this.carregandoDetalhesTutor = false;
      }
    });
  }

  public verDetalhesCliente(): void {
    if (!this.detalhesTutor) return;
    this.routerNavigate.navigate(['gerente/detalhes-clientes', this.detalhesTutor.id]);
  }

  private buscarHistoricoConsultasPet(): void {
    if (!this.PET_ID) return;
    this.carregandoHistoricoConsultas = true;
    this.historicoConsultas = [];
    this.service.buscarHistoricoConsultasPet(this.PET_ID).subscribe({
      next: (res: HistoricoConsultasPetDto[]) => {
        this.historicoConsultas = res;
        this.carregandoHistoricoConsultas = false;
      },
      error: () => {
        this.carregandoHistoricoConsultas = false;
      }
    })
  }
}
