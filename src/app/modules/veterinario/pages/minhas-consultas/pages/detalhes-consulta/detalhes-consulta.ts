import { Component, inject } from '@angular/core';
import type { OnInit } from '@angular/core';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import { ActivatedRoute } from '@angular/router';
import type { InformacoesConsultaSelecionadaDto } from './model/InformacoesConsultaSelecionadaDto';
import { StatusConsultaEnum } from '../../../../../../shared/models/enums/StatusConsultaEnum';
import { GeneroBag } from '../../../../../../shared/components/genero-bag/genero-bag';
import { TipoPetBag } from '../../../../../../shared/components/tipo-pet-bag/tipo-pet-bag';
import { Imagem } from '../../../../../../shared/components/imagem/imagem';
import { RatingModule } from 'primeng/rating';
import { BagStatusConsulta } from '../../../../../../shared/components/bag-status-consulta/bag-status-consulta';
import { MinhasConsultasService } from '../../service/minhas-consultas-service';
import type { ButtonSeverity } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-detalhes-consulta',
  imports: [
    PrimeNGModule,
    GeneroBag,
    TipoPetBag,
    Imagem,
    RatingModule,
    BagStatusConsulta,
  ],
  templateUrl: './detalhes-consulta.html',
  styleUrl: './detalhes-consulta.scss',
})
export class DetalhesConsulta implements OnInit {
  private readonly router = inject(ActivatedRoute);
  private readonly service = inject(MinhasConsultasService);
  private readonly toast = inject(MessageService);

  public informacoesConsulta: InformacoesConsultaSelecionadaDto | null = null;
  private idConsultaSelecionada: number | null = null;
  public carregandoInformacoesConsulta = true;

  public habilitarBotao = true;
  public visibilidadeFinalizarConsulta = false;
  public resumoConsulta = "";

  public ngOnInit(): void {
    this.pegarIdConsulta();
  }

  private pegarIdConsulta(): void {
    this.idConsultaSelecionada = null;
    this.router.params.subscribe((params) => {
      this.idConsultaSelecionada = params['id'];
    });
    if (this.idConsultaSelecionada != null)
      this.buscarInformacoesConsultaSelecionada();
  }

  public buscarInformacoesConsultaSelecionada(): void {
    if (this.idConsultaSelecionada === null) return;
    this.carregandoInformacoesConsulta = true;
    this.service
      .buscarInformacoesConsulta(this.idConsultaSelecionada)
      .subscribe({
        next: (response: InformacoesConsultaSelecionadaDto) => {
          this.informacoesConsulta = response;
          this.carregandoInformacoesConsulta = false;
          this.habilitarBotao =
            (response.status == StatusConsultaEnum.APROVADA ||
            response.status == StatusConsultaEnum.INICIADO);
        },
        error: () => (this.carregandoInformacoesConsulta = false),
      });
  }

  private mesmaData(data: Date | string): boolean {
    const dataConsulta = new Date(data);
    const dataAtual = new Date();

    return (
      dataConsulta.getDate() === dataAtual.getDate() &&
      dataConsulta.getMonth() === dataAtual.getMonth() &&
      dataConsulta.getFullYear() === dataAtual.getFullYear()
    );
  }

  public get getTextoBtn(): string {
    if (this.informacoesConsulta == null) return '';
    const status = this.informacoesConsulta.status;
    if (status == StatusConsultaEnum.APROVADA) return 'Iniciar Consulta';
    if (status == StatusConsultaEnum.INICIADO) return 'Finalizar Consulta';
    return 'Nenhuma Ação para a Consulta';
  }

  public get getTipoBtn(): ButtonSeverity {
    if (this.informacoesConsulta == null) return 'info';
    const status = this.informacoesConsulta.status;
    if (status == StatusConsultaEnum.APROVADA) return 'success';
    if (status == StatusConsultaEnum.INICIADO) return 'danger';
    return 'info';
  }

  public get getImagemPet(): string {
    if (this.informacoesConsulta == null) return '';
    const imagem = this.informacoesConsulta.pet.imagem;
    return imagem !== '' && imagem !== null
      ? 'http://localhost:8080/arquivos/' + imagem
      : '';
  }

  public get getImagemCliente(): string {
    if (this.informacoesConsulta == null) return '';
    const imagem = this.informacoesConsulta.cliente.imagem;
    return imagem !== '' && imagem !== null
      ? 'http://localhost:8080/arquivos/' + imagem
      : '';
  }

  public iniciarOuFinalizarConsulta(): void {
    if (!this.informacoesConsulta || !this.idConsultaSelecionada) return;
    if (this.informacoesConsulta.status == StatusConsultaEnum.APROVADA) {
      this.service.iniciarConsulta(this.idConsultaSelecionada).subscribe({
        next: () => {
          this.toast.add({
            severity: 'success',
            summary: 'Iniciada',
            detail: 'A consulta foi iniciada!',
          });
          this.buscarInformacoesConsultaSelecionada();
        },
      });
    } else {
      this.visibilidadeFinalizarConsulta = true;
      this.resumoConsulta = "";
    }
  }

  public enviarFinalizarConsulta(): void {
    if (!this.idConsultaSelecionada || this.resumoConsulta.trim().length == 0) return;
    this.service
      .finalizarConsulta(this.idConsultaSelecionada, this.resumoConsulta)
      .subscribe({
        next: () => {
          this.toast.add({
            severity: 'success',
            summary: 'Finalizada',
            detail: 'A consulta foi finalizada!',
          });
          this.buscarInformacoesConsultaSelecionada();
        },
      });
  }
}
