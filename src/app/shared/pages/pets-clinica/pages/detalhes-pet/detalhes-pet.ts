import type { OnInit, ElementRef } from '@angular/core';
import { Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetsClinicaService } from '../../service/pets-clinica-service';
import { PrimeNGModule } from '../../../../modules/prime-ng/prime-ng-module';
import type { DetalhesPetDto } from '../../model/DetalhesPetDto';
import type { DetalhesTutorPetDto } from '../../model/DetalhesTutorPetDto';
import type { HistoricoConsultasPetDto } from '../../model/HistoricoConsultasPetDto';
import { BagStatusConsulta } from "../../../../components/bag-status-consulta/bag-status-consulta";
import { CarteirinhaPet } from '../../../../components/carteirinha-pet/carteirinha-pet';
import type { CarteirinhaPetDto } from '../../../../components/carteirinha-pet/dto/CarteirinhaPetDto';
import { CarteirinhaPdfService } from '../../../../components/carteirinha-pet/service/carteirinha-pdf-service';
import { TokenService } from '../../../../../core/services/token-service';

@Component({
  selector: 'app-detalhes-pet',
  imports: [PrimeNGModule, BagStatusConsulta, CarteirinhaPet],
  templateUrl: './detalhes-pet.html',
  styleUrl: './detalhes-pet.scss',
})
export class DetalhesPet implements OnInit {
  private readonly router = inject(ActivatedRoute);
  private readonly routerNavigate = inject(Router);
  private readonly service = inject(PetsClinicaService);
  private readonly carteirinhaPdf = inject(CarteirinhaPdfService);
  private readonly tokenService = inject(TokenService);

  public tipoUsuario = '';

  @ViewChild('pdfcarteirinha') carteirinhaElemento!: ElementRef<HTMLElement>;

  private PET_ID: number | null = null;

  public detalhesPet: DetalhesPetDto | null = null;
  public detalhesTutor: DetalhesTutorPetDto | null = null;
  public historicoConsultas: HistoricoConsultasPetDto[] = [];

  public informacoesCarteirinha: CarteirinhaPetDto | null = null;
  public visibilidadeDialogCarteirinha = false;
  public gerandoPdf = false;

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
    const token = this.tokenService.getTokenPayload;
    if (token) {
      this.tipoUsuario = token.permissoes[0] == 'A' ? 'ATENDENTE' : 'GERENTE';
    }
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
    const base = (this.tipoUsuario || 'GERENTE').toLocaleLowerCase();
    this.routerNavigate.navigate([
      `${base}/detalhes-clientes`,
      this.detalhesTutor.id,
    ]);
  }

  public buscarCarteirinha(): void {
    if (!this.PET_ID) return;
    this.informacoesCarteirinha = null;
    this.service.verCarteirinha(this.PET_ID).subscribe({
      next: (res: CarteirinhaPetDto) => {
        this.informacoesCarteirinha = res;
        this.visibilidadeDialogCarteirinha = true;
      },
    });
  }

  public async baixarCarteirinha(): Promise<void> {
    if (!this.detalhesPet) return;
    try {
      this.gerandoPdf = true;
      const nome = (this.detalhesPet.nome ?? 'pet')
        .trim()
        .replace(/\s+/g, '-')
        .toLowerCase();
      await this.carteirinhaPdf.gerarPdf(
        this.carteirinhaElemento.nativeElement,
        `carteirinha-${nome}.pdf`,
      );
    } finally {
      this.gerandoPdf = false;
    }
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
