import { MessageCircle, ScrollText, Sparkles, WalletCards } from "lucide-react";
import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { BriefingAnswerView } from "@/components/briefings/BriefingAnswerView";
import { BriefingSuggestionCards } from "@/components/briefings/BriefingSuggestionCards";
import { TratoButton } from "@/components/ui/TratoButton";
import { getBriefing, getClient } from "@/lib/mock-data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const briefing = getBriefing(id);
  const client = getClient(briefing.clientId);
  return { title: `Briefing ${client?.name ?? ""}` };
}

export default async function BriefingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const briefing = getBriefing(id);
  const client = getClient(briefing.clientId);

  return (
    <AppShell>
      <PageHeader
        title="Revisar briefing"
        eyebrow={`${client.name} · ${briefing.projectType}`}
        description="Confira respostas, pontos de atenção e sugestões internas antes de formalizar o escopo."
        actions={
          <>
            <TratoButton href={`/escopo/${briefing.projectId}`} icon={<Sparkles className="h-5 w-5" />}>Transformar em escopo</TratoButton>
            <TratoButton href={`/preco/${briefing.projectId}`} variant="secondary" icon={<WalletCards className="h-5 w-5" />}>Sugerir preço</TratoButton>
            <TratoButton href={`/clientes/${client.id}`} variant="outline" icon={<MessageCircle className="h-5 w-5" />}>Confirmar com cliente</TratoButton>
            <TratoButton href="/contratos/novo" icon={<ScrollText className="h-5 w-5" />}>Gerar contrato</TratoButton>
          </>
        }
      />
      <BriefingAnswerView briefing={briefing} client={client} />
      <BriefingSuggestionCards briefing={briefing} />
    </AppShell>
  );
}
