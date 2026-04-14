import type { Routes } from '@angular/router';
import { Estoquista } from './estoquista';
import { authGuard } from '../../core/guards/auth-guard';
import { DashboardEstoquista } from './pages/dashboard-estoquista/dashboard-estoquista';
import { EstoqueEstoquista } from './pages/estoque-estoquista/estoque-estoquista';
import { MinhasMovimentacoes } from './pages/minhas-movimentacoes/minhas-movimentacoes';
import { DetalhesProduto } from './pages/estoque-estoquista/sub-paginas/detalhes-produto/detalhes-produto';

export const ROTAS_ESTOQUISTAS: Routes = [
  {
    path: 'estoquista',
    component: Estoquista,
    data: {
      RULE: 'ESTOQUISTA',
      visible: true,
    },
    title: 'Estoquista',
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard-estoquista',
        title: 'Dashboard',
        component: DashboardEstoquista,
        data: {
          RULE: 'ESTOQUISTA',
          visible: true,
          nome: 'Dashboard',
          icone: 'pi pi-home',
          group: '',
          descricao: 'Dashboard do Estoquista',
        },
        canActivate: [authGuard],
      },
      {
        path: 'estoque-estoquista',
        title: 'Estoque',
        component: EstoqueEstoquista,
        data: {
          RULE: 'ESTOQUISTA',
          visible: true,
          nome: 'Estoque',
          icone: 'pi pi-box',
          group: '',
          descricao: 'Estoque da Clínica',
        },
        canActivate: [authGuard],
      },
      {
        path: 'movimentacoes-estoquista',
        title: 'Movimentações',
        component: MinhasMovimentacoes,
        data: {
          RULE: 'ESTOQUISTA',
          visible: true,
          nome: 'Movimentações',
          icone: 'fa fa-exchange-alt',
          group: '',
          descricao: 'Movimentações do Estoquista',
        },
        canActivate: [authGuard],
      },
      {
        path: 'detalhes-produto/:idProduto',
        title: 'Detalhes do Produto',
        component: DetalhesProduto,
        data: {
          RULE: 'ESTOQUISTA',
          visible: false,
          nome: 'Estoque',
          icone: 'pi pi-box',
          voltar: true,
          group: '',
          descricao: 'Detalhes do Produto',
        },
        canActivate: [authGuard],
      },
    ],
  },
];
