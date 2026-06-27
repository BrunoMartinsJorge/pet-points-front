import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { MinhasConsultasService } from './services/minhas-consultas-service';
import { StepperModule } from 'primeng/stepper';
import type { TiposConsultaDto } from './models/TiposConsultaDto';
import type { VeterinarioTipoConsultaDto } from './models/VeterinarioTipoConsultaDto';
import type { DiaConsultasVeterinarioDto } from './models/DiaConsultasVeterinarioDto';
import type { OptionSelect } from '../../../../shared/models/OptionSelect';
import type { SolicitacaoConsultaForm } from './form/SolicitacaoConsultaForm';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BagStatusConsulta } from '../../../../shared/components/bag-status-consulta/bag-status-consulta';
import type { MinhasConsultasDto } from './models/MinhasConsultasDto';
import type { DetalhesConsultaSelecionadaDto } from './models/DetalhesConsultaSelecionadaDto';
import type { CancelarConsultaForm } from './form/CancelarConsultaForm';
import type { PagamentoDto } from './models/PagamentoDto';
import { TipoPagamentoEnum } from '../../../../shared/models/enums/TipoPagamentoEnum';
import { TipoPagamentoOpcoes } from '../../../../shared/models/enums/TipoPagamentoEnum';
import { StatusPagamentoEnum } from '../../../../shared/models/enums/StatusPagamentoEnum';
import type { FileSelectEvent } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import type { AvaliacaoConsultaDto } from './models/AvaliacaoConsultaDto';
import type { AvaliacaoConsultaForm } from './form/AvaliacaoConsultaForm';
import { StatusConsultaEnum } from '../../../../shared/models/enums/StatusConsultaEnum';

@Component({
  selector: 'app-minhas-consultas',
  imports: [PrimeNGModule, StepperModule, BagStatusConsulta, RatingModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './minhas-consultas.html',
  styleUrl: './minhas-consultas.scss',
})
export class MinhasConsultas implements OnInit {
  private readonly minhasConsultasService = inject(MinhasConsultasService);
  private readonly toast = inject(MessageService);

  public consultasPendentesConfirmadas: MinhasConsultasDto[] = [];
  public historicoConsultas: MinhasConsultasDto[] = [];
  public consultasPendentes: MinhasConsultasDto[] = [];

  public motivoCancelamento = '';

  public visibilidadeDialogAgendamento = false;
  public visibilidadeDialogDetalhesConsulta = false;
  public cancelandoConsulta = false;

  public tiposConsulta: TiposConsultaDto[] = [];
  public tipoConsultaSelecionado: TiposConsultaDto | null = null;
  public veterinarios: VeterinarioTipoConsultaDto[] = [];
  public veterinarioSelecionado: VeterinarioTipoConsultaDto | null = null;
  public horariosPreenchidos: DiaConsultasVeterinarioDto[] = [];
  public pagamento: PagamentoDto | null = null;

  public readonly dataMinima: Date = new Date();
  public dataConsulta!: Date;
  public horarioConsulta!: string;
  public horariosDisponiveis: string[] = [];
  public pets: OptionSelect[] = [];
  public idPetSelecionado: number | null = null;
  public observacoes = '';
  public formaPagamento: TipoPagamentoEnum = TipoPagamentoEnum.PIX;

  public consultaSelecionada: MinhasConsultasDto | null = null;
  public detalhesConsultaSelecionada: DetalhesConsultaSelecionadaDto | null =
    null;
  private formaPagamentoAtual: TipoPagamentoEnum | null = null;

  public avaliacao = {
    pontuacao: 0,
    observacoes: '',
  };

  public jaAvaliado = false;

  public get getFormaPagamentoAtual(): TipoPagamentoEnum | null {
    return this.formaPagamentoAtual;
  }

  public get consultaPodeSerAvaliada(): boolean {
    if (!this.consultaSelecionada) return false;
    if (
      this.consultaSelecionada.statusConsulta !== StatusConsultaEnum.FINALIZADO
    )
      return false;
    return true;
  }

  public readonly formasPagamento = TipoPagamentoOpcoes;

  ngOnInit(): void {
    this.listarHistoricoConsultas();
    this.listarConsultasPendentes();
    this.listarConsultasPendentesConfirmadasOuIniciadas();
    this.listarTiposConsulta();
    this.buscarPets();
    this.existeConsultaPreSelecionada();
  }

  private existeConsultaPreSelecionada(): void {
    if (!this.minhasConsultasService.acessoPorPetSelecionado) return;

    const consultaPreSelecionada =
      this.minhasConsultasService.consultaSelecionada;

    if (consultaPreSelecionada) {
      this.selecionarConsulta(consultaPreSelecionada);
      this.minhasConsultasService.acessoPorPetSelecionado = false;
      return;
    }

    this.minhasConsultasService.buscarConsultaPorId().subscribe({
      next: (response: MinhasConsultasDto) => {
        if (!response) return;

        this.minhasConsultasService.consultaSelecionada = response;

        this.selecionarConsulta(response);

        this.minhasConsultasService.acessoPorPetSelecionado = false;
      },
    });
  }

  private listarHistoricoConsultas(): void {
    this.historicoConsultas = [];
    this.minhasConsultasService.listarHistoricoConsultas().subscribe({
      next: (response) => {
        this.historicoConsultas = response;
      },
    });
  }

  private listarConsultasPendentes(): void {
    this.consultasPendentes = [];
    this.minhasConsultasService.listarConsultasPendentes().subscribe({
      next: (response) => {
        this.consultasPendentes = response;
      },
    });
  }

  private listarConsultasPendentesConfirmadasOuIniciadas(): void {
    this.consultasPendentesConfirmadas = [];
    this.minhasConsultasService
      .listarConsultasConfirmadasOuIniciadas()
      .subscribe({
        next: (consultas) => {
          this.consultasPendentesConfirmadas = consultas;
        },
      });
  }

  public selecionarConsulta(consulta: MinhasConsultasDto): void {
    this.consultaSelecionada = consulta;
    this.minhasConsultasService.buscarDetalhesConsulta(consulta.id).subscribe({
      next: (detalhes) => {
        this.detalhesConsultaSelecionada = detalhes;
        this.visibilidadeDialogDetalhesConsulta = true;
        this.buscarPagamentoConsultaSelecionada();
        this.buscarAvaliacao();
      },
    });
  }

  private buscarPagamentoConsultaSelecionada(): void {
    if (!this.consultaSelecionada) return;
    this.pagamento = null;
    this.formaPagamentoAtual = null;
    this.minhasConsultasService
      .buscarPagamentoPorConsulta(this.consultaSelecionada.id)
      .subscribe({
        next: (pagamento) => {
          this.pagamento = pagamento;
          this.formaPagamentoAtual = pagamento.forma;
        },
      });
  }

  public selecionarTipoConsulta(tipoConsulta: TiposConsultaDto): void {
    this.tipoConsultaSelecionado = tipoConsulta;
  }

  public selecionarData(data: Date): void {
    this.dataConsulta = data;
    this.gerarHorarios();
  }

  private buscarPets(): void {
    this.pets = [];
    this.minhasConsultasService.buscarPets().subscribe({
      next: (pets) => {
        this.pets = pets;
      },
    });
  }

  public cancelarConsulta(): void {
    if (!this.consultaSelecionada) return;
    if (this.cancelandoConsulta) {
      this.cancelandoConsulta = false;
      this.motivoCancelamento = '';
      return;
    } else {
      this.cancelandoConsulta = true;
    }
  }

  public confirmarCancelamento(): void {
    if (!this.consultaSelecionada) return;
    const form: CancelarConsultaForm = {
      idConsulta: this.consultaSelecionada.id,
      motivoCancelamento: this.motivoCancelamento,
    };
    this.minhasConsultasService.cancelarConsulta(form).subscribe({
      next: () => {
        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Consulta cancelada com sucesso!',
        });
        this.cancelarConsulta();
        this.visibilidadeDialogDetalhesConsulta = false;
        this.listarConsultasPendentesConfirmadasOuIniciadas();
        this.listarConsultasPendentes();
        this.listarHistoricoConsultas();
      },
    });
  }

  public fecharDialogDetalhesConsulta(): void {
    this.consultaSelecionada = null;
    this.detalhesConsultaSelecionada = null;
    this.visibilidadeDialogDetalhesConsulta = false;
    this.motivoCancelamento = '';
    this.cancelandoConsulta = false;
  }

  public get consultaPodeSerCancelada(): boolean {
    const tipos_nao_cancelaveis = [
      'CANCELADO',
      'REPROVADA',
      'EM_ANDAMENTO',
      'FINALIZADO',
    ];
    return this.consultaSelecionada?.statusConsulta &&
      !tipos_nao_cancelaveis.includes(
        this.consultaSelecionada.statusConsulta.toString(),
      )
      ? true
      : false;
  }

  public get possuiMotivosCancelamentoIndeferimento(): boolean {
    if (!this.consultaSelecionada) return false;
    return (
      this.consultaSelecionada.statusConsulta ===
        StatusConsultaEnum.REPROVADA ||
      this.consultaSelecionada.statusConsulta === StatusConsultaEnum.CANCELADO
    );
  }

  public gerarHorarios(): void {
    const base = [
      '08:00',
      '08:30',
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
    ];

    const dia = this.horariosPreenchidos.find((h) =>
      this.mesmoDia(new Date(h.dia), this.dataConsulta),
    );

    const ocupados = dia?.horariosPreenchidos ?? [];

    this.horariosDisponiveis = base.filter((h) => !ocupados.includes(h));
  }

  private mesmoDia(data1: Date, data2: Date): boolean {
    return (
      data1.getDate() === data2.getDate() &&
      data1.getMonth() === data2.getMonth() &&
      data1.getFullYear() === data2.getFullYear()
    );
  }

  private buscarHorariosPreenchidosVeterinario(): void {
    if (!this.veterinarioSelecionado) return;
    this.horariosPreenchidos = [];
    this.minhasConsultasService
      .buscarDiasConsultasVeterinario(this.veterinarioSelecionado.id)
      .subscribe({
        next: (horarios) => {
          this.horariosPreenchidos = horarios;
        },
      });
  }

  public selecionarVeterinario(veterinario: VeterinarioTipoConsultaDto): void {
    this.veterinarioSelecionado = veterinario;
    this.buscarHorariosPreenchidosVeterinario();
  }

  public listarVeterinariosTipoConsulta(): void {
    if (!this.tipoConsultaSelecionado) return;
    this.veterinarios = [];
    this.minhasConsultasService
      .buscarVeterinariosRelacionadosTipoConsulta(
        this.tipoConsultaSelecionado.id,
      )
      .subscribe({
        next: (veterinarios) => {
          this.veterinarios = veterinarios;
        },
      });
  }

  private listarTiposConsulta(): void {
    this.tiposConsulta = [];
    this.minhasConsultasService.buscarTiposConsultasSolcitacao().subscribe({
      next: (tipos) => {
        this.tiposConsulta = tipos;
      },
    });
  }

  private gerarDataHoraConsulta(): string {
    const dataHora = new Date(this.dataConsulta);

    const [hours, minutes] = this.horarioConsulta.split(':').map(Number);

    dataHora.setHours(hours, minutes, 0, 0);

    const ano = dataHora.getFullYear();
    const mes = String(dataHora.getMonth() + 1).padStart(2, '0');
    const dia = String(dataHora.getDate()).padStart(2, '0');

    const hora = String(dataHora.getHours()).padStart(2, '0');
    const minuto = String(dataHora.getMinutes()).padStart(2, '0');

    return `${ano}-${mes}-${dia}T${hora}:${minuto}:00`;
  }

  private limparFormularioSolicitacao(): void {
    this.visibilidadeDialogAgendamento = false;
    this.tipoConsultaSelecionado = null;
    this.veterinarioSelecionado = null;
    this.horarioConsulta = '';
    this.dataConsulta = new Date();
    this.idPetSelecionado = null;
    this.observacoes = '';
    this.formaPagamento = TipoPagamentoEnum.PIX;
  }

  public agendarConsulta(): void {
    const form: SolicitacaoConsultaForm = {
      idPet: this.idPetSelecionado!,
      idVeterinario: this.veterinarioSelecionado!.id,
      idTipoConsulta: this.tipoConsultaSelecionado!.id,
      dataConsulta: this.gerarDataHoraConsulta(),
      observacao: this.observacoes,
      formaPagamento: this.formaPagamento,
    };

    this.minhasConsultasService.agendarConsulta(form).subscribe({
      next: () => {
        this.limparFormularioSolicitacao();
        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Consulta agendada com sucesso!',
        });
        this.listarConsultasPendentesConfirmadasOuIniciadas();
      },
    });
  }

  public get podeAlterarFormaPagamento(): boolean {
    if (!this.pagamento) return false;
    return (
      this.pagamento.status === StatusPagamentoEnum.REPROVADO ||
      this.pagamento.status === StatusPagamentoEnum.PENDENTE
    );
  }

  public novoComprovante: File | null = null;

  public carregarArquivo(event: FileSelectEvent): void {
    const file = event.files[0];
    if (file) this.novoComprovante = file;
  }

  public registrarNovoComprovante(): void {
    if (!this.consultaSelecionada || !this.novoComprovante) return;
    this.minhasConsultasService
      .registrarComprovante(this.consultaSelecionada.id, this.novoComprovante)
      .subscribe({
        next: () => {
          this.toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Comprovante registrado com sucesso!',
          });
        },
      });
  }

  public baixarComprovante(): void {
    if (!this.pagamento) return;
    const comprovante = this.pagamento.comprovante;
    if (comprovante.length === 0) return;
    const byteCharacters = atob(comprovante);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: this.pagamento.tipoArquivo });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  public alterarFormaPagamento(): void {
    if (
      !this.formaPagamentoAtual ||
      !this.pagamento ||
      !this.consultaSelecionada
    )
      return;
    if (this.formaPagamento === this.pagamento.forma || !this.formaPagamento)
      return;
    this.minhasConsultasService
      .alterarFormaPagamentoPorConsulta(
        this.consultaSelecionada.id,
        this.pagamento.forma,
      )
      .subscribe({
        next: () => {
          this.toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Forma de pagamento alterada com sucesso!',
          });
          this.buscarPagamentoConsultaSelecionada();
        },
      });
  }

  public avaliarConsulta(): void {
    if (!this.consultaSelecionada) return;
    const form: AvaliacaoConsultaForm = {
      pontuacao: this.avaliacao.pontuacao,
      observacoes: this.avaliacao.observacoes,
    };
    this.minhasConsultasService
      .enviarAvaliacaoConsulta(form, this.consultaSelecionada.id)
      .subscribe({
        next: () => {
          this.toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Consulta avaliada com sucesso!',
          });
          this.buscarAvaliacao();
        },
      });
  }

  private buscarAvaliacao(): void {
    if (!this.consultaSelecionada) return;
    this.minhasConsultasService
      .buscarAvaliacaoConsulta(this.consultaSelecionada.id)
      .subscribe({
        next: (response: AvaliacaoConsultaDto) => {
          if (response.pontuacao) {
            this.avaliacao.pontuacao = response.pontuacao;
            this.avaliacao.observacoes = response.observacoes;
            this.jaAvaliado = true;
          }
        },
      });
  }
}
