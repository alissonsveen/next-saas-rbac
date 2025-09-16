# Next SaaS + RBAC (Monorepo)

SaaS multi-tenant com autenticação e autorização RBAC. Monorepo com `pnpm workspaces` e `Turborepo`, cobrindo API (Fastify + Prisma) e Web (Next.js + React Query + Tailwind).

## Stack principal

- Backend (API):
  - Fastify 5, `fastify-type-provider-zod`, `@fastify/jwt`, `@fastify/swagger`/`swagger-ui`
  - Prisma 6 (PostgreSQL)
  - Validação com Zod 4
- Frontend (Web):
  - Next.js 15 (App Router), React 19, `@tanstack/react-query` v5
  - Tailwind CSS v4, Radix UI, `lucide-react`, theming com `next-themes`
  - HTTP com `ky`
- Monorepo/Tooling:
  - `pnpm`, Turborepo, TypeScript 5
  - Env type-safe com `@t3-oss/env-nextjs`
  - ESLint/Prettier compartilhados

## Padrões e arquitetura

- Organização em monorepo com pacotes compartilhados: `@saas/auth`, `@saas/env`, configs de ESLint/TS.
- RBAC centralizado em `packages/auth` (roles, permissions, subjects) e aplicado na API e Web.
- Schemas Zod em borda de requisição e tipagem end-to-end via `fastify-type-provider-zod`.
- Camada HTTP da API com middlewares (`auth`), rotas coesas e tratador de erros unificado.
- Prisma como ORM, migrações versionadas em `apps/api/prisma/migrations`.
- Front-end com App Router, componentes de UI reutilizáveis e dados via React Query.
- Variáveis de ambiente validadas em build/runtime (`packages/env`).

## Funcionalidades (essenciais)

- Autenticação: e‑mail/senha, GitHub OAuth, recuperação de senha, cadastro.
- Organizações: criar, listar, atualizar, deletar e transferir ownership.
- Convites: convidar, aceitar, revogar.
- Membros: listar, atualizar cargo e sair da organização.
- Projetos: CRUD dentro da organização.
- Billing: cálculo por projeto/membro e visão de cobrança.
- RBAC: Owner, Administrator, Member, Billing, Anonymous (regras condicionais para operações sensíveis).

## Requisitos

- Node.js >= 18
- pnpm >= 9
- Docker (para Postgres) — ou PostgreSQL local

## Instalação e configuração

1. Clone e instale dependências

```bash
pnpm install
```

2. Suba o banco de dados (Docker Compose)

```bash
docker compose up -d
```

3. Crie um arquivo `.env` na raiz com as variáveis abaixo

```bash
# API
SERVER_PORT=3333
DATABASE_URL="postgresql://docker:docker@localhost:5432/next-saas?schema=public"
JWT_SECRET="sua_chave_jwt_segura"

# OAuth (GitHub)
GITHUB_OAUTH_CLIENT_ID=
GITHUB_OAUTH_CLIENT_SECRET=
GITHUB_OAUTH_CLIENT_REDIRECT_URI="http://localhost:3333/sessions/github/callback"

# Web
NEXT_PUBLIC_API_URL="http://localhost:3333"
```

4. Aplique migrações (Prisma)

```bash
pnpm --filter @saas\api db:migrate
```

5. Ambiente de desenvolvimento (monorepo)

```bash
pnpm dev
```

Apps individuais:

```bash
# API
pnpm --filter @saas\api dev

# Web
pnpm --filter @saas\web dev
```

## Scripts úteis

- Build monorepo: `pnpm build`
- Lint: `pnpm lint`
- Studio Prisma: `pnpm --filter @saas\\api db:studio`

## Observações

- A API expõe documentação Swagger UI (habilitada via `@fastify/swagger-ui`). Verifique a URL nos logs ao iniciar a API.
- Garanta que `NEXT_PUBLIC_API_URL` aponte para a porta real da API (ex: `http://localhost:3333`).
