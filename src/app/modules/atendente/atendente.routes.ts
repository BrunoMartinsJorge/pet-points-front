import type { Routes } from '@angular/router';
import { Atendente } from './atendente';
import { authGuard } from '../../core/guards/auth-guard';
import { DashboardAtendente } from './features/dashboard-atendente/dashboard-atendente';
import { ConsultasClinica } from './features/consultas-clinica/consultas-clinica';
import { Perfil } from '../../shared/pages/perfil/perfil';
import { ChatAtendimento } from './features/chat-atendimento/chat-atendimento';
import { AtendimentoSelecionado } from './features/chat-atendimento/pages/atendimento-selecionado/atendimento-selecionado';
import { ChatInterno } from '../../shared/pages/chat-interno/chat-interno';
import { PetsClinica } from '../../shared/pages/pets-clinica/pets-clinica';
import { ClientesClinica } from '../../shared/pages/clientes-clinica/clientes-clinica';
import { DetalhesClientes } from '../../shared/pages/clientes-clinica/pages/detalhes-clientes/detalhes-clientes';

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
        path: 'atendimentos',
        title: 'Atendimentos',
        component: ChatAtendimento,
        data: {
          RULE: 'ATENDENTE',
          visible: true,
          nome: 'Atendimentos',
          icone: 'fa fa-comments',
          group: 'COMUNICAÇÕES',
          descricao: 'Atendimentos do Atendente',
        },
        canActivate: [authGuard],
      },
      {
        path: 'atendimento-selecionado/:id',
        title: 'Atendimento Aprovado',
        component: AtendimentoSelecionado,
        data: {
          RULE: 'ATENDENTE',
          visible: false,
          nome: 'Atendimentos',
          icone: 'fa fa-comments',
          group: '',
          voltar: true,
          descricao: 'Atendimento Selecionado',
        },
        canActivate: [authGuard],
      },
      {
        path: 'chat-interno',
        title: 'Chat Interno',
        component: ChatInterno,
        data: {
          RULE: 'ATENDENTE',
          visible: true,
          nome: 'Chat Interno',
          icone: 'fa-solid fa-message',
          group: 'COMUNICAÇÕES',
          descricao: 'Chat Interno de Funcionários da Clinica',
        },
        canActivate: [authGuard],
      },
      {
        path: 'clientes-clinica',
        title: 'Clientes',
        component: ClientesClinica,
        data: {
          RULE: 'ATENDENTE',
          visible: true,
          nome: 'Clientes da Clínica',
          icone: 'fa-solid fa-users',
          group: 'CLIENTES E PETS',
          descricao: 'Clientes Registrados na Clínica',
        },
        canActivate: [authGuard],
      },
      {
        path: 'detalhes-clientes/:id',
        title: 'Detalhes Cliente da Clinica',
        component: DetalhesClientes,
        data: {
          RULE: 'ATENDENTE',
          visible: false,
          nome: 'Clientes',
          icone: 'fa fa-users',
          voltar: true,
          group: 'CLÍNICA',
          descricao: 'Clientes Registrados da Clinica',
        },
        canActivate: [authGuard],
      },
      {
        path: 'pets-clinica',
        title: 'Pets',
        component: PetsClinica,
        data: {
          RULE: 'ATENDENTE',
          visible: true,
          nome: 'Pets da Clínica',
          icone: 'fa-solid fa-paw',
          group: 'CLIENTES E PETS',
          descricao: 'Pets Registrados na Clínica',
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
