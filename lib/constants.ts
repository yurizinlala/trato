import type { ProjectType } from "@/types/project";
import type { TratoStatus } from "@/types/status";

export const statusLabels: Record<TratoStatus, string> = {
  novo: "Novo",
  briefing_enviado: "Briefing enviado",
  briefing_recebido: "Briefing recebido",
  em_analise: "Em análise",
  escopo_aprovado: "Escopo aprovado",
  contrato_gerado: "Contrato gerado",
  em_desenvolvimento: "Em desenvolvimento",
  entregue: "Entregue",
  cancelado: "Cancelado",
  rascunho: "Rascunho",
  gerado: "Gerado",
  enviado: "Enviado",
  assinado_externamente: "Assinado externamente",
  arquivado: "Arquivado"
};

export const projectTypes: ProjectType[] = [
  "Site institucional",
  "Portfólio",
  "Landing page",
  "Sistema web",
  "Dashboard",
  "Loja virtual",
  "Manutenção",
  "Outro"
];

export const budgetRanges = [
  "Até R$ 800",
  "R$ 800 a R$ 1.500",
  "R$ 1.500 a R$ 3.000",
  "R$ 3.000 a R$ 6.000",
  "Acima de R$ 6.000",
  "Ainda não sei"
];

export const brazilianStates = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO"
];

export const briefingGoals = [
  "Apresentar minha empresa",
  "Vender produto ou serviço",
  "Captar contatos",
  "Mostrar portfólio",
  "Automatizar processos",
  "Gerenciar dados",
  "Melhorar presença digital",
  "Outro"
];

export const briefingFeatures = [
  "Página inicial",
  "Página sobre",
  "Página de serviços",
  "Portfólio/galeria",
  "Blog",
  "Formulário de contato",
  "Botão de WhatsApp",
  "Login de usuário",
  "Área administrativa",
  "Dashboard",
  "Banco de dados",
  "Integração com API",
  "Pagamento online",
  "SEO básico",
  "Animações",
  "Responsivo para celular"
];
