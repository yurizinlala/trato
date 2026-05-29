import type { Briefing } from "@/types/briefing";

export function buildScopeSuggestion(briefing: Briefing) {
  return {
    summary: `${briefing.projectType} focado em ${briefing.objective.toLowerCase()}`,
    includedPages: briefing.features.filter((feature) => feature.startsWith("Página")),
    includedFeatures: briefing.features.filter((feature) => !feature.startsWith("Página")),
    excludedFeatures: ["Assinatura digital dentro do sistema", "Integrações não descritas no briefing"],
    deliverables: ["Protótipo navegável", "Implementação responsiva", "Publicação assistida", "Documentação de uso"],
    estimatedDeadline: briefing.desiredDeadline,
    notes: "Escopo gerado como ponto de partida. Revisar dependências e materiais do cliente antes do contrato.",
    questions: briefing.confirmationQuestions
  };
}
