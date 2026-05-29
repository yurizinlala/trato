# Trato

Ferramenta interna para freelancer/desenvolvedor brasileiro organizar clientes, projetos, briefings, escopos, preços, contratos e documentos.

O cliente externo não tem portal. Ele acessa apenas o formulário público de briefing em `/briefing/[token]`.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Supabase Auth/Postgres/Storage
- PDF real com `pdf-lib`
- DOCX real com `docx`

Ficam fora do produto: pagamentos, envio de e-mail e assinatura dentro do app.

## Como Rodar

```bash
npm install
npm run dev
```

Depois acesse `http://localhost:3000`.

Build de produção:

```bash
npm run build
npm run start
```

## Supabase

Copie `.env.example` para `.env.local` e preencha:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Depois aplique a migration:

```text
supabase/migrations/202605290001_initial_schema.sql
```

Sem essas variáveis, o app continua abrindo em modo local de desenvolvimento com dados mockados/sessionStorage. Com as variáveis configuradas, o login usa Supabase Auth, rotas internas passam pelo middleware de sessão e clientes/projetos/checklist/histórico são sincronizados com Supabase.

## Documentos

Os botões de PDF/DOCX usam rotas reais:

- `/api/documents/[id]/pdf`
- `/api/documents/[id]/docx`

Quando `SUPABASE_SERVICE_ROLE_KEY` está configurada, os arquivos gerados também são enviados para o bucket privado `documents` no Supabase Storage.

## Rotas

- `/login`
- `/dashboard`
- `/clientes`
- `/clientes/novo`
- `/clientes/[id]`
- `/clientes/[id]/editar`
- `/projetos`
- `/projetos/novo`
- `/projetos/[id]`
- `/projetos/[id]/editar`
- `/briefing/[token]`
- `/briefings`
- `/briefings/[id]`
- `/escopo/[projectId]`
- `/preco/[projectId]`
- `/contratos`
- `/contratos/novo`
- `/contratos/[id]`
- `/documentos`
- `/documentos/[id]`
- `/configuracoes`

## Design System

Os padrões visuais do Trato estão concentrados em componentes React reutilizáveis:

- `TratoButton`
- `TratoCard`
- `TratoWindow`
- `TratoBadge`
- `TratoInput`
- `TratoTextarea`
- `TratoSelect`
- `TratoCheckbox`
- `TratoTabs`
- `TratoTable`
- `TratoModal`
- `DocumentPreview`
- `ContractPreview`
- `AppShell`
- `PublicShell`

Tokens de cor, borda, sombra, raio, tipografia e espaçamento estão em `tailwind.config.ts`, `app/globals.css` e `lib/design-tokens.ts`.
