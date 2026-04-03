/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import { GeneroEnum } from '../../../../../../shared/models/enums/GeneroEnum';
import { getIconePorTipoPet, PetOpcoes, PetTipoEnum } from '../../../../../../shared/models/PetOpcoes';
import { MeusPetsService } from '../../services/meus-pets-service';
import { MessageService } from 'primeng/api';
import type { NovoPetForm } from '../../models/form/NovoPetForm';

@Component({
  selector: 'app-adicionar-novo-pet',
  imports: [PrimeNGModule, ReactiveFormsModule, FormsModule],
  templateUrl: './adicionar-novo-pet.html',
  styleUrl: './adicionar-novo-pet.scss',
})
export class AdicionarNovoPet {
public petForm!: FormGroup;
  public petOpcoes = PetOpcoes;
  public animateIcon = false;
  public generoOpcoes = [
    { label: 'Feminino', value: GeneroEnum.FEMININO },
    { label: 'Masculino', value: GeneroEnum.MASCULINO },
  ];
  selectedFile: File | null = null;
  uploadStatus = '';
  uuidGerado: string | null = null;
  private readonly service = inject(MeusPetsService);
  private readonly toast = inject(MessageService);

  constructor(
    // private uploadService: ArquivosService
  ) {
    this.gerarFormularioPet();
  }

  public onFileSelected(event: any): void {
    this.selectedFile = event.files[0];
  }

  public trocarTipoPet(): void {
    this.animateIcon = true;
  }

  onUpload(): void {
    if (!this.selectedFile) {
      this.uploadStatus = 'Nenhum arquivo selecionado';
      return;
    }
    // this.uploadService.upload(this.selectedFile).subscribe((uuid) => {
    //     this.petForm.get('imagem')?.setValue(uuid);
    //   }
    // );
  }

  public gerarFormularioPet(): void {
    this.uuidGerado = null;
    this.petForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(2)]),
      tipo: new FormControl(PetTipoEnum.CACHORRO, [Validators.required]),
      raca: new FormControl('', [Validators.required, Validators.minLength(2)]),
      dataNascimento: new FormControl('', [Validators.required]),
      observacoes: new FormControl(''),
      imagem: new FormControl(''),
      sexo: new FormControl(GeneroEnum.FEMININO, [Validators.required]),
    });
  }

  public goToBackPage(): void {
    window.history.back();
  }

  public mudarTipoPetSelecionado(tipo: any): void {
    this.petForm.get('tipo')?.setValue(tipo);
    this.trocarTipoPet();
  }

  public mudarSexoPetSelecionado(sexo: any): void {
    this.petForm.get('sexo')?.setValue(sexo);
  }

  public uploadArquivo(event: any): void {
    const file = event.files[0];
    this.petForm.get('imagem')?.setValue(file);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public get getIconePorTipoPet() {
    return getIconePorTipoPet(this.petForm.get('tipo')?.value);
  }

  public cadastrarPet(): void {
    if (this.petForm.invalid) return;
    const petForm = this.petForm.value;
    const payload: NovoPetForm = {
      nome: petForm.nome,
      tipo: petForm.tipo,
      raca: petForm.raca,
      genero: petForm.sexo,
      dataNascimento: petForm.dataNascimento,
      observacoes: petForm.observacoes,
      imagem: petForm.imagem,
    }
    this.service.cadastrarPet(payload).subscribe({
      next: () => {
        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Pet cadastrado com sucesso',
        });
        this.goToBackPage();
      },
    })
  }
}
