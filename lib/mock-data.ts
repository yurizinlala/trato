import type { Briefing } from "@/types/briefing";
import type { Client } from "@/types/client";
import type { Contract } from "@/types/contract";
import type { Document } from "@/types/document";
import type { Project } from "@/types/project";
import type { Settings } from "@/types/settings";
import { byId } from "@/lib/utils";

export const clients: Client[] = [
  {
    id: "cli-mariana",
    name: "Mariana Silveira",
    company: "Vértice Arquitetura",
    document: "04.252.011/0001-10",
    email: "mariana@vertice.arq.br",
    whatsapp: "+55 11 98765-4321",
    city: "São Paulo",
    state: "SP",
    address: "Rua Harmonia, 420 - Vila Madalena",
    notes: "Cliente objetiva, prefere reuniões curtas e aprova materiais por WhatsApp.",
    projectIds: ["proj-portfolio", "proj-site"],
    lastActivity: "2026-05-24"
  },
  {
    id: "cli-carlos",
    name: "Carlos Drummond",
    company: "Independente",
    document: "123.456.789-09",
    email: "carlos.d@gmail.com",
    whatsapp: "+55 21 99887-6655",
    city: "Rio de Janeiro",
    state: "RJ",
    address: "Av. das Américas, 2100 - Barra",
    notes: "Precisa de linguagem simples no contrato e proposta com etapas bem claras.",
    projectIds: ["proj-portfolio"],
    lastActivity: "2026-05-21"
  },
  {
    id: "cli-luiza",
    name: "Luiza Campos",
    company: "TechBite",
    document: "11.222.333/0001-81",
    email: "luiza@techbite.io",
    whatsapp: "+55 31 97777-8888",
    city: "Belo Horizonte",
    state: "MG",
    address: "Rua Sergipe, 1188 - Savassi",
    notes: "Startup em crescimento. Valoriza dashboard limpo e entregas semanais.",
    projectIds: ["proj-dashboard", "proj-agendamento"],
    lastActivity: "2026-05-27"
  },
  {
    id: "cli-joao",
    name: "João Batista Almeida",
    company: "Café Aurora",
    document: "40.688.134/0001-61",
    email: "joao@cafeaurora.com.br",
    whatsapp: "+55 81 98822-1100",
    city: "Recife",
    state: "PE",
    address: "Rua do Bom Jesus, 72 - Recife Antigo",
    notes: "Marca com forte apelo regional. Quer visual artesanal sem perder performance.",
    projectIds: ["proj-landing"],
    lastActivity: "2026-05-25"
  }
];

export const projects: Project[] = [
  {
    id: "proj-portfolio",
    clientId: "cli-carlos",
    name: "Portfólio profissional",
    type: "Portfólio",
    status: "briefing_recebido",
    description: "Portfólio para apresentar trabalhos, depoimentos e formulário de contato.",
    objective: "Dar presença profissional para captação de novos clientes.",
    desiredDeadline: "4 semanas",
    deadline: "2026-06-28",
    suggestedPrice: 2500,
    finalPrice: 2800,
    paymentTerms: "50% entrada / 50% na entrega",
    updatedAt: "2026-05-25",
    createdAt: "2026-05-10",
    briefingId: "brief-portfolio",
    contractIds: ["cont-portfolio"],
    documentIds: ["doc-portfolio-proposta"],
    scope: {
      summary: "Portfólio responsivo com curadoria de trabalhos e contato rápido.",
      includedPages: ["Início", "Sobre", "Projetos", "Contato"],
      includedFeatures: ["Galeria filtrável", "Botão de WhatsApp", "SEO básico"],
      excludedFeatures: ["Blog", "Área administrativa"],
      deliverables: ["Layout responsivo", "Implementação web", "Guia de atualização"],
      estimatedDeadline: "4 semanas",
      notes: "Confirmar quantidade de projetos e imagens em alta resolução.",
      questions: ["Quem fará a curadoria dos textos?", "O domínio já está ativo?"]
    }
  },
  {
    id: "proj-landing",
    clientId: "cli-joao",
    name: "Landing page Café Aurora",
    type: "Landing page",
    status: "em_analise",
    description: "Página de campanha para lançamento de assinatura mensal de cafés.",
    objective: "Captar leads e apresentar planos de assinatura.",
    desiredDeadline: "30 dias",
    deadline: "2026-06-18",
    suggestedPrice: 3200,
    finalPrice: 3500,
    paymentTerms: "40% entrada / 30% layout / 30% publicação",
    updatedAt: "2026-05-26",
    createdAt: "2026-05-12",
    briefingId: "brief-landing",
    contractIds: [],
    documentIds: ["doc-landing-escopo"],
    scope: {
      summary: "Landing page persuasiva para assinatura de cafés especiais.",
      includedPages: ["Página única"],
      includedFeatures: ["Formulário de contato", "Botão de WhatsApp", "SEO básico", "Responsivo para celular"],
      excludedFeatures: ["Pagamento online", "Área de assinante"],
      deliverables: ["Página publicada", "Integração com formulário", "Checklist de conteúdo"],
      estimatedDeadline: "30 dias",
      notes: "Não incluir checkout nesta fase.",
      questions: ["Qual plataforma receberá os leads?", "Já existe copy final?"]
    }
  },
  {
    id: "proj-site",
    clientId: "cli-mariana",
    name: "Site institucional Vértice",
    type: "Site institucional",
    status: "escopo_aprovado",
    description: "Site institucional para arquitetura com páginas de serviços e projetos.",
    objective: "Modernizar presença digital e aumentar pedidos de orçamento.",
    desiredDeadline: "6 semanas",
    deadline: "2026-07-05",
    suggestedPrice: 5400,
    finalPrice: 5800,
    paymentTerms: "3x sem juros via Pix",
    updatedAt: "2026-05-27",
    createdAt: "2026-05-06",
    briefingId: "brief-site",
    contractIds: ["cont-site"],
    documentIds: ["doc-site-contrato"],
    scope: {
      summary: "Site institucional com portfólio de projetos e captação de orçamento.",
      includedPages: ["Início", "Sobre", "Serviços", "Portfólio", "Contato"],
      includedFeatures: ["Portfólio/galeria", "Formulário de contato", "SEO básico", "Responsivo para celular"],
      excludedFeatures: ["Blog", "Login de usuário"],
      deliverables: ["Design UI", "Implementação", "Publicação assistida", "Treinamento rápido"],
      estimatedDeadline: "6 semanas",
      notes: "Cliente enviará imagens após curadoria interna.",
      questions: ["Confirmar hospedagem final.", "Validar tom da copy institucional."]
    }
  },
  {
    id: "proj-dashboard",
    clientId: "cli-luiza",
    name: "Dashboard interno TechBite",
    type: "Dashboard",
    status: "contrato_gerado",
    description: "Dashboard operacional para indicadores de vendas e atendimento.",
    objective: "Centralizar métricas diárias para a equipe comercial.",
    desiredDeadline: "8 semanas",
    deadline: "2026-07-20",
    suggestedPrice: 9200,
    finalPrice: 9800,
    paymentTerms: "50% entrada / 25% homologação / 25% entrega",
    updatedAt: "2026-05-28",
    createdAt: "2026-05-02",
    briefingId: "brief-dashboard",
    contractIds: ["cont-dashboard"],
    documentIds: ["doc-dashboard-contrato", "doc-dashboard-proposta"],
    scope: {
      summary: "Dashboard interno com indicadores, filtros e visão diária de performance.",
      includedPages: ["Login fake", "Painel geral", "Vendas", "Atendimento", "Configurações"],
      includedFeatures: ["Dashboard", "Banco de dados", "Integração com API", "Área administrativa"],
      excludedFeatures: ["App mobile nativo", "Pagamento online"],
      deliverables: ["Protótipo", "Frontend responsivo", "Documentação técnica", "Deploy assistido"],
      estimatedDeadline: "8 semanas",
      notes: "Integrações dependem de acesso à API do CRM.",
      questions: ["Quais permissões internas serão necessárias?", "A API possui ambiente de teste?"]
    }
  },
  {
    id: "proj-agendamento",
    clientId: "cli-luiza",
    name: "Sistema de agendamento",
    type: "Sistema web",
    status: "em_desenvolvimento",
    description: "Sistema simples para agendar consultorias e gerenciar disponibilidade.",
    objective: "Reduzir troca manual de mensagens para marcação de horários.",
    desiredDeadline: "10 semanas",
    deadline: "2026-08-12",
    suggestedPrice: 7800,
    finalPrice: 8200,
    paymentTerms: "Entrada + 2 parcelas mensais",
    updatedAt: "2026-05-23",
    createdAt: "2026-04-27",
    contractIds: [],
    documentIds: ["doc-agendamento-aprovacao"],
    scope: {
      summary: "Sistema web para agenda, horários e confirmações internas.",
      includedPages: ["Agenda", "Cadastro de horários", "Lista de clientes", "Relatórios simples"],
      includedFeatures: ["Login de usuário", "Área administrativa", "Banco de dados", "Responsivo para celular"],
      excludedFeatures: ["Pagamento online", "Assinatura digital"],
      deliverables: ["Fluxo de agendamento", "Painel administrativo", "Manual de uso"],
      estimatedDeadline: "10 semanas",
      notes: "Integração de e-mail fica para etapa futura.",
      questions: ["Confirmar regras de cancelamento.", "Quantos perfis usarão a agenda?"]
    }
  }
];

export const briefings: Briefing[] = [
  {
    id: "brief-portfolio",
    token: "portfolio-carlos-2026",
    clientId: "cli-carlos",
    projectId: "proj-portfolio",
    receivedAt: "2026-05-21",
    status: "briefing_recebido",
    projectType: "Portfólio",
    objective: "Quero apresentar meus trabalhos recentes e facilitar que clientes peçam orçamento.",
    goals: ["Mostrar portfólio", "Captar contatos", "Melhorar presença digital"],
    features: ["Página inicial", "Portfólio/galeria", "Formulário de contato", "Botão de WhatsApp", "SEO básico", "Responsivo para celular"],
    assets: {
      hasDomain: true,
      hasHosting: false,
      hasLogo: true,
      hasTexts: false,
      hasImages: true,
      hasReferences: true,
      referenceLinks: "https://www.behance.net, https://dribbble.com",
      notes: "Tenho fotos dos projetos, mas preciso de ajuda com os textos."
    },
    desiredDeadline: "4 semanas",
    budgetRange: "R$ 1.500 a R$ 3.000",
    attentionPoints: ["Textos ainda não prontos", "Hospedagem precisa ser definida"],
    confirmationQuestions: ["Quem revisará os textos finais?", "Quer incluir depoimentos?"]
  },
  {
    id: "brief-landing",
    token: "cafe-aurora-landing",
    clientId: "cli-joao",
    projectId: "proj-landing",
    receivedAt: "2026-05-25",
    status: "em_analise",
    projectType: "Landing page",
    objective: "Lançar um clube de assinatura de cafés especiais e medir interesse antes do checkout.",
    goals: ["Vender produto ou serviço", "Captar contatos", "Apresentar minha empresa"],
    features: ["Página inicial", "Página de serviços", "Formulário de contato", "Botão de WhatsApp", "SEO básico", "Responsivo para celular"],
    assets: {
      hasDomain: true,
      hasHosting: true,
      hasLogo: true,
      hasTexts: true,
      hasImages: false,
      hasReferences: true,
      referenceLinks: "https://coffeeclub.com.br",
      notes: "Fotos profissionais serão feitas na próxima semana."
    },
    desiredDeadline: "30 dias",
    budgetRange: "R$ 3.000 a R$ 6.000",
    attentionPoints: ["Imagens pendentes", "Não incluir pagamento nesta fase"],
    confirmationQuestions: ["Qual ferramenta receberá os leads?", "Há política de privacidade aprovada?"]
  },
  {
    id: "brief-site",
    token: "vertice-site-2026",
    clientId: "cli-mariana",
    projectId: "proj-site",
    receivedAt: "2026-05-18",
    status: "escopo_aprovado",
    projectType: "Site institucional",
    objective: "Atualizar o site para parecer mais premium e receber pedidos de orçamento qualificados.",
    goals: ["Apresentar minha empresa", "Captar contatos", "Mostrar portfólio"],
    features: ["Página inicial", "Página sobre", "Página de serviços", "Portfólio/galeria", "Formulário de contato", "SEO básico", "Responsivo para celular"],
    assets: {
      hasDomain: true,
      hasHosting: true,
      hasLogo: true,
      hasTexts: false,
      hasImages: true,
      hasReferences: true,
      referenceLinks: "https://archdaily.com.br",
      notes: "Referências visuais são minimalistas, mas queremos fugir do genérico."
    },
    desiredDeadline: "6 semanas",
    budgetRange: "R$ 3.000 a R$ 6.000",
    attentionPoints: ["Copy institucional precisa de refinamento", "Galeria pode crescer bastante"],
    confirmationQuestions: ["Quantos projetos entram no lançamento?", "Quem aprova imagens finais?"]
  },
  {
    id: "brief-dashboard",
    token: "techbite-dashboard",
    clientId: "cli-luiza",
    projectId: "proj-dashboard",
    receivedAt: "2026-05-20",
    status: "contrato_gerado",
    projectType: "Dashboard",
    objective: "Concentrar métricas de vendas, atendimento e churn para decisões semanais.",
    goals: ["Gerenciar dados", "Automatizar processos"],
    features: ["Login de usuário", "Área administrativa", "Dashboard", "Banco de dados", "Integração com API", "Responsivo para celular"],
    assets: {
      hasDomain: false,
      hasHosting: false,
      hasLogo: true,
      hasTexts: true,
      hasImages: false,
      hasReferences: false,
      referenceLinks: "",
      notes: "Temos dados no CRM, mas precisamos validar acesso à API."
    },
    desiredDeadline: "8 semanas",
    budgetRange: "Acima de R$ 6.000",
    attentionPoints: ["Dependência de API", "Permissões internas ainda indefinidas"],
    confirmationQuestions: ["Qual será a origem oficial dos dados?", "Quem terá acesso administrativo?"]
  }
];

export const contracts: Contract[] = [
  {
    id: "cont-portfolio",
    name: "Contrato Portfólio Carlos",
    clientId: "cli-carlos",
    projectId: "proj-portfolio",
    status: "rascunho",
    createdAt: "2026-05-22",
    updatedAt: "2026-05-24",
    template: "Prestação de serviços digitais",
    contractor: "Carlos Drummond",
    contractorDocument: "123.456.789-10",
    contracted: "Trato Estúdio Criativo",
    contractedDocument: "45.678.901/0001-20",
    object: "Desenvolvimento de portfólio profissional responsivo.",
    scope: "Criação de páginas Início, Sobre, Projetos e Contato com galeria e botão de WhatsApp.",
    deadline: "4 semanas",
    value: 2800,
    paymentTerms: "50% entrada / 50% na entrega",
    revisions: "Até 2 rodadas de ajustes por etapa",
    warranty: "30 dias de garantia técnica",
    jurisdiction: "Rio de Janeiro - RJ",
    observations: "Cliente assinará externamente via gov.br."
  },
  {
    id: "cont-site",
    name: "Contrato Site Vértice",
    clientId: "cli-mariana",
    projectId: "proj-site",
    status: "gerado",
    createdAt: "2026-05-19",
    updatedAt: "2026-05-27",
    template: "Site institucional",
    contractor: "Vértice Arquitetura Ltda.",
    contractorDocument: "32.458.991/0001-28",
    contracted: "Trato Estúdio Criativo",
    contractedDocument: "45.678.901/0001-20",
    object: "Desenvolvimento de site institucional para escritório de arquitetura.",
    scope: "Site com cinco páginas, galeria de projetos, formulário e SEO básico.",
    deadline: "6 semanas",
    value: 5800,
    paymentTerms: "3x sem juros via Pix",
    revisions: "Até 3 rodadas de revisão",
    warranty: "45 dias de garantia técnica",
    jurisdiction: "São Paulo - SP",
    observations: "Aguardando revisão final de cláusulas."
  },
  {
    id: "cont-dashboard",
    name: "Contrato Dashboard TechBite",
    clientId: "cli-luiza",
    projectId: "proj-dashboard",
    status: "enviado",
    createdAt: "2026-05-23",
    updatedAt: "2026-05-28",
    template: "Sistema web",
    contractor: "TechBite Tecnologia Ltda.",
    contractorDocument: "19.734.882/0001-05",
    contracted: "Trato Estúdio Criativo",
    contractedDocument: "45.678.901/0001-20",
    object: "Desenvolvimento de dashboard interno de indicadores.",
    scope: "Dashboard com telas de vendas, atendimento, filtros, integração com API e documentação.",
    deadline: "8 semanas",
    value: 9800,
    paymentTerms: "50% entrada / 25% homologação / 25% entrega",
    revisions: "Até 2 rodadas por módulo",
    warranty: "60 dias de garantia técnica",
    jurisdiction: "Belo Horizonte - MG",
    observations: "Contrato enviado para assinatura externa."
  },
  {
    id: "cont-landing",
    name: "Contrato Landing Café Aurora",
    clientId: "cli-joao",
    projectId: "proj-landing",
    status: "assinado_externamente",
    createdAt: "2026-05-26",
    updatedAt: "2026-05-28",
    template: "Landing page",
    contractor: "Café Aurora Ltda.",
    contractorDocument: "08.221.552/0001-90",
    contracted: "Trato Estúdio Criativo",
    contractedDocument: "45.678.901/0001-20",
    object: "Criação de landing page para campanha de assinatura de cafés.",
    scope: "Página única com formulário de captura, WhatsApp, SEO básico e publicação assistida.",
    deadline: "30 dias",
    value: 3500,
    paymentTerms: "40% entrada / 30% layout / 30% publicação",
    revisions: "Até 2 rodadas",
    warranty: "30 dias de garantia técnica",
    jurisdiction: "Recife - PE",
    observations: "Assinado externamente em 28/05/2026."
  }
];

export const documents: Document[] = [
  {
    id: "doc-portfolio-proposta",
    title: "Proposta Portfólio Profissional",
    type: "Proposta comercial",
    clientId: "cli-carlos",
    projectId: "proj-portfolio",
    date: "2026-05-22",
    status: "gerado",
    fileName: "proposta-portfolio-carlos.pdf",
    versionHistory: [
      { version: "v1.0", date: "2026-05-22", note: "Proposta inicial gerada." }
    ]
  },
  {
    id: "doc-landing-escopo",
    title: "Anexo de Escopo Café Aurora",
    type: "Anexo de escopo",
    clientId: "cli-joao",
    projectId: "proj-landing",
    date: "2026-05-26",
    status: "rascunho",
    fileName: "anexo-escopo-cafe-aurora.docx",
    versionHistory: [
      { version: "v0.1", date: "2026-05-26", note: "Escopo extraído do briefing." }
    ]
  },
  {
    id: "doc-site-contrato",
    title: "Contrato Site Vértice",
    type: "Contrato",
    clientId: "cli-mariana",
    projectId: "proj-site",
    contractId: "cont-site",
    date: "2026-05-27",
    status: "enviado",
    fileName: "contrato-site-vertice.pdf",
    versionHistory: [
      { version: "v1.0", date: "2026-05-19", note: "Minuta gerada." },
      { version: "v1.1", date: "2026-05-27", note: "Cláusula de portfólio ajustada." }
    ]
  },
  {
    id: "doc-dashboard-contrato",
    title: "Contrato Dashboard TechBite",
    type: "Contrato",
    clientId: "cli-luiza",
    projectId: "proj-dashboard",
    contractId: "cont-dashboard",
    date: "2026-05-28",
    status: "assinado_externamente",
    fileName: "contrato-dashboard-techbite.pdf",
    versionHistory: [
      { version: "v1.0", date: "2026-05-23", note: "Contrato gerado." },
      { version: "v2.0", date: "2026-05-28", note: "Marcado como assinado externamente." }
    ]
  },
  {
    id: "doc-agendamento-aprovacao",
    title: "Termo de Aprovação Agendamento",
    type: "Termo de aprovação",
    clientId: "cli-luiza",
    projectId: "proj-agendamento",
    date: "2026-05-20",
    status: "arquivado",
    fileName: "termo-aprovacao-agendamento.pdf",
    versionHistory: [
      { version: "v1.0", date: "2026-05-20", note: "Termo arquivado após aprovação." }
    ]
  }
];

export const activities = [
  { id: "act-1", title: "Briefing recebido", detail: "Café Aurora enviou respostas completas.", href: "/briefings/brief-landing", status: "briefing_recebido" },
  { id: "act-2", title: "Contrato enviado", detail: "Dashboard TechBite aguarda assinatura externa.", href: "/contratos/cont-dashboard", status: "enviado" },
  { id: "act-3", title: "Escopo aprovado", detail: "Site institucional Vértice liberado para contrato.", href: "/projetos/proj-site", status: "escopo_aprovado" },
  { id: "act-4", title: "Documento gerado", detail: "Proposta Portfólio Profissional pronta.", href: "/documentos/doc-portfolio-proposta", status: "gerado" }
] as const;

export const dashboardMetrics = {
  recentProjects: 5,
  receivedBriefings: 4,
  generatedDocuments: 5,
  readyContracts: 3
};

export const settings: Settings = {
  name: "Trato Estúdio Criativo",
  document: "45.678.901/0001-20",
  email: "contato@trato.dev",
  whatsapp: "+55 11 90000-2026",
  city: "São Paulo",
  state: "SP",
  address: "Rua dos Desenvolvedores, 404 - Vila Madalena",
  defaultJurisdiction: "São Paulo - SP",
  defaultRevisionLimit: "2 rodadas por etapa",
  defaultWarranty: "30 dias de garantia técnica",
  defaultPaymentTerms: "50% entrada / 50% entrega",
  logo: "TRATO",
  primaryColor: "#FF6B1A",
  defaultTemplate: "Prestação de serviços digitais",
  defaultClauses: "Cláusulas padrão sobre escopo, revisões, propriedade intelectual, confidencialidade e assinatura eletrônica externa."
};

export function getClient(id: string) {
  return byId(clients, id);
}

export function getProject(id: string) {
  return byId(projects, id);
}

export function getBriefing(id: string) {
  return byId(briefings, id);
}

export function getBriefingByToken(token: string) {
  return briefings.find((briefing) => briefing.token === token) ?? briefings[0];
}

export function getContract(id: string) {
  return byId(contracts, id);
}

export function getDocument(id: string) {
  return byId(documents, id);
}
