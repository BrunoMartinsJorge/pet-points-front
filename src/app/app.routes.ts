import type { Routes } from '@angular/router';
import { ROTAS_CLIENTES } from './features/cliente/cliente.route';
import { Autenticacao } from './features/autenticacao/autenticacao';

export const routes: Routes = [
    ...ROTAS_CLIENTES,
    {
        path: 'autenticacao',
        component: Autenticacao,
        title: 'Autenticação de Usuário'
    },
    {
        path: '',
        redirectTo: '/autenticacao',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/autenticacao',
        pathMatch: 'full'
    },
];
