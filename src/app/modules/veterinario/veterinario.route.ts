import type { Routes } from "@angular/router";
import { Veterinario } from "./veterinario";
import { authGuard } from "../../core/guards/auth-guard";
import { DashboardVeterinario } from "./pages/dashboard-veterinario/dashboard-veterinario";

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
      {
        path: 'dashboard-veterinario',
        title: 'Dashboard',
        component: DashboardVeterinario,
        data: {
          RULE: 'VETERINARIO',
          visible: true,
          nome: 'Dashboard',
          icone: 'pi pi-home',
          group: '',
          descricao: 'Dashboard do Veterinário',
        },
        canActivate: [authGuard],
      },
    ],
  },
];