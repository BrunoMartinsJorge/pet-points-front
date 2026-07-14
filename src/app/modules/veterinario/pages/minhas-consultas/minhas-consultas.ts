import { Component, inject } from '@angular/core';
import type { OnInit } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { MinhasConsultasService } from './service/minhas-consultas-service';
import { StatusConsultaEnum } from '../../../../shared/models/enums/StatusConsultaEnum';
import { BagStatusConsulta } from '../../../../shared/components/bag-status-consulta/bag-status-consulta';
import { GeneroEnum } from '../../../../shared/models/enums/GeneroEnum';
import { TipoAnimalEnum } from '../../../../shared/models/enums/TipoAnimalEnum';
import { GeneroBag } from '../../../../shared/components/genero-bag/genero-bag';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-minhas-consultas',
  imports: [PrimeNGModule, BagStatusConsulta, GeneroBag],
  templateUrl: './minhas-consultas.html',
  styleUrl: './minhas-consultas.scss',
})
export class MinhasConsultas implements OnInit {
  private readonly service = inject(MinhasConsultasService);
  private readonly confirmService = inject(ConfirmationService);

  public consultasDoDia = [
    {
      id: 0,
      pet: 'Bob',
      cliente: 'Jão Felipe',
      status: StatusConsultaEnum.APROVADA,
      data: new Date(),
      imagemCliente: '',
      observacoes: 'Exame para tal coisa',
      tipo: 'Checkup Geral',
    },
    {
      id: 0,
      pet: 'Mel',
      cliente: 'Felipe João',
      status: StatusConsultaEnum.INICIADO,
      data: new Date(),
      imagemCliente: '',
      observacoes: 'Exame para outra tal coisa',
      tipo: 'Cirurgia',
    },
  ];

  // public consultaAtual = null;
  public consultaAtual = {
    id: 0,
    pet: {
      nome: 'Bob',
      genero: GeneroEnum.MASCULINO,
      tipo: TipoAnimalEnum.PEIXE,
      raca: 'Beta',
      idade: '1 ano',
      nomeTutor: 'Jão Miguel',
    },
    status: StatusConsultaEnum.APROVADA,
    data: new Date(),
    imagemCliente: '',
    observacoes: 'Exame para tal coisa',
    tipo: 'Checkup Geral',
    iniciadoEm: new Date(),
    finalizadoEm: null,
  };

  public historicoConsultas = [
    {
      id: 0,
      pet: 'Bob',
      cliente: 'Jão Felipe',
      status: StatusConsultaEnum.APROVADA,
      data: new Date(),
      imagemCliente: '',
      observacoes: 'Exame para tal coisa',
      tipo: 'Checkup Geral',
    },
    {
      id: 0,
      pet: 'Bob',
      cliente: 'Jão Felipe',
      status: StatusConsultaEnum.APROVADA,
      data: new Date(),
      imagemCliente: '',
      observacoes: 'Exame para tal coisa',
      tipo: 'Checkup Geral',
    },
    {
      id: 0,
      pet: 'Bob',
      cliente: 'Jão Felipe',
      status: StatusConsultaEnum.APROVADA,
      data: new Date(),
      imagemCliente: '',
      observacoes: 'Exame para tal coisa',
      tipo: 'Checkup Geral',
    },
    {
      id: 0,
      pet: 'Bob',
      cliente: 'Jão Felipe',
      status: StatusConsultaEnum.APROVADA,
      data: new Date(),
      imagemCliente: '',
      observacoes: 'Exame para tal coisa',
      tipo: 'Checkup Geral',
    },
  ];

  public ngOnInit(): void {
    // t
  }

  public finalizarConsulta(): void {
    this.confirmService.confirm({
      header: 'Finalizar Consulta',
      rejectButtonProps: {
        label: 'Manter',
        icon: 'pi pi-times',
        variant: 'outlined',
        severity: 'info',
        size: 'small',
      },
      acceptButtonProps: {
        label: 'Finalizar',
        icon: 'pi pi-check',
        severity: 'danger',
        size: 'small',
      },
    });
  }
}
