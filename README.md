# Pet Points — Front-end

Front-end do **Pet Points**, um sistema de gestão para clínicas veterinárias desenvolvido como Trabalho de Conclusão de Curso (TCC). A aplicação oferece portais distintos para clientes e para os diferentes tipos de funcionários da clínica, com autenticação por JWT, controle de acesso por permissão e recursos em tempo real (chat e notificações) via WebSocket.

## Sobre o projeto

O Pet Points centraliza o dia a dia de uma clínica veterinária: cadastro de pets, agendamento e acompanhamento de consultas, pagamentos, controle de estoque, atendimento ao cliente e gestão de funcionários. Cada usuário acessa apenas o módulo correspondente à sua permissão, e as rotas visíveis no menu são montadas dinamicamente a partir do papel contido no token.

## Tecnologias

- **Angular 20** (componentes standalone, roteamento com lazy loading)
- **TypeScript 5.8**
- **PrimeNG 20** + **@primeuix/themes** (tema Aura com paleta customizada)
- **PrimeIcons** e **Font Awesome**
- **Tailwind CSS 4** (via PostCSS/autoprefixer)
- **RxJS 7**
- **@stomp/stompjs** + **sockjs-client** — mensageria em tempo real (STOMP sobre SockJS)
- **jwt-decode** — leitura do token de autenticação
- **Chart.js** — gráficos dos dashboards
- **jsPDF** + **html2canvas** — geração de relatórios em PDF
- **ESLint** (angular-eslint / typescript-eslint) e **Karma + Jasmine** para testes

## Perfis de usuário

O acesso é organizado por permissão (`RULE`), cada uma com seu próprio módulo e conjunto de páginas:

- **Cliente** — dashboard, meus pets, minhas consultas, pagamentos e perfil.
- **Atendente** — dashboard, consultas da clínica, atendimentos (chat com clientes), clientes, pets, chat interno e perfil.
- **Veterinário** — dashboard, minhas consultas, detalhes da consulta, chat interno e perfil.
- **Estoquista** — dashboard, estoque, movimentações, detalhes de produto, chat interno e perfil.
- **Gerente** — dashboard, funcionários, financeiro, estoque, movimentações, clientes, pets, consultas, logs do sistema, chat interno e perfil.

## Estrutura do projeto

```
src/
├── app/
│   ├── core/                 # Infraestrutura da aplicação
│   │   ├── guards/           # authGuard (proteção de rotas por token)
│   │   ├── interceptors/     # Token e tratamento de respostas da API
│   │   ├── model/            # Modelos base (Token, Erro)
│   │   └── services/         # Token, tema, controle de rotas permitidas
│   ├── modules/              # Módulos por perfil de usuário
│   │   ├── autenticacao/     # Login, registro e recuperação de senha
│   │   ├── cliente/
│   │   ├── atendente/
│   │   ├── veterinario/
│   │   ├── estoquista/
│   │   └── gerente/
│   ├── shared/               # Componentes, páginas e serviços reutilizáveis
│   │   ├── pages/            # Perfil, clientes, pets, chat interno
│   │   ├── services/ws/      # Serviços WebSocket (chat e notificações)
│   │   ├── pipes/            # CPF, gênero, tipo de animal, formatação de texto
│   │   ├── modules/prime-ng/ # Agrupamento dos componentes PrimeNG
│   │   └── styles/           # Temas e estilização
│   ├── app.config.ts         # Providers, interceptors e tema PrimeNG
│   └── app.routes.ts         # Composição das rotas de todos os módulos
├── environments/             # Configuração de dev e produção
├── index.html
├── main.ts
└── styles.scss
```

Cada feature segue um padrão consistente de organização interna (`components/`, `pages/`, `models/`, `service/`, `forms/`), o que mantém o código previsível e fácil de navegar.

## Autenticação e controle de acesso

- Após o login, o back-end retorna um **JWT** que é guardado no `localStorage`.
- O `tokenApiInterceptor` injeta o token em toda requisição e prefixa a URL da API.
- O `responseApiInterceptor` centraliza o tratamento de respostas e erros.
- O `authGuard` bloqueia rotas quando o token está ausente ou expirado, redirecionando para `/autenticacao`.
- No carregamento do token, o `TokenService` identifica a permissão do usuário e o `RotasService` monta o conjunto de rotas permitidas, exibindo apenas o menu correspondente ao perfil.

## Recursos em tempo real

Serviços em `shared/services/ws/` usam STOMP sobre SockJS para:

- Chat de atendimento entre cliente e atendente
- Chat interno entre funcionários
- Fila de solicitações de atendimento
- Notificações

## Pré-requisitos

- **Node.js** (versão compatível com Angular 20)
- **npm**
- Uma instância do back-end do Pet Points em execução (por padrão em `http://localhost:8080` no ambiente de desenvolvimento)

## Como executar

Instale as dependências:

```bash
npm install
```

Suba o servidor de desenvolvimento:

```bash
npm start
```

A aplicação ficará disponível em `http://localhost:4200/` e recarrega automaticamente a cada alteração no código.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia o servidor de desenvolvimento (`ng serve`) |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run watch` | Build em modo desenvolvimento com reconstrução automática |
| `npm test` | Executa os testes unitários com Karma/Jasmine |
| `npm run lint` | Executa a análise estática com ESLint |

## Configuração de ambiente

Os endpoints da API ficam em `src/environments/`:

- `environment.ts` (desenvolvimento) → `http://localhost:8080`
- `environment.prod.ts` (produção) → `https://pet-points-back.*********.com`

Ajuste a `apiUrl` conforme o endereço do seu back-end.

## Build de produção

```bash
npm run build
```

Os artefatos são gerados no diretório `dist/` e ficam prontos para deploy em um servidor de arquivos estáticos.

---

Projeto desenvolvido como Trabalho de Conclusão de Curso (TCC).
