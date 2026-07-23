import type { Routes } from '@angular/router';
import { ROTAS_CLIENTES } from './modules/cliente/cliente.route';
import { Autenticacao } from './modules/autenticacao/autenticacao';
import { ROTAS_GERENTE } from './modules/gerente/gerente.routes';
import { ROTAS_ESTOQUISTAS } from './modules/estoquista/estoquista.routes';
import { ROTAS_VETERINARIOS } from './modules/veterinario/veterinario.route';
import { ROTAS_ATENDENETES } from './modules/atendente/atendente.routes';

export const routes: Routes = [
    ...ROTAS_CLIENTES,
    ...ROTAS_GERENTE,
    ...ROTAS_VETERINARIOS,
    ...ROTAS_ESTOQUISTAS,
    ...ROTAS_ATENDENETES,
    {
        path: 'autenticacao',
        component: Autenticacao,
        title: 'Autenticação de Usuário'
    },
    {
        path: 'perfil',
        loadComponent: () => import('./shared/pages/perfil/perfil').then(m => m.Perfil),
        title: 'Perfil do Usuário'
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
