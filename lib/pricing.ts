import type { Briefing } from "@/types/briefing";

export function suggestPriceFromBriefing(briefing: Briefing) {
  const baseByType: Record<string, number> = {
    "Site institucional": 2800,
    Portfólio: 1800,
    "Landing page": 1500,
    "Sistema web": 6500,
    Dashboard: 5200,
    "Loja virtual": 6000,
    Manutenção: 900,
    Outro: 2200
  };

  const featureFactor = briefing.features.length * 180;
  const integrationFactor = briefing.features.some((feature) =>
    ["Banco de dados", "Integração com API", "Pagamento online"].includes(feature)
  )
    ? 1400
    : 0;
  const urgencyFactor = briefing.desiredDeadline.includes("30") ? 800 : 0;
  const suggested = (baseByType[briefing.projectType] ?? 2200) + featureFactor + integrationFactor + urgencyFactor;

  return {
    suggested,
    range: `${Math.max(800, suggested - 900).toLocaleString("pt-BR")} a ${(
      suggested + 1600
    ).toLocaleString("pt-BR")}`,
    complexity:
      suggested > 7000 ? "Alta" : suggested > 3500 ? "Média" : "Enxuta"
  };
}
