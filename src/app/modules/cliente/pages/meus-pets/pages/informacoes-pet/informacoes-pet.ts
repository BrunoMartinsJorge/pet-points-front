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
import { BagStatusConsulta } from '../../../../../../shared/components/bag-status-consulta/bag-status-consulta';
import type { MinhasConsultasDto } from '../../../minhas-consultas/models/MinhasConsultasDto';
import { MinhasConsultasService } from '../../../minhas-consultas/services/minhas-consultas-service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import type { FileSelectEvent } from 'primeng/fileupload';
import type { EditarPetForm } from '../../models/form/EditarPetForm';
import type { PetPodeSerDeletadoDto } from '../../models/PetPodeSerDeletadoDto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-informacoes-pet',
  imports: [
    PrimeNGModule,
    TipoPetBag,
    GeneroBag,
    DialogModule,
    BagStatusConsulta,
  ],
  providers: [MessageService],
  templateUrl: './informacoes-pet.html',
  styleUrl: './informacoes-pet.scss',
})
export class InformacoesPet implements OnInit {
  public petSelecionado: PetDetalhesDto | undefined = undefined;
  public petsRelacionados: PetSemelhantesDto[] = [];
  public consultasPet: MinhasConsultasDto[] = [];
  public htmlCarteirinha = '';
  private idPetSelecionado = 0;

  public petDesativar: PetPodeSerDeletadoDto | undefined = undefined;

  public visibilidadeDialogEditarPet = false;
  public visibilidadeDialogDesativarPet = false;
  public visibilidadeDialogCarteirinha = false;

  public formularioEdicao!: FormGroup;

  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(MeusPetsService);
  private readonly consultasService = inject(MinhasConsultasService);
  private readonly router = inject(Router);
  private readonly toast = inject(MessageService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idPetSelecionado = Number(params.get('petId') || 0);
      this.buscarPetSelecionado();
      this.buscarConsultasPet();
    });
  }

  public alterarVisibilidadeDialogEditarPet(): void {
    this.visibilidadeDialogEditarPet = !this.visibilidadeDialogEditarPet;
    this.gerarFormularioEdicao();
  }

  public alterarVisibilidadeDialogDesativarPet(): void {
    this.visibilidadeDialogDesativarPet = !this.visibilidadeDialogDesativarPet;
    this.verificarPetDesativar();
  }

  private verificarPetDesativar(): void {
    if (!this.idPetSelecionado) return;
    this.petDesativar = undefined;
    this.service
      .verificarPetPodeSerDesabilitado(this.idPetSelecionado)
      .subscribe({
        next: (response: PetPodeSerDeletadoDto) => {
          this.petDesativar = response;
        },
      });
  }

  private gerarFormularioEdicao(): void {
    if (this.petSelecionado == null) return;
    this.formularioEdicao = new FormGroup({
      nome: new FormControl(this.petSelecionado.nome || '', [
        Validators.required,
      ]),
      raca: new FormControl(this.petSelecionado.raca || '', [
        Validators.required,
      ]),
      sexo: new FormControl(this.petSelecionado.genero || '', [
        Validators.required,
      ]),
      tipo: new FormControl(this.petSelecionado.tipo || '', [
        Validators.required,
      ]),
      dataNascimento: new FormControl(
        this.petSelecionado.dataNascimento || '',
        [Validators.required],
      ),
      observacoes: new FormControl(this.petSelecionado.observacoes || ''),
      foto: new FormControl(this.petSelecionado.imagem || null),
    });
  }

  public carregarArquivo(event: FileSelectEvent): void {
    const file = event.files[0];
    if (file) this.formularioEdicao.get('foto')?.setValue(file);
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
    this.htmlCarteirinha = '';
    this.service
      .verCarteirinha(this.idPetSelecionado)
      .subscribe((res: string) => {
        this.htmlCarteirinha = res;
        this.visibilidadeDialogCarteirinha = true;
      });
  }

  public baixarCarteirinha(): void {
    this.service.baixarCarteirinha(this.idPetSelecionado).subscribe({
      next: (response: Blob) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      },
    });
  }

  private buscarConsultasPet(): void {
    this.consultasPet = [];
    this.service.buscarConsultasPet(this.idPetSelecionado).subscribe({
      next: (response: MinhasConsultasDto[]) => {
        this.consultasPet = response;
      },
    });
  }

  public getUrlImagem(pet: PetDetalhesDto | PetSemelhantesDto): string {
    let id = null;
    if ('arquivo' in pet) {
      if (pet.arquivo == null) return '';
      id = pet.id;
    } else {
      if (pet.imagem == null) return '';
      id = this.idPetSelecionado;
    }
    return 'http://localhost:8080/cliente/meus-pets/imagem/' + id;
  }

  public acessarConsulta(consulta: MinhasConsultasDto): void {
    this.consultasService.consultaSelecionada = consulta;
    this.consultasService.idConsultaSelecionada = consulta.id;
    this.consultasService.acessoPorPetSelecionado = true;
    this.router.navigate([`/cliente/minhas-consultas`]);
  }

  private converterParaDate(data: string | Date): Date {
    if (data instanceof Date) {
      return data;
    }

    const dataConvertida = new Date(data);

    if (isNaN(dataConvertida.getTime())) {
      return new Date();
    }

    return dataConvertida;
  }

  public salvarEdicao(): void {
    if (this.formularioEdicao.invalid) return;
    const values = this.formularioEdicao.value;
    const form: EditarPetForm = {
      nome: values.nome,
      raca: values.raca,
      genero: values.sexo,
      tipo: values.tipo,
      observacoes: values.observacoes,
      dataNascimento: this.converterParaDate(values.dataNascimento),
    };
    this.service.editarPet(this.idPetSelecionado, form, values.foto).subscribe({
      next: () => {
        this.buscarPetSelecionado();
        this.alterarVisibilidadeDialogEditarPet();
      },
    });
  }

  public desativarPet(): void {
    if (!this.idPetSelecionado) return;
    this.service.desativarPet(this.idPetSelecionado).subscribe({
      next: () => {
        this.toast.add({
          severity: 'info',
          summary: 'Sucesso',
          detail: 'Pet desativado com sucesso!',
        });
        this.buscarPetSelecionado();
        this.alterarVisibilidadeDialogDesativarPet();
      },
    });
  }
}
