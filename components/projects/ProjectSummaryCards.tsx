import { CalendarDays, CircleDollarSign, ClipboardCheck, FileType, Target } from "lucide-react";
import { TratoCard } from "@/components/ui/TratoCard";
import { formatCurrency } from "@/lib/utils";
import type { Project } from "@/types/project";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";

export function ProjectSummaryCards({ project }: { project: Project }) {
  const cards = [
    { label: "Tipo de projeto", value: project.type, icon: <FileType className="h-6 w-6" /> },
    { label: "Objetivo", value: project.objective, icon: <Target className="h-6 w-6" /> },
    { label: "Prazo", value: project.desiredDeadline, icon: <CalendarDays className="h-6 w-6" /> },
    { label: "Valor sugerido", value: formatCurrency(project.suggestedPrice), icon: <CircleDollarSign className="h-6 w-6" /> },
    { label: "Valor final", value: formatCurrency(project.finalPrice), icon: <CircleDollarSign className="h-6 w-6" /> },
    { label: "Status atual", value: <ProjectStatusBadge status={project.status} />, icon: <ClipboardCheck className="h-6 w-6" /> }
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
      {cards.map((card) => (
        <TratoCard key={card.label} className="min-w-0 bg-paper-cream">
          <div className="flex min-w-0 gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center border-3 border-ink-black bg-soft-gray text-pen-blue shadow-hard-sm">
              {card.icon}
            </div>
            <div className="min-w-0">
              <p className="font-mono text-xs font-bold uppercase text-ink-black/70">{card.label}</p>
              <div className="mt-2 break-words font-heading text-lg font-bold leading-snug">{card.value}</div>
            </div>
          </div>
        </TratoCard>
      ))}
    </div>
  );
}
