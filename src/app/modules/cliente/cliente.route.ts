import type { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';
import { ClienteDashboard } from './pages/cliente-dashboard/cliente-dashboard';
import { Cliente } from './cliente';
import { MeusPets } from './pages/meus-pets/meus-pets';
import { InformacoesPet } from './pages/meus-pets/pages/informacoes-pet/informacoes-pet';
import { AdicionarNovoPet } from './pages/meus-pets/pages/adicionar-novo-pet/adicionar-novo-pet';

export const ROTAS_CLIENTES: Routes = [
  {
    path: 'cliente',
    component: Cliente,
    data: {
      RULE: 'CLIENTE',
      visible: true,
    },
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard-cliente',
        title: 'Dashboard',
        component: ClienteDashboard,
        data: {
          RULE: 'CLIENTE',
          visible: true,
          nome: 'Dashboard',
          icone: 'pi pi-home',
          group: '',
          descricao: 'Dashboard do cliente',
        },
        canActivate: [authGuard],
      },
      {
        path: 'meus-pets',
        title: 'Meus Pets',
        component: MeusPets,
        data: {
          RULE: 'CLIENTE',
          visible: true,
          nome: 'Meus Pets',
          icone: 'fa fa-paw',
          group: '',
          descricao: 'Pets do cliente',
        },
        canActivate: [authGuard],
      },
      {
        path: 'meus-pets/informacoes/:petId',
        title: 'Informações do Pet',
        component: InformacoesPet,
        data: {
          RULE: 'CLIENTE',
          visible: false,
          nome: 'Informações do Pet',
          voltar: true,
          icone: 'pi pi-info-circle',
          group: '',
          descricao: 'Pets do cliente',
        },
        canActivate: [authGuard],
      },
      {
        path: 'meus-pets/novo',
        title: 'Novo Pet',
        component: AdicionarNovoPet,
        data: {
          RULE: 'CLIENTE',
          visible: false,
          nome: 'Adicionar Novo Pet',
          voltar: true,
          icone: 'pi pi-info-circle',
          group: '',
          descricao: 'Adicionar um novo Pet',
        },
        canActivate: [authGuard],
      },
    ],
  },
];
