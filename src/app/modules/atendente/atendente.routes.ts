import type { Routes } from '@angular/router';
import { Atendente } from './atendente';
import { authGuard } from '../../core/guards/auth-guard';
import { DashboardAtendente } from './features/dashboard-atendente/dashboard-atendente';
import { ConsultasClinica } from './features/consultas-clinica/consultas-clinica';
import { Perfil } from '../../shared/pages/perfil/perfil';

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
      {
        path: 'dashboard-atendente',
        title: 'Dashboard',
        component: DashboardAtendente,
        data: {
          RULE: 'ATENDENTE',
          visible: true,
          nome: 'Dashboard',
          icone: 'pi pi-home',
          group: '',
          descricao: 'Dashboard do Atendente',
        },
        canActivate: [authGuard],
      },
      {
        path: 'consultas-clinica',
        title: 'Consultas',
        component: ConsultasClinica,
        data: {
          RULE: 'ATENDENTE',
          visible: true,
          nome: 'Consultas',
          icone: 'fa fa-clipboard-list',
          group: '',
          descricao: 'Consultas da Clínica',
        },
        canActivate: [authGuard],
      },
      {
        path: 'perfil',
        title: 'Perfil',
        component: Perfil,
        data: {
          RULE: 'ATENDENTE',
          visible: false,
          nome: 'Perfil',
          icone: 'fa fa-user',
          group: '',
          descricao: 'Perfil do Atendente',
        },
        canActivate: [authGuard],
      },
    ],
  },
];
