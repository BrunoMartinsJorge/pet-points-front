import type { Routes } from '@angular/router';
import { ROTAS_CLIENTES } from './modules/cliente/cliente.route';
import { Autenticacao } from './modules/autenticacao/autenticacao';
import { ROTAS_GERENTE } from './modules/gerente/gerente.routes';
import { ROTAS_ESTOQUISTAS } from './modules/estoquista/estoquista.routes';

export const routes: Routes = [
    ...ROTAS_CLIENTES,
    ...ROTAS_GERENTE,
    ...ROTAS_ESTOQUISTAS,
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
