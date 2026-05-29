# AGENTS.md — Trato

## Produto

Trato é uma ferramenta interna para um freelancer/desenvolvedor brasileiro organizar clientes, projetos, briefings, escopos, preços, contratos e documentos.

O cliente externo só acessa um formulário público de briefing. Ele não tem portal, não vê dashboard, não vê preço sugerido e não assina dentro do sistema.

## Identidade visual

O Trato usa uma estética Retro-Tech / Neo-Brutalista brasileira.

A interface deve parecer:

* criativa
* moderna
* premium
* direta
* brasileira
* memorável
* confiável
* nostálgica sem parecer velha
* profissional sem parecer corporativa genérica

## Paleta fixa

Use apenas estas cores como base:

* Paper Cream: #FFF6E5
* Ink Black: #111111
* Trato Orange: #FF6B1A
* Pen Blue: #1F4E8C
* Soft Sand: #F3E2C7
* Soft Gray: #E8E2D6
* Success Green: #2E8B57
* Warning Yellow: #FFD166
* Danger Red: #EF476F

Não inventar cores novas sem necessidade.

## Tipografia

* Títulos: Space Grotesk ou Syne
* Corpo: Inter
* Labels/metadados: IBM Plex Mono

## Regras visuais obrigatórias

* fundo creme/off-white
* bordas pretas grossas
* sombras duras sem blur
* botões com contorno forte
* cards com bordas consistentes
* inputs com bordas consistentes
* badges geométricos
* painéis com aparência de janela retrô
* preview de documento A4

Não usar:

* visual SaaS genérico
* glassmorphism
* gradientes aleatórios
* sombras suaves genéricas
* estilos diferentes para o mesmo tipo de elemento
* componentes criados individualmente dentro de cada página

## Regra máxima de consistência

Nunca criar botão, card, input, badge, modal, tabela, sidebar, topbar, formulário ou preview de documento diretamente em uma página se já existir componente reutilizável.

Sempre usar os componentes do design system.

## Componentes obrigatórios

Todos os botões devem usar:

* TratoButton

Todos os cards devem usar:

* TratoCard
* TratoWindow

Todos os status devem usar:

* TratoBadge

Todos os formulários devem usar:

* TratoInput
* TratoTextarea
* TratoSelect
* TratoCheckbox

Todas as telas internas devem usar:

* AppShell
* Sidebar
* Topbar
* PageHeader

A tela pública de briefing deve usar:

* PublicShell

Previews de documento devem usar:

* DocumentPreview
* ContractPreview

## Variantes permitidas

### TratoButton

Variants:

* primary
* secondary
* outline
* ghost
* danger
* success

Sizes:

* sm
* md
* lg

### TratoCard

Variants:

* default
* elevated
* accent
* warning
* document
* compact

### TratoBadge

Status permitidos:

* novo
* briefing_enviado
* briefing_recebido
* em_analise
* escopo_aprovado
* contrato_gerado
* em_desenvolvimento
* entregue
* cancelado
* rascunho
* gerado
* enviado
* assinado_externamente
* arquivado

## Arquitetura

Usar:

* Next.js App Router
* TypeScript
* Tailwind CSS
* React Hook Form
* Zod

Pastas:

* /app para rotas
* /components/layout para layout
* /components/ui para componentes base
* /components/forms para formulários
* /components/documents para documentos
* /lib para dados, utils e regras
* /lib/schemas para schemas Zod
* /types para tipos TypeScript

## Dados

Na primeira versão, usar dados mockados em:

* /lib/mock-data.ts

Não espalhar dados mockados dentro das páginas.

## Formulários

Todos os formulários devem usar:

* React Hook Form
* Zod
* componentes padronizados do Trato

Não criar formulários soltos manualmente.

## Escopo da primeira versão

Implementar com dados mockados:

* login fake
* dashboard
* clientes
* projetos
* briefing público
* briefings recebidos
* sugestão de escopo
* sugestão de preço
* contratos
* documentos
* configurações

Não implementar ainda:

* autenticação real
* Supabase real
* banco real
* PDF real
* DOCX real
* assinatura digital
* portal do cliente
* pagamento
* envio de e-mail

## Critérios de qualidade

Antes de finalizar qualquer tarefa:

1. Rodar `npm run build`.
2. Corrigir erros TypeScript.
3. Verificar se o visual continua consistente.
4. Confirmar que não foram criadas variantes visuais desnecessárias.
5. Confirmar que páginas usam componentes reutilizáveis.
6. Atualizar README se a tarefa mudar comandos, rotas ou estrutura.
