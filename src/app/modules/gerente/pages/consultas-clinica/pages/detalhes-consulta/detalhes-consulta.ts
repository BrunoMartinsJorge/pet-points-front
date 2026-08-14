import type { OnChanges, SimpleChanges } from '@angular/core';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PrimeNGModule } from '../../../../../../shared/modules/prime-ng/prime-ng-module';
import { ConsultasClinicaService } from '../../service/consultas-clinica-service';
import type { DetalhesConsultaDto } from '../../model/DetalhesConsultaDto';
import type { ParticipantesConsultaDto } from '../../model/ParticipantesConsultaDto';
import { BagStatusConsulta } from '../../../../../../shared/components/bag-status-consulta/bag-status-consulta';

interface ParticipanteConsulta {
  iniciais: string;
  nome: string;
  papel: string;
}

interface EventoConsulta {
  titulo: string;
  data: Date | null;
  detalhe: string | null;
  concluido: boolean;
  /** Último acontecimento registrado — recebe destaque na linha do tempo. */
  atual: boolean;
  /** Liga este marcador ao próximo, formando a linha contínua. */
  conectado: boolean;
}

@Component({
  selector: 'app-detalhes-consulta',
  imports: [PrimeNGModule, BagStatusConsulta],
  templateUrl: './detalhes-consulta.html',
  styleUrl: './detalhes-consulta.scss',
})
export class DetalhesConsulta implements OnChanges {
  @Input() idConsulta: number | null = null;
  @Output() public fechado = new EventEmitter<void>();

  private readonly service = inject(ConsultasClinicaService);

  public visibilidadeDialogDetalhesConsulta = false;
  public detalhesConsulta: DetalhesConsultaDto | null = null;
  public participantes: ParticipanteConsulta[] = [];
  public linhaDoTempo: EventoConsulta[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['idConsulta']) {
      this.buscarDetalhesDaConsulta();
    }
  }

  private buscarDetalhesDaConsulta(): void {
    if (!this.idConsulta) return;
    this.detalhesConsulta = null;
    this.service.buscarDetalhesConsulta(this.idConsulta).subscribe({
      next: (res: DetalhesConsultaDto) => {
        this.detalhesConsulta = res;
        this.participantes = this.montarParticipantes(res);
        this.linhaDoTempo = this.montarLinhaDoTempo(res);
        this.visibilidadeDialogDetalhesConsulta = true;
      },
    });
  }

  public aoFechar(): void {
    this.detalhesConsulta = null;
    this.participantes = [];
    this.linhaDoTempo = [];
    this.fechado.emit();
  }

  private montarParticipantes(
    detalhes: DetalhesConsultaDto,
  ): ParticipanteConsulta[] {
    const papeis: [ParticipantesConsultaDto | null, string][] = [
      [detalhes.cliente, 'Cliente'],
      [detalhes.veterinario, 'Veterinário'],
      [detalhes.atendente, 'Atendente'],
    ];

    return papeis
      .filter(([participante]) => participante != null && participante.nome)
      .map(([participante, papel]) => ({
        iniciais: this.gerarIniciais(participante!.nome),
        nome: participante!.nome,
        papel,
      }));
  }

  /** Iniciais do primeiro e do último nome, como nos avatares do sistema. */
  private gerarIniciais(nome: string): string {
    const partes = nome.trim().split(/\s+/);
    if (partes.length === 0 || partes[0] === '') return '?';
    const primeira = partes[0].charAt(0);
    const ultima =
      partes.length > 1 ? partes[partes.length - 1].charAt(0) : '';
    return (primeira + ultima).toUpperCase();
  }

  private montarLinhaDoTempo(
    detalhes: DetalhesConsultaDto,
  ): EventoConsulta[] {
    const acontecimentos = [
      {
        titulo: 'Solicitada',
        pendente: 'Não solicitada',
        data: detalhes.dataSolicitacao,
        detalhe: null,
        concluido: null,
      },
      {
        titulo: 'Agendada para',
        pendente: 'Não agendada',
        data: detalhes.dataConsulta,
        detalhe: null,
        concluido: null,
      },
      {
        titulo: 'Atendimento',
        pendente: 'Não atendida',
        data: detalhes.dataAtendimento,
        detalhe: null,
        concluido: null,
      },
      {
        titulo: 'Iniciada',
        pendente: 'Não iniciada',
        data: detalhes.dataIniciado,
        detalhe: null,
        concluido: null,
      },
      {
        titulo: 'Finalizada',
        pendente: 'Não finalizada',
        data: detalhes.dataFinalizado,
        detalhe: null,
        concluido: null,
      },
      {
        titulo: 'Cancelada',
        pendente: 'Não cancelada',
        data: detalhes.dataCancelamento,
        detalhe: detalhes.motivoCancelamento,
        concluido: null,
      },
      {
        titulo: 'Indeferida',
        pendente: 'Não indeferida',
        data: null,
        detalhe: detalhes.motivoIndeferimento,
        // O indeferimento não guarda data própria: o motivo é a evidência.
        concluido: this.preenchido(detalhes.motivoIndeferimento),
      },
    ];

    const eventos: EventoConsulta[] = acontecimentos.map((acontecimento) => {
      const concluido = acontecimento.concluido ?? acontecimento.data != null;
      return {
        titulo: concluido ? acontecimento.titulo : acontecimento.pendente,
        data: concluido ? acontecimento.data : null,
        detalhe:
          concluido && this.preenchido(acontecimento.detalhe)
            ? acontecimento.detalhe
            : null,
        concluido,
        atual: false,
        conectado: false,
      };
    });

    const ultimoConcluido = eventos.map((e) => e.concluido).lastIndexOf(true);
    eventos.forEach((evento, indice) => {
      evento.atual = indice === ultimoConcluido;
      evento.conectado = evento.concluido && indice < ultimoConcluido;
    });

    return eventos;
  }

  private preenchido(valor: string | null | undefined): boolean {
    return valor != null && valor.trim().length > 0;
  }
}
