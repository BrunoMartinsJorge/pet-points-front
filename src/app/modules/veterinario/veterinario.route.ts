import type { Routes } from "@angular/router";
import { Veterinario } from "./veterinario";
import { authGuard } from "../../core/guards/auth-guard";

export const ROTAS_VETERINARIOS: Routes = [
  {
    path: 'veterinario',
    component: Veterinario,
    data: {
      RULE: 'VETERINARIO',
      visible: true,
    },
    title: 'Veterinário',
    canActivate: [authGuard],
    children: [
    //   {
    //     path: 'dashboard-gerente',
    //     title: 'Dashboard',
    //     component: GerenteDashboard,
    //     data: {
    //       RULE: 'GERENTE',
    //       visible: true,
    //       nome: 'Dashboard',
    //       icone: 'pi pi-home',
    //       group: '',
    //       descricao: 'Dashboard do Gerente',
    //     },
    //     canActivate: [authGuard],
    //   },
    ],
  },
];