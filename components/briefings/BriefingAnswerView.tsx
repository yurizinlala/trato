import { TratoBadge } from "@/components/ui/TratoBadge";
import { TratoCard } from "@/components/ui/TratoCard";
import { TratoWindow } from "@/components/ui/TratoWindow";
import type { Briefing } from "@/types/briefing";
import type { Client } from "@/types/client";

export function BriefingAnswerView({ briefing, client }: { briefing: Briefing; client: Client }) {
  return (
    <TratoWindow title="respostas.briefing" tone="blue">
      <div className="grid gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-xs font-bold uppercase">Cliente</p>
            <h2 className="font-heading text-3xl font-bold">{client.name}</h2>
            <p>{client.company} — {client.email}</p>
          </div>
          <TratoBadge status={briefing.status} />
        </div>
        <TratoCard variant="document">
          <p className="font-mono text-xs font-bold uppercase">Tipo do projeto</p>
          <p className="mt-2 font-heading text-2xl font-bold">{briefing.projectType}</p>
          <p className="mt-3 text-lg">{briefing.objective}</p>
        </TratoCard>
        <div className="grid gap-4 md:grid-cols-2">
          <AnswerList title="Objetivos" items={briefing.goals} />
          <AnswerList title="Funcionalidades" items={briefing.features} />
          <AnswerList
            title="Conteúdo e acessos"
            items={[
              briefing.assets.hasDomain ? "Possui domínio" : "Sem domínio definido",
              briefing.assets.hasHosting ? "Possui hospedagem" : "Sem hospedagem definida",
              briefing.assets.hasLogo ? "Possui logo" : "Logo pendente",
              briefing.assets.hasTexts ? "Textos prontos" : "Textos pendentes",
              briefing.assets.hasImages ? "Imagens prontas" : "Imagens pendentes"
            ]}
          />
          <AnswerList title="Prazos e orçamento" items={[briefing.desiredDeadline, briefing.budgetRange]} />
        </div>
        <TratoCard variant="compact">
          <p className="font-mono text-xs font-bold uppercase">Links de referência</p>
          <p className="mt-2 break-words">{briefing.assets.referenceLinks || "Nenhum link informado."}</p>
        </TratoCard>
      </div>
    </TratoWindow>
  );
}

function AnswerList({ title, items }: { title: string; items: string[] }) {
  return (
    <TratoCard className="bg-soft-sand">
      <h3 className="font-mono text-sm font-bold uppercase">{title}</h3>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item} className="border-2 border-ink-black bg-paper-cream px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </TratoCard>
  );
}
