# AGENTS.md

## Project Overview
GoLink is a URL shortener monorepo with:
- `apps/api`: backend API
- `apps/web`: frontend app
- `packages/*`: shared workspace configs/libs

Primary language: TypeScript.

## Detected Stack
- Monorepo tooling: `pnpm` workspaces + Turborepo (`turbo.json`)
- Runtime: Node.js `>=18`
- Backend (`apps/api`):
  - NestJS 11
  - Prisma ORM 6
  - PostgreSQL (Docker Compose uses `postgres:15`)
  - JWT auth (`@nestjs/jwt`, `passport-jwt`)
  - Password hashing with `argon2`
  - Validation with `class-validator` + global `ValidationPipe`
- Frontend (`apps/web`):
  - Angular 19 (standalone config/routing)
  - Tailwind CSS v4 + PostCSS
  - OAuth client with `angular-oauth2-oidc` (GitHub flow)

## Repository Layout
- `/apps/api` -> NestJS API + Prisma schema/migrations + Bruno collection
- `/apps/web` -> Angular app (pages, guards, services, UI components)
- `/packages/eslint-config` -> shared ESLint configs
- `/packages/typescript-config` -> shared TS config presets
- `/packages/ui` -> shared UI package scaffold

## Local Development
1. Install dependencies from repo root:
   - `pnpm install`
2. Start PostgreSQL:
   - `cd apps/api && docker compose up -d`
3. Configure environment:
   - API env (`apps/api/.env`) expected keys:
     - `DATABASE_URL`
     - `DATABASE_USER`
     - `DATABASE_PASSWORD`
     - `DATABASE_NAME`
     - `JWT_SECRET`
     - `GITHUB_CLIENT_ID`
     - `GITHUB_CLIENT_SECRET`
     - `PORT` (optional, default `3000`)
   - Web env file:
     - create `apps/web/src/environments/environment.development.ts` from `environment.template.ts`
     - set `githubClientId` and `apiUrl` (default local API: `http://localhost:3000/api`)
4. Apply DB migrations (from root):
   - `pnpm --filter api exec prisma migrate dev`
5. Run apps:
   - API only: `pnpm dev:api`
   - Web only: `pnpm dev:web`
   - Both: `pnpm dev:all`

## Useful Workspace Commands
- Build all: `pnpm build`
- Lint all: `pnpm lint:all`
- Lint API: `pnpm lint:api`
- Lint Web: `pnpm lint:web`
- Type check: `pnpm check-types`
- API tests: `pnpm --filter api test`
- API e2e tests: `pnpm --filter api test:e2e`
- Web tests: `pnpm --filter web test`

## API Runtime Notes
- Global API prefix: `/api`
- CORS is currently set to allow `http://localhost:4200`
- Short URL endpoints are under `/api/short-url`
- Auth endpoints are under `/api/auth`

## Frontend Runtime Notes
- Auth token storage key: `auth_token` (localStorage)
- User storage key: `user` (localStorage)
- Redirect route pattern: `/:code`
- Auth callback route: `/auth/callback`

