import type { Routes } from '@angular/router';
import { Gerente } from './gerente';
import { authGuard } from '../../core/guards/auth-guard';
import { GerenteDashboard } from './pages/gerente-dashboard/gerente-dashboard';
import { Funcionarios } from './pages/funcionarios/funcionarios';
import { RegistrarFuncionario } from './pages/funcionarios/pages/registrar-funcionario/registrar-funcionario';
import { LogsSistema } from './pages/logs-sistema/logs-sistema';
import { ProdutosEstoque } from './pages/produtos-estoque/produtos-estoque';
import { MovimentacoesClinica } from './pages/movimentacoes-clinica/movimentacoes-clinica';
import { ClientesClinica } from '../../shared/pages/clientes-clinica/clientes-clinica';
import { PetsClinica } from '../../shared/pages/pets-clinica/pets-clinica';
import { ConsultasClinica } from './pages/consultas-clinica/consultas-clinica';
import { DetalhesClientes } from '../../shared/pages/clientes-clinica/pages/detalhes-clientes/detalhes-clientes';
import { DetalhesPet } from '../../shared/pages/pets-clinica/pages/detalhes-pet/detalhes-pet';
import { ChatInterno } from '../../shared/pages/chat-interno/chat-interno';
import { DetalhesConsulta } from './pages/consultas-clinica/pages/detalhes-consulta/detalhes-consulta';
import { DetalhesFuncionario } from './pages/funcionarios/pages/detalhes-funcionario/detalhes-funcionario';
import { Financeiro } from './pages/financeiro/financeiro';

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
          icone: 'fa fa-home',
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
          group: 'INTERNO',
          descricao: 'Funcionarios da Clinica',
        },
        canActivate: [authGuard],
      },
      {
        path: 'financeiro',
        title: 'Financeiro',
        component: Financeiro,
        data: {
          RULE: 'GERENTE',
          visible: true,
          nome: 'Financeiro',
          icone: 'fa fa-sack-dollar',
          group: 'FINANCEIRO',
          descricao: 'Registros Financeiros da Clinica',
        },
        canActivate: [authGuard],
      },
      {
        path: 'chat-interno',
        title: 'Chat Interno',
        component: ChatInterno,
        data: {
          RULE: 'GERENTE',
          visible: true,
          nome: 'Chat Interno',
          icone: 'fa-solid fa-message',
          group: 'INTERNO',
          descricao: 'Chat Interno de Funcionários da Clinica',
        },
        canActivate: [authGuard],
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
          group: 'INTERNO',
          descricao: 'Registrar Novo Funcionário',
          voltar: true,
        },
        canActivate: [authGuard],
      },
      {
        path: 'detalhes-funcionario/:id',
        title: 'Detalhes do Funcionario',
        component: DetalhesFuncionario,
        data: {
          RULE: 'GERENTE',
          visible: false,
          nome: 'Detalhes Funcionario',
          icone: 'fa-solid fa-users-cog',
          group: 'INTERNO',
          descricao: 'Detalhes do Funcionário Selecionado',
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
          group: 'INTERNO',
          descricao: 'Logs do Sistema',
          voltar: false,
        },
        canActivate: [authGuard],
      },
      {
        path: 'estoque-clinica',
        title: 'Produtos em Estoque',
        component: ProdutosEstoque,
        data: {
          RULE: 'GERENTE',
          visible: true,
          nome: 'Estoque',
          icone: 'fa fa-box',
          group: 'ESTOQUE',
          descricao: 'Produtos em Estoque da Clinica',
        },
        canActivate: [authGuard],
      },
      {
        path: 'movimentacoes-clinica',
        title: 'Movimentações da Clinica',
        component: MovimentacoesClinica,
        data: {
          RULE: 'GERENTE',
          visible: true,
          nome: 'Movimentações',
          icone: 'fa fa-list',
          group: 'ESTOQUE',
          descricao: 'Histórico de Movimentações da Clinica',
        },
        canActivate: [authGuard],
      },
      {
        path: 'clientes-clinica',
        title: 'Clientes da Clinica',
        component: ClientesClinica,
        data: {
          RULE: 'GERENTE',
          visible: true,
          nome: 'Clientes',
          icone: 'fa fa-users',
          group: 'CLÍNICA',
          descricao: 'Clientes Registrados da Clinica',
        },
        canActivate: [authGuard],
      },
      {
        path: 'detalhes-clientes/:id',
        title: 'Detalhes Cliente da Clinica',
        component: DetalhesClientes,
        data: {
          RULE: 'GERENTE',
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
        title: 'Pets da Clinica',
        component: PetsClinica,
        data: {
          RULE: 'GERENTE',
          visible: true,
          nome: 'Pets',
          icone: 'fa fa-paw',
          group: 'CLÍNICA',
          descricao: 'Pets Registrados da Clinica',
        },
        canActivate: [authGuard],
      },
      {
        path: 'consultas-clinica',
        title: 'Consultas da Clinica',
        component: ConsultasClinica,
        data: {
          RULE: 'GERENTE',
          visible: true,
          nome: 'Consultas',
          icone: 'fa fa-clipboard-list',
          group: 'CLÍNICA',
          descricao: 'Histórico de Consultas da Clinica',
        },
        canActivate: [authGuard],
      },
      {
        path: 'detalhes-pet/:id',
        title: 'Detalhes de Pet',
        component: DetalhesPet,
        data: {
          RULE: 'GERENTE',
          visible: false,
          nome: 'Pets',
          voltar: true,
          icone: '',
          group: 'CLÍNICA',
          descricao: 'Detalhes do Pet Selecionado',
        },
        canActivate: [authGuard],
      },
      {
        path: 'detalhes-consulta/:id',
        title: 'Detalhes da Consulta',
        component: DetalhesConsulta,
        data: {
          RULE: 'GERENTE',
          visible: false,
          nome: 'Consultas',
          voltar: true,
          icone: '',
          group: 'CLÍNICA',
          descricao: 'Detalhes da Consulta Selecionada',
        },
        canActivate: [authGuard],
      },
      {
        path: 'perfil',
        title: 'Perfil',
        loadComponent: () =>
          import('../../shared/pages/perfil/perfil').then((m) => m.Perfil),
        data: {
          RULE: 'GERENTE',
          visible: false,
          nome: 'Perfil',
          icone: 'pi pi-user',
          voltar: true,
          descricao: 'Perfil do gerente',
          group: '',
        },
        canActivate: [authGuard],
      },
    ],
  },
];
