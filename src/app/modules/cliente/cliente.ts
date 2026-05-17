import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderPagina } from "../../shared/components/header-pagina/header-pagina";
import { Sidebar } from "../../shared/components/sidebar/sidebar";
import { PrimeNGModule } from '../../shared/modules/prime-ng/prime-ng-module';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cliente',
  imports: [RouterOutlet, HeaderPagina, Sidebar, PrimeNGModule],
  providers: [MessageService],
  templateUrl: './cliente.html',
  styleUrl: './cliente.scss',
})
export class Cliente {

}
