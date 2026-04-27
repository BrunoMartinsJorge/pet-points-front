import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import { ActivatedRoute } from '@angular/router';
import { ConsultasClinicaService } from '../../service/consultas-clinica-service';
import type { DetalhesConsultaDto } from '../../model/DetalhesConsultaDto';
import { BagStatusConsulta } from "../../../../../../shared/components/bag-status-consulta/bag-status-consulta";

@Component({
  selector: 'app-detalhes-consulta',
  imports: [PrimeNGModule, BagStatusConsulta],
  templateUrl: './detalhes-consulta.html',
  styleUrl: './detalhes-consulta.scss',
})
export class DetalhesConsulta implements OnInit {
  private CONSULTA_ID: number | null = null;

  private readonly router = inject(ActivatedRoute);
  private readonly service = inject(ConsultasClinicaService);

  public detalhesConsulta: DetalhesConsultaDto | null = null;

  private get getConsultaId(): number | null {
    let id;
    this.router.paramMap.subscribe((params) => {
      id = Number(params.get('id') || null);
    });
    return id || null;
  }

  ngOnInit(): void {
    this.CONSULTA_ID = this.getConsultaId;
    if (!this.CONSULTA_ID) return;
    this.buscarDetalhesDaConsulta();
  }

  private buscarDetalhesDaConsulta(): void {
    if (!this.CONSULTA_ID) return;
    this.detalhesConsulta = null;
    this.service.buscarDetalhesConsulta(this.CONSULTA_ID).subscribe({
      next: (res: DetalhesConsultaDto) => (this.detalhesConsulta = res),
    });
  }
}
