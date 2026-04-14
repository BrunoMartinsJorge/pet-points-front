import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { EstoqueEstoquistaService } from '../../service/estoque-estoquista-service';
import { ActivatedRoute } from '@angular/router';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import type { DetalhesProdutoDto } from '../../model/DetalhesProdutoDto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes-produto',
  imports: [PrimeNGModule, CommonModule],
  templateUrl: './detalhes-produto.html',
  styleUrl: './detalhes-produto.scss',
})
export class DetalhesProduto implements OnInit {
  private readonly service = inject(EstoqueEstoquistaService);
  private readonly router = inject(ActivatedRoute);
  
  public produto: DetalhesProdutoDto | null = null;
  public carregando = false;

  ngOnInit(): void {
    const idProduto = Number(this.router.snapshot.paramMap.get('idProduto'));
    if (idProduto)
      this.buscarProdutoPorId(idProduto);
  }

  private buscarProdutoPorId(id: number): void {
    this.carregando = true;
    this.produto = null;
    this.service.buscarDetalhesProduto(id).subscribe({
      next: (produto) => {
        this.produto = produto;
      },
      complete: () => (this.carregando = false),
    });
  }
}
