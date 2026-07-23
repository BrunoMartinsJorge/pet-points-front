import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { MessageService } from 'primeng/api';
import type { FileSelectEvent } from 'primeng/fileupload';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import { BagStatusConsulta } from '../../../../../../shared/components/bag-status-consulta/bag-status-consulta';
import { StatusConsultaEnum } from '../../../../../../shared/models/enums/StatusConsultaEnum';
import { StatusPagamentoEnum } from '../../../../../../shared/models/enums/StatusPagamentoEnum';
import { TipoPagamentoEnum, TipoPagamentoOpcoes } from '../../../../../../shared/models/enums/TipoPagamentoEnum';
import { MinhasConsultasService } from '../../services/minhas-consultas-service';
import type { MinhasConsultasDto } from '../../models/MinhasConsultasDto';
import type { DetalhesConsultaSelecionadaDto } from '../../models/DetalhesConsultaSelecionadaDto';
import type { PagamentoDto } from '../../models/PagamentoDto';
import type { AvaliacaoConsultaDto } from '../../models/AvaliacaoConsultaDto';
import type { AvaliacaoConsultaForm } from '../../form/AvaliacaoConsultaForm';

@Component({
  selector: 'app-dialog-detalhes-consulta',
  imports: [PrimeNGModule, FormsModule, RatingModule, BagStatusConsulta],
  templateUrl: './dialog-detalhes-consulta.html',
  styleUrl: './dialog-detalhes-consulta.scss',
})
export class DialogDetalhesConsulta {
  private readonly service = inject(MinhasConsultasService);
  private readonly toast = inject(MessageService);

  @Input() consulta: MinhasConsultasDto | null = null;

  @Input() set visible(value: boolean) {
    this._visible = value;
    if (value) this.aoAbrir();
  }
  get visible(): boolean {
    return this._visible;
  }
  private _visible = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() atualizado = new EventEmitter<void>();

  public readonly formasPagamento = TipoPagamentoOpcoes;

  public detalhes: DetalhesConsultaSelecionadaDto | null = null;
  public pagamento: PagamentoDto | null = null;
  private formaPagamentoAtual: TipoPagamentoEnum | null = null;

  public avaliacao = { pontuacao: 0, observacoes: '' };
  public jaAvaliado = false;

  public novoComprovante: File | null = null;

  public get getFormaPagamentoAtual(): TipoPagamentoEnum | null {
    return this.formaPagamentoAtual;
  }

  public get consultaPodeSerAvaliada(): boolean {
    return this.consulta?.statusConsulta === StatusConsultaEnum.FINALIZADO;
  }

  public get possuiMotivosCancelamentoIndeferimento(): boolean {
    if (!this.consulta) return false;
    return (
      this.consulta.statusConsulta === StatusConsultaEnum.REPROVADA ||
      this.consulta.statusConsulta === StatusConsultaEnum.CANCELADO
    );
  }

  public get podeAlterarFormaPagamento(): boolean {
    if (!this.pagamento) return false;
    return (
      this.pagamento.status === StatusPagamentoEnum.REPROVADO ||
      this.pagamento.status === StatusPagamentoEnum.PENDENTE
    );
  }

  private aoAbrir(): void {
    if (!this.consulta) return;
    this.resetar();
    this.carregarDetalhes();
  }

  private carregarDetalhes(): void {
    if (!this.consulta) return;
    this.service.buscarDetalhesConsulta(this.consulta.id).subscribe({
      next: (detalhes) => {
        this.detalhes = detalhes;
        this.buscarPagamento();
        this.buscarAvaliacao();
      },
    });
  }

  private buscarPagamento(): void {
    if (!this.consulta) return;
    this.pagamento = null;
    this.formaPagamentoAtual = null;
    this.service.buscarPagamentoPorConsulta(this.consulta.id).subscribe({
      next: (pagamento) => {
        this.pagamento = pagamento;
        this.formaPagamentoAtual = pagamento.forma;
      },
    });
  }

  private buscarAvaliacao(): void {
    if (!this.consulta) return;
    this.service.buscarAvaliacaoConsulta(this.consulta.id).subscribe({
      next: (response: AvaliacaoConsultaDto) => {
        if (response.pontuacao) {
          this.avaliacao.pontuacao = response.pontuacao;
          this.avaliacao.observacoes = response.observacoes;
          this.jaAvaliado = true;
        }
      },
    });
  }

  public carregarArquivo(event: FileSelectEvent): void {
    const file = event.files[0];
    if (file) this.novoComprovante = file;
  }

  public registrarNovoComprovante(): void {
    if (!this.consulta || !this.novoComprovante) return;
    this.service
      .registrarComprovante(this.consulta.id, this.novoComprovante)
      .subscribe({
        next: () => {
          this.toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Comprovante registrado com sucesso!',
          });
          this.novoComprovante = null;
          this.buscarPagamento();
          this.atualizado.emit();
        },
      });
  }

  public baixarComprovante(): void {
    if (!this.pagamento || this.pagamento.comprovante.length === 0) return;

    const byteCharacters = atob(this.pagamento.comprovante);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const blob = new Blob([new Uint8Array(byteNumbers)], {
      type: this.pagamento.tipoArquivo,
    });
    window.open(URL.createObjectURL(blob), '_blank');
  }

  public alterarFormaPagamento(): void {
    if (!this.formaPagamentoAtual || !this.pagamento || !this.consulta) return;
    if (this.pagamento.forma === this.formaPagamentoAtual) return;

    this.service
      .alterarFormaPagamentoPorConsulta(this.consulta.id, this.pagamento.forma)
      .subscribe({
        next: () => {
          this.toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Forma de pagamento alterada com sucesso!',
          });
          this.buscarPagamento();
          this.atualizado.emit();
        },
      });
  }

  public avaliarConsulta(): void {
    if (!this.consulta) return;
    const form: AvaliacaoConsultaForm = {
      pontuacao: this.avaliacao.pontuacao,
      observacoes: this.avaliacao.observacoes,
    };
    this.service.enviarAvaliacaoConsulta(form, this.consulta.id).subscribe({
      next: () => {
        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Consulta avaliada com sucesso!',
        });
        this.buscarAvaliacao();
        this.atualizado.emit();
      },
    });
  }

  public onVisibleChange(value: boolean): void {
    this._visible = value;
    this.visibleChange.emit(value);
  }

  public fechar(): void {
    this.resetar();
    this.onVisibleChange(false);
  }

  private resetar(): void {
    this.detalhes = null;
    this.pagamento = null;
    this.formaPagamentoAtual = null;
    this.avaliacao = { pontuacao: 0, observacoes: '' };
    this.jaAvaliado = false;
    this.novoComprovante = null;
  }
}