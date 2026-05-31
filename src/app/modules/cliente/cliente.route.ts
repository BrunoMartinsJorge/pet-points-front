import type { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';
import { ClienteDashboard } from './pages/cliente-dashboard/cliente-dashboard';
import { Cliente } from './cliente';
import { MeusPets } from './pages/meus-pets/meus-pets';
import { InformacoesPet } from './pages/meus-pets/pages/informacoes-pet/informacoes-pet';
import { AdicionarNovoPet } from './pages/meus-pets/pages/adicionar-novo-pet/adicionar-novo-pet';
import { MinhasConsultas } from './pages/minhas-consultas/minhas-consultas';
import { MeusAtendimentos } from './pages/meus-atendimentos/meus-atendimentos';
import { MeusPagamentos } from './pages/meus-pagamentos/meus-pagamentos';

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
      {
        path: 'minhas-consultas',
        title: 'Minhas Consultas',
        component: MinhasConsultas,
        data: {
          RULE: 'CLIENTE',
          visible: true,
          nome: 'Minhas Consultas',
          icone: 'pi pi-calendar',
          group: 'CONSULTAS',
          descricao: 'Consultas dos meus Pets',
        },
        canActivate: [authGuard],
      },
      {
        path: 'meus-atendimentos',
        title: 'Meus Atendimentos',
        component: MeusAtendimentos,
        data: {
          RULE: 'CLIENTE',
          visible: true,
          nome: 'Atendimentos',
          icone: 'pi pi-comments',
          group: '',
          descricao: 'Atendimentos do cliente',
        },
        canActivate: [authGuard],
      },
      {
        path: 'meus-pagamentos',
        title: 'Meus Pagamento',
        component: MeusPagamentos,
        data: {
          RULE: 'CLIENTE',
          visible: true,
          nome: 'Pagamentos',
          icone: 'pi pi-credit-card',
          group: 'CONSULTAS',
          descricao: 'Histórico de Pagamentos',
        },
        canActivate: [authGuard],
      },
    ],
  },
];
