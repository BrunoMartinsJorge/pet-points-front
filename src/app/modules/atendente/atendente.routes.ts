import type { Routes } from '@angular/router';
import { Atendente } from './atendente';
import { authGuard } from '../../core/guards/auth-guard';

export const ROTAS_ATENDENETES: Routes = [
  {
    path: 'atendente',
    component: Atendente,
    data: {
      RULE: 'ATENDENTE',
      visible: true,
    },
    title: 'Atendente',
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
