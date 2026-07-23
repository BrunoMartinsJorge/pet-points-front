import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderPagina } from '../../shared/components/header-pagina/header-pagina';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-veterinario',
  imports: [Sidebar, HeaderPagina, RouterOutlet],
  templateUrl: './veterinario.html',
  styleUrl: './veterinario.scss',
})
export class Veterinario {

}
