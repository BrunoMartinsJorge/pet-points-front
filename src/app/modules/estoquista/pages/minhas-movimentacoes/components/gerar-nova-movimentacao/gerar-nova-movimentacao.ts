import type { OnInit } from '@angular/core';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import type { ProdutoFiltroDto } from '../../model/ProdutoFiltroDto';
import { MinhasMovimentacoesService } from '../../service/minhas-movimentacoes-service';
import { MessageService } from 'primeng/api';
import type { NovaMovimentacaoForm } from '../../form/NovaMovimentacaoForm';

@Component({
  selector: 'app-gerar-nova-movimentacao',
  imports: [ReactiveFormsModule, FormsModule, PrimeNGModule],
  templateUrl: './gerar-nova-movimentacao.html',
  styleUrl: './gerar-nova-movimentacao.scss',
  providers: [MessageService],
})
export class GerarNovaMovimentacao implements OnInit {
  @Input() public visibilidade = false;
  @Output() public fechar: EventEmitter<void> = new EventEmitter<void>();
  
  private toast = inject(MessageService);
  public produtos: ProdutoFiltroDto[] = [];
  public formulario: FormGroup = this.inicializarFormulario();
  private readonly service = inject(MinhasMovimentacoesService);

  ngOnInit(): void {
    this.buscarProdutos();
  }

  public fecharDialog(): void {
    this.formulario.reset();
    this.fechar.emit();
  }

  private inicializarFormulario(): FormGroup {
    return new FormGroup({
      tipoMovimentacao: new FormControl('', Validators.required),
      idProduto: new FormControl(null, Validators.required),
      quantidade: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
  }

  private buscarProdutos(): void {
    this.produtos = [];
    this.service.buscarProdutosParaFiltro().subscribe({
      next: (response) => {
        this.produtos = response;
      }
    });
  }

  public salvarMovimentacao(): void {
    if (this.formulario.invalid)
      return;
    const payload: NovaMovimentacaoForm = {
      tipoMovimentacao: this.formulario.value.tipoMovimentacao,
      idProduto: this.formulario.value.idProduto,
      quantidadeMovimentada: this.formulario.value.quantidade,
    };
    this.service.registrarNovaMovimentacao(payload).subscribe({
      next: () => {
        this.toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Movimentação registrada com sucesso!' });
        setTimeout(() => {
          this.fecharDialog();
        }, 2000);
      },
    });
  }
}
