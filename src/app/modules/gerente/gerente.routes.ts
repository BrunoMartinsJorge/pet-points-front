import type { Routes } from '@angular/router';
import { Gerente } from './gerente';
import { authGuard } from '../../core/guards/auth-guard';
import { GerenteDashboard } from './pages/gerente-dashboard/gerente-dashboard';
import { Funcionarios } from './pages/funcionarios/funcionarios';
import { RegistrarFuncionario } from './pages/funcionarios/pages/registrar-funcionario/registrar-funcionario';
import { LogsSistema } from './pages/logs-sistema/logs-sistema';

export const ROTAS_GERENTE: Routes = [
  {
    path: 'gerente',
    component: Gerente,
    data: {
      RULE: 'GERENTE',
      visible: true,
    },
    title: 'Gerente',
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard-gerente',
        title: 'Dashboard',
        component: GerenteDashboard,
        data: {
          RULE: 'GERENTE',
          visible: true,
          nome: 'Dashboard',
          icone: 'pi pi-home',
          group: '',
          descricao: 'Dashboard do Gerente',
        },
        canActivate: [authGuard],
      },
      {
        path: 'funcionarios',
        title: 'Funcionarios',
        component: Funcionarios,
        data: {
          RULE: 'GERENTE',
          visible: true,
          nome: 'Funcionarios',
          icone: 'fa-solid fa-users-cog',
          group: '',
          descricao: 'Funcionarios da Clinica',
        },
        canActivate: [authGuard],
        // children: [
        // ],
      },
      {
        path: 'registrar-funcionario',
        title: 'Registrar Funcionario',
        component: RegistrarFuncionario,
        data: {
          RULE: 'GERENTE',
          visible: false,
          nome: 'Novo Funcionario',
          icone: 'fa-solid fa-users-cog',
          group: '',
          descricao: 'Registrar Novo Funcionário',
          voltar: true,
        },
        canActivate: [authGuard],
      },
      {
        path: 'logs-sistema',
        title: 'Logs',
        component: LogsSistema,
        data: {
          RULE: 'GERENTE',
          visible: true,
          nome: 'Logs do Sistema',
          icone: 'fa-solid fa-folder-open',
          group: '',
          descricao: 'Logs do Sistema',
          voltar: false,
        },
        canActivate: [authGuard],
      },
    ],
  },
];
