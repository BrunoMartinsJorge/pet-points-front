import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderPagina } from '../../shared/components/header-pagina/header-pagina';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-estoquista',
  imports: [RouterOutlet, HeaderPagina, Sidebar],
  templateUrl: './estoquista.html',
  styleUrl: './estoquista.scss',
})
export class Estoquista {

}
