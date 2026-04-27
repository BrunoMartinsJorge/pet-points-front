import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { PrimeNGModule } from '../../../../shared/modules/prime-ng/prime-ng-module';
import { ConsultasClinicaService } from './service/consultas-clinica-service';
import type { ConsultaClinicaDto } from './model/ConsultaClinicaDto';
import type { TiposConsultaDto } from './model/TiposConsultaDto';
import type { OpcoesFiltro } from './model/OpcoesFiltro';
import { BagStatusConsulta } from '../../../../shared/components/bag-status-consulta/bag-status-consulta';
import { Router } from '@angular/router';
import type { DetalhesTipoConsultaDto } from './model/DetalhesTipoConsultaDto';
import { TabsModule } from 'primeng/tabs';
import type { TipoConsultaForm } from './form/TipoConsultaForm';
import { MessageService } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';
import type { VeterinarioEspecializacoesDto } from './model/VeterinarioEspecializacoesDto';
import type { FiltroConsultaForm } from './form/FiltroConsultaForm';

@Component({
  selector: 'app-consultas-clinica',
  imports: [PrimeNGModule, BagStatusConsulta, TabsModule, AccordionModule],
  templateUrl: './consultas-clinica.html',
  styleUrl: './consultas-clinica.scss',
})
export class ConsultasClinica implements OnInit {
  private readonly service = inject(ConsultasClinicaService);
  private readonly router = inject(Router);
  private readonly toast = inject(MessageService);

  public carregandoConsultas = false;
  public carregandoTiposConsultas = false;
  public carregandoRelatorio = false;

  private consultas: ConsultaClinicaDto[] = [];
  public consultasFiltradas: ConsultaClinicaDto[] = [];
  public tiposConsultas: TiposConsultaDto[] = [];
  public tiposConsultasFiltros: OpcoesFiltro[] = [];
  public clientesFiltros: OpcoesFiltro[] = [];
  public veterinariosFiltros: OpcoesFiltro[] = [];
  public veterinariosAdicionar: VeterinarioEspecializacoesDto[] = [];
  public detalhesTipoConsulta: DetalhesTipoConsultaDto =
    {} as DetalhesTipoConsultaDto;
  public idTipoConsultaSelecionado: number | null = null;
  public valoresEdicao: TipoConsultaForm = {
    nome: '',
    descricao: '',
    valor: 0.0,
  };

  public filtros = {
    cliente: null as number | null,
    veterinario: null as number | null,
    tipoConsulta: null as number | null,
  };

  public visibilidadeDialogDetalhesTipoConsulta = false;
  public edicaoHabilitadaTipoConsulta = false;

  ngOnInit(): void {
    this.buscarConsultas();
  }

  private buscarConsultas(): void {
    this.carregandoConsultas = true;
    this.consultas = [];
    this.consultasFiltradas = [];
    this.service.listarConsultas().subscribe({
      next: (response: ConsultaClinicaDto[]) => {
        this.consultas = response;
        this.consultasFiltradas = response;
        this.carregandoConsultas = false;
        this.buscarTiposConsulta();
        this.buscarClientesFiltros();
        this.buscarVeterinariosFiltros();
        this.buscarTiposConsultaFiltros();
      },
    });
  }

  private buscarTiposConsulta(): void {
    this.carregandoTiposConsultas = true;
    this.tiposConsultas = [];
    this.service.listarTiposConsulta().subscribe({
      next: (response: TiposConsultaDto[]) => {
        this.tiposConsultas = response;
        this.carregandoTiposConsultas = false;
      },
    });
  }

  private buscarClientesFiltros(): void {
    this.clientesFiltros = [];
    this.service.listarClientesFiltros().subscribe({
      next: (response: OpcoesFiltro[]) => {
        this.clientesFiltros = response;
        this.clientesFiltros.unshift({ label: 'Todos', value: null });
      },
    });
  }

  private buscarVeterinariosFiltros(): void {
    this.veterinariosFiltros = [];
    this.service.listarVeterinariosFiltros().subscribe({
      next: (response: OpcoesFiltro[]) => {
        this.veterinariosFiltros = response;
        this.veterinariosFiltros.unshift({ label: 'Todos', value: null });
      },
    });
  }

  private buscarTiposConsultaFiltros(): void {
    this.tiposConsultasFiltros = [];
    this.service.listarTiposConsultaFiltros().subscribe({
      next: (response: OpcoesFiltro[]) => {
        this.tiposConsultasFiltros = response;
        this.tiposConsultasFiltros.unshift({ label: 'Todos', value: null });
      },
    });
  }

  public filtrarConsultas(): void {
    let consultas = this.consultas;
    if (this.filtros.cliente !== null) {
      consultas = consultas.filter((consulta) => {
        return consulta.cliente.id === this.filtros.cliente;
      });
    }
    if (this.filtros.veterinario !== null) {
      consultas = consultas.filter((consulta) => {
        return consulta.veterinario.id === this.filtros.veterinario;
      });
    }
    if (this.filtros.tipoConsulta !== null) {
      consultas = consultas.filter((consulta) => {
        return consulta.tipo.id === this.filtros.tipoConsulta;
      });
    }
    this.consultasFiltradas = consultas;
  }

  public limparFiltros(): void {
    this.filtros = { cliente: null, veterinario: null, tipoConsulta: null };
    this.filtrarConsultas();
  }

  public gerarRelatorio(): void {
    this.carregandoRelatorio = true;
    const form: FiltroConsultaForm = {
      idCliente: this.filtros.cliente,
      idVeterinario: this.filtros.veterinario,
      idTipoConsulta: this.filtros.tipoConsulta,
    };
    this.service.gerarRelatorioConsultas(form).subscribe({
      next: (response: Blob) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      },
      complete: () => {
        this.carregandoRelatorio = false;
      }
    });
  }

  public alterarEdicao(): void {
    this.edicaoHabilitadaTipoConsulta = !this.edicaoHabilitadaTipoConsulta;
    if (!this.edicaoHabilitadaTipoConsulta) {
      this.valoresEdicao.nome = this.detalhesTipoConsulta.nome;
      this.valoresEdicao.descricao = this.detalhesTipoConsulta.descricao;
      this.valoresEdicao.valor = this.detalhesTipoConsulta.valor;
    }
  }

  public verDetalhesConsulta(idConsulta: number): void {
    this.router.navigate(['gerente/detalhes-consulta', idConsulta]);
  }

  public verDetalhesTipoConsulta(idTipoConsulta: number): void {
    this.idTipoConsultaSelecionado = idTipoConsulta;
    this.service.buscarDetalhesTipoConsulta(idTipoConsulta).subscribe({
      next: (response: DetalhesTipoConsultaDto) => {
        this.detalhesTipoConsulta = response;
        this.visibilidadeDialogDetalhesTipoConsulta = true;
        this.limparEdicao();
        this.buscarVeterinariosParaAdicionar();
      },
    });
  }

  public buscarVeterinariosParaAdicionar(): void {
    if (!this.idTipoConsultaSelecionado) return;
    this.service
      .buscarVeterinariosAdicionar(this.idTipoConsultaSelecionado)
      .subscribe({
        next: (response: VeterinarioEspecializacoesDto[]) => {
          this.veterinariosAdicionar = response;
        },
      });
  }

  public editarInformacoesTipoConsulta(): void {
    if (!this.idTipoConsultaSelecionado) return;
    this.service
      .editarInformacoesTipoConsulta(
        this.valoresEdicao,
        this.idTipoConsultaSelecionado,
      )
      .subscribe({
        next: () => {
          this.edicaoHabilitadaTipoConsulta = false;
          this.toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Tipo de consulta editado com sucesso!',
          });
          this.detalhesTipoConsulta.nome = this.valoresEdicao.nome;
          this.detalhesTipoConsulta.descricao = this.valoresEdicao.descricao;
          this.detalhesTipoConsulta.valor = this.valoresEdicao.valor;
        },
      });
  }

  public adicionarVeterinarioTipoConsulta(idVeterinario: number): void {
    if (!this.idTipoConsultaSelecionado) return;
    this.service
      .adicionarNovoVeterinarioTipoConsulta(
        idVeterinario,
        this.idTipoConsultaSelecionado,
      )
      .subscribe({
        next: () => {
          this.toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Veterinário adicionado ao tipo de consulta com sucesso!',
          });
          if (this.idTipoConsultaSelecionado)
            this.verDetalhesTipoConsulta(this.idTipoConsultaSelecionado);
        },
      });
  }

  public limparEdicao(): void {
    this.valoresEdicao = {
      nome: this.detalhesTipoConsulta.nome,
      descricao: this.detalhesTipoConsulta.descricao,
      valor: this.detalhesTipoConsulta.valor,
    };
  }
}
