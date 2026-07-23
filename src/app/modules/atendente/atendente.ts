import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderPagina } from '../../shared/components/header-pagina/header-pagina';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-atendente',
  imports: [Sidebar, HeaderPagina, RouterOutlet],
  templateUrl: './atendente.html',
  styleUrl: './atendente.scss',
})
export class Atendente {

}
