import { Component, inject, OnInit } from '@angular/core';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import { ActivatedRoute } from '@angular/router';
import type { InformacoesConsultaSelecionadaDto } from './model/InformacoesConsultaSelecionadaDto';
import { StatusConsultaEnum } from '../../../../../../shared/models/enums/StatusConsultaEnum';
import { GeneroEnum } from '../../../../../../shared/models/enums/GeneroEnum';
import { TipoAnimalEnum } from '../../../../../../shared/models/enums/TipoAnimalEnum';
import { GeneroBag } from '../../../../../../shared/components/genero-bag/genero-bag';
import { TipoPetBag } from '../../../../../../shared/components/tipo-pet-bag/tipo-pet-bag';
import { Imagem } from '../../../../../../shared/components/imagem/imagem';
import { RatingModule } from "primeng/rating";
import { BagStatusConsulta } from "../../../../../../shared/components/bag-status-consulta/bag-status-consulta";

@Component({
  selector: 'app-detalhes-consulta',
  imports: [PrimeNGModule, GeneroBag, TipoPetBag, Imagem, RatingModule, BagStatusConsulta],
  templateUrl: './detalhes-consulta.html',
  styleUrl: './detalhes-consulta.scss',
})
export class DetalhesConsulta implements OnInit {
  private readonly router = inject(ActivatedRoute);

  public informacoesConsulta: InformacoesConsultaSelecionadaDto | null = null;
  private idConsultaSelecionada: number | null = null;
  public carregandoInformacoesConsulta = true;

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
    this.informacoesConsulta = {
      id: 0,
      pet: {
        id: 0,
        imagem: null,
        nome: 'Thor',
        genero: GeneroEnum.MASCULINO,
        tipo: TipoAnimalEnum.CACHORRO,
        raca: 'Cão Coxinha',
        dataNascimento: new Date(),
        registradoEm: new Date(),
        problemasSaude: '',
      },
      cliente: {
        id: 0,
        genero: GeneroEnum.MASCULINO,
        nome: 'Cliente teste',
        email: 'cteste@gmail.com',
        telefone: '128182812',
        cpf: '1281721829',
        imagem: null,
      },
      avaliacao: {
        pontuacao: 4,
        observacoes: 'Muito bom doutor!',
      },
      atendente: 'Miguel de Souza',
      tipo: 'Checkup Geral',
      observacoes: '',
      status: StatusConsultaEnum.APROVADA,
      dataSolicitacao: new Date(),
      dataDeferimento: new Date(),
      dataConsulta: new Date(),
      dataFinalizacao: new Date(),
    };
    this.carregandoInformacoesConsulta = false;
  }

  public get getTextoBtn(): string {
    if (this.informacoesConsulta == null) return "";
    const status = this.informacoesConsulta.status;
    if (status == StatusConsultaEnum.APROVADA) return "Iniciar Consulta";
    if (status == StatusConsultaEnum.INICIADO) return "Finalizar Consulta";
    return "Nenhuma Ação para a Consulta";
  }

  public get getImagemPet(): string {
    if (this.informacoesConsulta == null) return '';
    const imagem = this.informacoesConsulta.pet.imagem;
    return (imagem !== '' && imagem !== null)
      ? 'http://localhost:8080/arquivos/usuario/' + imagem
      : '';
  }

  public get getImagemCliente(): string {
    if (this.informacoesConsulta == null) return '';
    const imagem = this.informacoesConsulta.cliente.imagem;
    return (imagem !== '' && imagem !== null)
      ? 'http://localhost:8080/arquivos/usuario/' + imagem
      : '';
  }
}
