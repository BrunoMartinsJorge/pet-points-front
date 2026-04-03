import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderPagina } from "../../shared/components/header-pagina/header-pagina";
import { Sidebar } from "../../shared/components/sidebar/sidebar";

@Component({
  selector: 'app-cliente',
  imports: [RouterOutlet, HeaderPagina, Sidebar],
  templateUrl: './cliente.html',
  styleUrl: './cliente.scss',
})
export class Cliente {

}
