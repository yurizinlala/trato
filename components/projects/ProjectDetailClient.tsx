"use client";

import { Edit, FileText, Link2, ScrollText, Sparkles, Trash2, WalletCards } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageTitle } from "@/components/layout/PageTitle";
import { BriefingAnswerView } from "@/components/briefings/BriefingAnswerView";
import { ProjectReadinessChecklist } from "@/components/projects/ProjectReadinessChecklist";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";
import { ProjectSummaryCards } from "@/components/projects/ProjectSummaryCards";
import { useTratoData } from "@/components/providers/TratoDataProvider";
import { TratoBadge } from "@/components/ui/TratoBadge";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoCard } from "@/components/ui/TratoCard";
import { TratoEmptyState } from "@/components/ui/TratoEmptyState";
import { TratoModal } from "@/components/ui/TratoModal";
import { TratoTable } from "@/components/ui/TratoTable";
import { TratoTabs } from "@/components/ui/TratoTabs";
import { TratoWindow } from "@/components/ui/TratoWindow";
import { briefings, contracts, documents } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { ProjectHistoryEvent } from "@/types/project";

const tabs = [
  { label: "Resumo", value: "resumo" },
  { label: "Briefing", value: "briefing" },
  { label: "Escopo", value: "escopo" },
  { label: "Preço", value: "preco" },
  { label: "Contratos", value: "contratos" },
  { label: "Documentos", value: "documentos" },
  { label: "Histórico", value: "historico" }
];

const historyTypeLabels: Record<ProjectHistoryEvent["type"], string> = {
  created: "criação",
  updated: "atualização",
  briefing: "briefing",
  contract: "contrato",
  document: "documento"
};

export function ProjectDetailClient({ projectId }: { projectId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { clients, projects, readiness, deleteProject, toggleProjectReadinessItem } = useTratoData();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return <TratoEmptyState title="Projeto não encontrado" description="Este projeto não está disponível nesta sessão." actionLabel="Voltar para projetos" actionHref="/projetos" />;
  }

  const client = clients.find((item) => item.id === project.clientId) ?? {
    id: "missing",
    name: "Cliente removido",
    company: "Cliente removido",
    document: "",
    email: "",
    whatsapp: "",
    city: "",
    state: "",
    notes: "",
    projectIds: [],
    lastActivity: project.updatedAt
  };
  const briefing = project.briefingId ? briefings.find((item) => item.id === project.briefingId) : undefined;
  const projectContracts = contracts.filter((contract) => contract.projectId === project.id);
  const projectDocuments = documents.filter((document) => document.projectId === project.id);
  const activeTab = tabs.some((tab) => tab.value === searchParams.get("tab")) ? searchParams.get("tab") ?? "resumo" : "resumo";
  const storedHistory = project.history ?? [];
  const hasCreatedEvent = storedHistory.some((event) => event.type === "created");
  const hasUpdatedEventForCurrentDate = storedHistory.some((event) => event.type === "updated" && event.date === project.updatedAt);
  const historyEvents: ProjectHistoryEvent[] = [
    ...(hasCreatedEvent
      ? []
      : [{
          id: `${project.id}-created-fallback`,
          title: "Projeto criado",
          date: project.createdAt,
          type: "created" as const,
          detail: "Registro inicial do projeto."
        }]),
    ...storedHistory,
    ...(project.updatedAt !== project.createdAt && !hasUpdatedEventForCurrentDate
      ? [{
          id: `${project.id}-updated-fallback`,
          title: "Projeto atualizado",
          date: project.updatedAt,
          type: "updated" as const,
          detail: "Dados do projeto atualizados."
        }]
      : []),
    ...(briefing
      ? [{
          id: `${briefing.id}-received`,
          title: "Briefing recebido",
          date: briefing.receivedAt,
          type: "briefing" as const,
          detail: `${briefing.projectType} recebido para análise.`
        }]
      : []),
    ...projectContracts.map((contract) => ({
      id: `${contract.id}-contract`,
      title: "Contrato gerado",
      date: contract.createdAt,
      type: "contract" as const,
      detail: contract.name
    })),
    ...projectDocuments.map((document) => ({
      id: `${document.id}-document`,
      title: "Documento gerado",
      date: document.date,
      type: "document" as const,
      detail: document.title
    }))
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const readinessItems = [
    { label: "Cliente cadastrado", description: client.name, done: client.id !== "missing" },
    { label: "Briefing recebido", description: briefing ? formatDate(briefing.receivedAt) : "Gerar link público", done: Boolean(briefing) },
    { label: "Escopo revisado", description: project.scope.summary, done: ["escopo_aprovado", "contrato_gerado", "em_desenvolvimento"].includes(project.status) },
    { label: "Valor final definido", description: formatCurrency(project.finalPrice), done: project.finalPrice > 0 },
    { label: "Dados de pagamento definidos", description: project.paymentTerms, done: Boolean(project.paymentTerms) },
    { label: "Cláusulas revisadas", description: "Revisar minuta antes de envio", done: project.contractIds.length > 0 },
    { label: "Documento pronto", description: `${projectDocuments.length} documento(s)`, done: projectDocuments.length > 0 }
  ].map((item) => ({
    ...item,
    done: readiness[project.id]?.[item.label] ?? item.done
  }));

  const changeTab = (value: string) => {
    router.push(`${pathname}?tab=${value}`, { scroll: false });
  };

  return (
    <>
      <PageTitle title={`${project.name} | Trato`} />
      <PageHeader
        title={project.name}
        eyebrow={`${client.company} · ${project.type}`}
        description={project.description}
        actions={
          <>
            <TratoButton href={`/projetos/${project.id}/editar`} variant="outline" icon={<Edit className="h-5 w-5" />}>Editar projeto</TratoButton>
            <TratoButton variant="danger" icon={<Trash2 className="h-5 w-5" />} onClick={() => setConfirmDelete(true)}>Excluir</TratoButton>
            <TratoButton href="/briefing/portfolio-carlos-2026" icon={<Link2 className="h-5 w-5" />}>Gerar link de briefing</TratoButton>
            {briefing ? <TratoButton href={`/briefings/${briefing.id}`} variant="outline">Ver briefing</TratoButton> : null}
            <TratoButton href={`/escopo/${project.id}`} variant="outline" icon={<Sparkles className="h-5 w-5" />}>Sugerir escopo</TratoButton>
            <TratoButton href={`/preco/${project.id}`} variant="secondary" icon={<WalletCards className="h-5 w-5" />}>Sugerir preço</TratoButton>
            <TratoButton href={`/documentos/${projectDocuments[0]?.id ?? "doc-portfolio-proposta"}`} variant="outline" icon={<FileText className="h-5 w-5" />}>Gerar proposta</TratoButton>
            <TratoButton href={`/contratos/${projectContracts[0]?.id ?? "cont-portfolio"}`} icon={<ScrollText className="h-5 w-5" />}>Gerar contrato</TratoButton>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <ProjectStatusBadge status={project.status} />
        <span className="font-mono text-sm font-bold uppercase">Atualizado em {formatDate(project.updatedAt)}</span>
      </div>

      <TratoTabs active={activeTab} tabs={tabs} onChange={changeTab} />

      <div className="grid gap-6 xl:grid-cols-project-sidebar">
        <div className="min-w-0">
          {activeTab === "resumo" ? <ProjectSummaryCards project={project} /> : null}

          {activeTab === "briefing" ? (
            briefing ? <BriefingAnswerView briefing={briefing} client={client} /> : <TratoEmptyState title="Sem briefing" description="Este projeto ainda não recebeu briefing." />
          ) : null}

          {activeTab === "escopo" ? (
            <TratoWindow title="escopo.resumo" tone="blue">
              <div className="grid gap-4 md:grid-cols-2">
                <TratoCard variant="document">
                  <p className="font-mono text-xs font-bold uppercase">Incluído</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5">
                    {[...project.scope.includedPages, ...project.scope.includedFeatures].map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </TratoCard>
                <TratoCard variant="warning">
                  <p className="font-mono text-xs font-bold uppercase">Não incluído</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5">
                    {project.scope.excludedFeatures.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </TratoCard>
              </div>
            </TratoWindow>
          ) : null}

          {activeTab === "preco" ? (
            <TratoWindow title="preço.interno" tone="orange">
              <div className="grid gap-4 md:grid-cols-3">
                <TratoCard variant="document">
                  <p className="font-mono text-xs font-bold uppercase">Valor sugerido</p>
                  <strong className="mt-2 block font-heading text-2xl">{formatCurrency(project.suggestedPrice)}</strong>
                </TratoCard>
                <TratoCard variant="document">
                  <p className="font-mono text-xs font-bold uppercase">Valor final</p>
                  <strong className="mt-2 block font-heading text-2xl">{formatCurrency(project.finalPrice)}</strong>
                </TratoCard>
                <TratoCard variant="warning">
                  <p className="font-mono text-xs font-bold uppercase">Pagamento</p>
                  <strong className="mt-2 block break-words font-heading text-lg">{project.paymentTerms}</strong>
                </TratoCard>
              </div>
            </TratoWindow>
          ) : null}

          {activeTab === "contratos" ? (
            <TratoWindow title="contratos">
              <TratoTable
                rows={projectContracts}
                getRowKey={(row) => row.id}
                stickyActions
                empty={<TratoEmptyState title="Sem contratos" description="Nenhum contrato foi gerado para este projeto." />}
                columns={[
                  { key: "name", label: "Contrato", priority: "primary", render: (row) => <strong>{row.name}</strong> },
                  { key: "status", label: "Status", nowrap: true, render: (row) => <TratoBadge status={row.status} /> },
                  { key: "updatedAt", label: "Atualizado", nowrap: true, render: (row) => formatDate(row.updatedAt) },
                  { key: "id", label: "Ações", priority: "actions", render: (row) => <TratoButton href={`/contratos/${row.id}`} size="sm" variant="outline">Abrir</TratoButton> }
                ]}
              />
            </TratoWindow>
          ) : null}

          {activeTab === "documentos" ? (
            <TratoWindow title="documentos">
              <TratoTable
                rows={projectDocuments}
                getRowKey={(row) => row.id}
                stickyActions
                empty={<TratoEmptyState title="Sem documentos" description="Nenhum documento foi gerado para este projeto." />}
                columns={[
                  { key: "title", label: "Documento", priority: "primary", render: (row) => <strong>{row.title}</strong> },
                  { key: "type", label: "Tipo" },
                  { key: "status", label: "Status", nowrap: true, render: (row) => <TratoBadge status={row.status} /> },
                  { key: "date", label: "Data", nowrap: true, render: (row) => formatDate(row.date) },
                  { key: "id", label: "Ações", priority: "actions", render: (row) => <TratoButton href={`/documentos/${row.id}`} size="sm" variant="outline">Abrir</TratoButton> }
                ]}
              />
            </TratoWindow>
          ) : null}

          {activeTab === "historico" ? (
            <TratoWindow title="histórico">
              <div className="grid gap-3">
                {historyEvents.map((event) => (
                  <TratoCard key={event.id} variant="compact" className="bg-paper-cream">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <strong>{event.title}</strong>
                      <span className="font-mono text-xs font-bold uppercase text-ink-black/70">{formatDate(event.date)}</span>
                    </div>
                    {event.detail ? <p className="mt-1 text-sm text-ink-black/75">{event.detail}</p> : null}
                    <p className="mt-2 font-mono text-xs uppercase text-ink-black/70">{historyTypeLabels[event.type]}</p>
                  </TratoCard>
                ))}
              </div>
            </TratoWindow>
          ) : null}
        </div>
        <ProjectReadinessChecklist
          items={readinessItems}
          onToggle={(item) => toggleProjectReadinessItem(project.id, item.label, item.done)}
        />
      </div>

      <TratoModal open={confirmDelete} title="excluir.projeto" onClose={() => setConfirmDelete(false)}>
        <div className="grid gap-4">
          <p>Excluir este projeto remove o registro apenas desta sessão mockada.</p>
          <div className="flex flex-wrap gap-3">
            <TratoButton
              variant="danger"
              onClick={() => {
                deleteProject(project.id);
                router.push("/projetos");
              }}
            >
              Excluir
            </TratoButton>
            <TratoButton variant="outline" onClick={() => setConfirmDelete(false)}>Cancelar</TratoButton>
          </div>
        </div>
      </TratoModal>
    </>
  );
}
