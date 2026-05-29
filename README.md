# Trato

Primeira versão funcional do Trato: ferramenta interna para freelancer/desenvolvedor brasileiro organizar clientes, projetos, briefings, escopos, preços, contratos e documentos.

O cliente externo não tem portal. Ele acessa apenas o formulário público de briefing em `/briefing/[token]`.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Dados mockados centralizados em `lib/mock-data.ts`

## Como rodar

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

## Design system

Os padrões visuais do ZIP do Stitch foram recriados como componentes React reutilizáveis, sem copiar páginas HTML estáticas:

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

## Dados e validação

Os dados iniciais ficam em `lib/mock-data.ts`:

- 4 clientes
- 5 projetos
- 4 briefings
- 4 contratos
- 5 documentos
- métricas e atividades do dashboard

Schemas Zod ficam em `lib/schemas`. Os formulários usam React Hook Form com Zod.

A interação mockada de clientes, projetos e checklist de contrato usa `TratoDataProvider` com persistência em `sessionStorage`. Nada é enviado para banco real nesta etapa.

## Preparado para próximas etapas

- Substituir `lib/mock-data.ts` por repositórios/queries Supabase.
- Conectar ações de criar/editar/salvar a Server Actions ou API routes.
- Implementar geração real de PDF/DOCX a partir de `DocumentPreview`, `ContractPreview` e `lib/document-placeholders.ts`.
- Integrar envio externo e marcação de assinatura fora do sistema.
