import type { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';
import { ClienteDashboard } from './pages/cliente-dashboard/cliente-dashboard';

export const ROTAS_CLIENTES: Routes = [
  {
    path: 'dashboard-cliente',
    component: ClienteDashboard,
    canActivate: [authGuard],
  },
];
