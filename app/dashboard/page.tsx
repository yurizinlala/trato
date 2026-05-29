import { Briefcase, FileText, Link2, ScrollText, UserPlus } from "lucide-react";
import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoCard } from "@/components/ui/TratoCard";
import { TratoStatCard } from "@/components/ui/TratoStatCard";
import { TratoTable } from "@/components/ui/TratoTable";
import { TratoWindow } from "@/components/ui/TratoWindow";
import { activities, briefings, clients, dashboardMetrics, projects } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard"
};

export default function DashboardPage() {
  const recentProjects = projects.slice(0, 4).map((project) => ({
    ...project,
    client: clients.find((client) => client.id === project.clientId)?.name ?? "Cliente"
  }));

  return (
    <AppShell>
      <PageHeader eyebrow="Bem-vindo de volta, Estúdio Trato" title="Painel de Tratos" />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <TratoButton href="/clientes/novo" variant="outline" size="lg" icon={<UserPlus className="h-6 w-6" />}>Novo cliente</TratoButton>
        <TratoButton href="/projetos/novo" variant="secondary" size="lg" icon={<Briefcase className="h-6 w-6" />}>Novo projeto</TratoButton>
        <TratoButton href="/briefing/portfolio-carlos-2026" variant="outline" size="lg" icon={<Link2 className="h-6 w-6" />}>Gerar link de briefing</TratoButton>
        <TratoButton href="/contratos/novo" size="lg" icon={<ScrollText className="h-6 w-6" />}>Criar contrato</TratoButton>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <TratoStatCard label="Projetos recentes" value={dashboardMetrics.recentProjects} icon={<Briefcase />} />
        <TratoStatCard label="Briefings recebidos" value={dashboardMetrics.receivedBriefings.toString().padStart(2, "0")} icon={<Link2 />} />
        <TratoStatCard label="Documentos gerados" value={dashboardMetrics.generatedDocuments} icon={<FileText />} />
        <TratoStatCard label="Contratos prontos" value={dashboardMetrics.readyContracts.toString().padStart(2, "0")} icon={<ScrollText />} />
      </section>

      <TratoWindow title="activity.log" tone="blue">
        <SectionHeader title="Projetos recentes" actions={<TratoButton href="/projetos" variant="ghost" size="sm">Ver todos</TratoButton>} />
        <div className="mt-5">
          <TratoTable
            rows={recentProjects}
            getRowKey={(row) => row.id}
            stickyActions
            columns={[
              { key: "name", label: "Cliente/Projeto", priority: "primary", render: (row) => <div><strong>{row.name}</strong><p>{row.client}</p></div> },
              { key: "type", label: "Tipo" },
              { key: "status", label: "Status", nowrap: true, render: (row) => <ProjectStatusBadge status={row.status} /> },
              { key: "finalPrice", label: "Valor", nowrap: true, render: (row) => formatCurrency(row.finalPrice) },
              { key: "id", label: "Ação", priority: "actions", render: (row) => <TratoButton href={`/projetos/${row.id}`} size="sm" variant="outline">Abrir</TratoButton> }
            ]}
          />
        </div>
      </TratoWindow>

      <TratoWindow title="briefings.recebidos">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {briefings.map((briefing) => {
            const client = clients.find((item) => item.id === briefing.clientId);
            return (
              <TratoCard key={briefing.id} variant="compact" className="grid min-h-full gap-3">
                <ProjectStatusBadge status={briefing.status} />
                <div>
                  <p className="font-mono text-xs font-bold uppercase">{formatDate(briefing.receivedAt)}</p>
                  <h3 className="mt-2 break-words font-heading text-xl font-bold">{client?.name}</h3>
                  <p className="text-sm">{briefing.projectType}</p>
                </div>
                <TratoButton className="mt-auto w-full" href={`/briefings/${briefing.id}`} size="sm" variant="outline">Ver</TratoButton>
              </TratoCard>
            );
          })}
        </div>
      </TratoWindow>

      <TratoWindow title="status.projetos" tone="orange">
        <div className="grid gap-3 md:grid-cols-2">
          {activities.map((activity) => (
            <a key={activity.id} href={activity.href}>
              <TratoCard variant="compact" className="bg-paper-cream transition hover:bg-soft-gray">
                <div className="flex items-center justify-between gap-3">
                  <strong>{activity.title}</strong>
                  <ProjectStatusBadge status={activity.status} />
                </div>
                <p className="mt-1 text-sm text-ink-black/70">{activity.detail}</p>
              </TratoCard>
            </a>
          ))}
        </div>
      </TratoWindow>
    </AppShell>
  );
}
