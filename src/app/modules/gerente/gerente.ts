import { Component } from '@angular/core';
import { Sidebar } from "../../shared/components/sidebar/sidebar";
import { HeaderPagina } from "../../shared/components/header-pagina/header-pagina";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-gerente',
  imports: [Sidebar, HeaderPagina, RouterOutlet],
  templateUrl: './gerente.html',
  styleUrl: './gerente.scss',
})
export class Gerente {

}
