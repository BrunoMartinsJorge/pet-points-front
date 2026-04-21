import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { ClientesClinicaService } from '../../service/clientes-clinica-service';
import { ActivatedRoute } from '@angular/router';
import type { ClientesDetalhesDto } from './model/ClientesDetalhesDto';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import type { PetsClienteDto } from './model/PetsClienteDto';
import type { HistoricoConsultasClienteDto } from './model/HistoricoConsultasClienteDto';
import { GeneroBag } from '../../../../../../shared/components/genero-bag/genero-bag';
import { TipoPetBag } from '../../../../../../shared/components/tipo-pet-bag/tipo-pet-bag';
import { BagStatusConsulta } from '../../../../../../shared/components/bag-status-consulta/bag-status-consulta';

@Component({
  selector: 'app-detalhes-clientes',
  imports: [PrimeNGModule, GeneroBag, TipoPetBag, BagStatusConsulta],
  templateUrl: './detalhes-clientes.html',
  styleUrl: './detalhes-clientes.scss',
})
export class DetalhesClientes implements OnInit {
  private readonly service = inject(ClientesClinicaService);
  private readonly router = inject(ActivatedRoute);
  private CLIENTE_ID: number | null = null;

  public detalhesCliente: ClientesDetalhesDto | null = null;
  public pets: PetsClienteDto[] = [];
  public consultas: HistoricoConsultasClienteDto[] = [];

  ngOnInit(): void {
    this.CLIENTE_ID = Number(this.getClienteId);
    if (this.CLIENTE_ID) this.buscarDetalhesCliente();
  }

  private get getClienteId(): number | null {
    let id;
    this.router.paramMap.subscribe((params) => {
      id = Number(params.get('id') || null);
    });
    return id || null;
  }

  private buscarDetalhesCliente(): void {
    if (!this.CLIENTE_ID) return;
    this.detalhesCliente = null;
    this.service.buscarDetalhesCliente(this.CLIENTE_ID).subscribe({
      next: (response: ClientesDetalhesDto) => {
        this.detalhesCliente = response;
        setTimeout(() => {
          this.buscarPetsDoCliente();
          this.buscarHistoricoConsultasCliente();
        }, 500);
      },
    });
  }

  private buscarPetsDoCliente(): void {
    if (!this.CLIENTE_ID) return;
    this.pets = [];
    this.service.buscarListaPetsCliente(this.CLIENTE_ID).subscribe({
      next: (response: PetsClienteDto[]) => {
        this.pets = response;
      },
    });
  }

  public buscarHistoricoConsultasCliente(): void {
    if (!this.CLIENTE_ID) return;
    this.consultas = [];
    this.service.buscarHistoricoConsultasCliente(this.CLIENTE_ID).subscribe({
      next: (response: HistoricoConsultasClienteDto[]) => {
        this.consultas = response;
      },
    });
  }
}
