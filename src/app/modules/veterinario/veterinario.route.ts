import type { Routes } from '@angular/router';
import { Veterinario } from './veterinario';
import { authGuard } from '../../core/guards/auth-guard';
import { DashboardVeterinario } from './pages/dashboard-veterinario/dashboard-veterinario';
import { Perfil } from '../../shared/pages/perfil/perfil';
import { MinhasConsultas } from './pages/minhas-consultas/minhas-consultas';

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
      {
        path: 'consultas-veterinario',
        title: 'Consultas',
        component: MinhasConsultas,
        data: {
          RULE: 'VETERINARIO',
          visible: true,
          nome: 'Minhas Consultas',
          icone: 'pi pi-clipboard',
          group: '',
          descricao: 'Dashboard do Veterinário',
        },
        canActivate: [authGuard],
      },
      {
        path: 'perfil',
        title: 'Perfil',
        component: Perfil,
        data: {
          RULE: 'VETERINARIO',
          visible: false,
          nome: 'Perfil',
          icone: 'fa fa-user',
          group: '',
          descricao: 'Perfil do Veterinário',
        },
        canActivate: [authGuard],
      },
    ],
  },
];
