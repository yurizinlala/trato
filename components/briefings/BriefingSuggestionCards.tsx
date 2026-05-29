import { AlertTriangle, HelpCircle, Layers, WalletCards } from "lucide-react";
import { TratoCard } from "@/components/ui/TratoCard";
import { formatCurrency } from "@/lib/utils";
import type { Briefing } from "@/types/briefing";

export function BriefingSuggestionCards({ briefing }: { briefing: Briefing }) {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      <SuggestionCard
        title="Escopo sugerido"
        icon={<Layers className="h-5 w-5" />}
        body={`${briefing.projectType} com ${briefing.features.length} funcionalidades mapeadas.`}
      />
      <SuggestionCard
        title="Preço sugerido"
        icon={<WalletCards className="h-5 w-5" />}
        body={`${formatCurrency(briefing.features.length * 260 + 2200)} como ponto de partida interno.`}
      />
      <SuggestionCard
        title="Pontos de atenção"
        icon={<AlertTriangle className="h-5 w-5" />}
        body={briefing.attentionPoints.join(" · ")}
        tone="warning"
      />
      <SuggestionCard
        title="Perguntas"
        icon={<HelpCircle className="h-5 w-5" />}
        body={briefing.confirmationQuestions.join(" · ")}
      />
    </div>
  );
}

function SuggestionCard({
  title,
  icon,
  body,
  tone
}: {
  title: string;
  icon: React.ReactNode;
  body: string;
  tone?: "warning";
}) {
  return (
    <TratoCard variant={tone === "warning" ? "warning" : "compact"} className="p-4">
      <div className="flex items-center gap-2 border-b-2 border-ink-black pb-2">
        {icon}
        <h3 className="font-mono text-sm font-bold uppercase">{title}</h3>
      </div>
      <p className="mt-3 text-sm">{body}</p>
    </TratoCard>
  );
}
