import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeNGModule } from '../../modules/prime-ng/prime-ng-module';
import type { ConsultasAtendenteVeterinarioDto } from '../../pages/perfil/model/ConsultasAtendenteVeterinarioDto';

type CategoriaConsulta = 'consulta' | 'retorno' | 'exame' | 'cirurgia';

interface DiaCalendario {
  data: Date;
  dia: number;
  noMes: boolean;
  hoje: boolean;
  consultas: ConsultasAtendenteVeterinarioDto[];
}

@Component({
  selector: 'app-agenda-consultas',
  imports: [PrimeNGModule],
  templateUrl: './agenda-consultas.html',
  styleUrl: './agenda-consultas.scss',
})
export class AgendaConsultas {
  @Input() consultas: ConsultasAtendenteVeterinarioDto[] = [];

  /** Emite a data ao clicar no botão de adicionar de um dia sem consultas */
  @Output() adicionar = new EventEmitter<Date>();

  private readonly hoje = new Date();

  /** Primeiro dia do mês atualmente exibido no calendário */
  public referencia = new Date(this.hoje.getFullYear(), this.hoje.getMonth(), 1);

  public readonly diasSemana = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];

  private readonly meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  /**
   * @description Rótulo do mês/ano exibido (ex.: "Junho 2026")
   */
  public get nomeMes(): string {
    return `${this.meses[this.referencia.getMonth()]} ${this.referencia.getFullYear()}`;
  }

  /**
   * @description Matriz de semanas (linhas) com 7 dias cada, iniciando na segunda-feira
   */
  public get semanas(): DiaCalendario[][] {
    const ano = this.referencia.getFullYear();
    const mes = this.referencia.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const offset = (primeiroDia.getDay() + 6) % 7; // segunda-feira como primeiro dia
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
    const totalCelulas = Math.ceil((offset + diasNoMes) / 7) * 7;

    const mapa = this.mapaConsultas();
    const dias: DiaCalendario[] = [];
    for (let i = 0; i < totalCelulas; i++) {
      const data = new Date(ano, mes, 1 - offset + i);
      dias.push({
        data,
        dia: data.getDate(),
        noMes: data.getMonth() === mes,
        hoje: this.mesmaData(data, this.hoje),
        consultas: mapa.get(this.chave(data)) ?? [],
      });
    }

    const semanas: DiaCalendario[][] = [];
    for (let i = 0; i < dias.length; i += 7) semanas.push(dias.slice(i, i + 7));
    return semanas;
  }

  /**
   * @description Vai para o mês anterior
   */
  public mesAnterior(): void {
    this.referencia = new Date(
      this.referencia.getFullYear(),
      this.referencia.getMonth() - 1,
      1,
    );
  }

  /**
   * @description Vai para o próximo mês
   */
  public proximoMes(): void {
    this.referencia = new Date(
      this.referencia.getFullYear(),
      this.referencia.getMonth() + 1,
      1,
    );
  }

  /**
   * @description Consultas exibidas na célula (até 2; se houver mais, exibe só a 1ª)
   */
  public visiveis(dia: DiaCalendario): ConsultasAtendenteVeterinarioDto[] {
    return dia.consultas.length <= 2 ? dia.consultas : dia.consultas.slice(0, 1);
  }

  /**
   * @description Quantidade de consultas ocultas na célula (para o marcador "+N")
   */
  public restante(dia: DiaCalendario): number {
    return dia.consultas.length - this.visiveis(dia).length;
  }

  /**
   * @description Categoria da consulta usada para a cor do chip, inferida pelo tipo
   */
  public categoria(tipo: string): CategoriaConsulta {
    const t = (tipo ?? '').toLowerCase();
    if (t.includes('cirurgia')) return 'cirurgia';
    if (t.includes('exame')) return 'exame';
    if (t.includes('retorno') || t.includes('banho')) return 'retorno';
    return 'consulta';
  }

  /**
   * @description Agrupa as consultas por dia (chave ano-mês-dia)
   */
  private mapaConsultas(): Map<string, ConsultasAtendenteVeterinarioDto[]> {
    const mapa = new Map<string, ConsultasAtendenteVeterinarioDto[]>();
    for (const consulta of this.consultas ?? []) {
      const data = new Date(consulta.dataHoraConsulta);
      if (isNaN(data.getTime())) continue;
      const chave = this.chave(data);
      const lista = mapa.get(chave) ?? [];
      lista.push(consulta);
      mapa.set(chave, lista);
    }
    for (const lista of mapa.values())
      lista.sort(
        (a, b) =>
          new Date(a.dataHoraConsulta).getTime() -
          new Date(b.dataHoraConsulta).getTime(),
      );
    return mapa;
  }

  private chave(data: Date): string {
    return `${data.getFullYear()}-${data.getMonth()}-${data.getDate()}`;
  }

  private mesmaData(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }
}
