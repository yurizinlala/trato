"use client";

import { Briefcase, FileText, Link2, Pencil } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageTitle } from "@/components/layout/PageTitle";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";
import { useTratoData } from "@/components/providers/TratoDataProvider";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoCard } from "@/components/ui/TratoCard";
import { TratoEmptyState } from "@/components/ui/TratoEmptyState";
import { TratoTable } from "@/components/ui/TratoTable";
import { TratoWindow } from "@/components/ui/TratoWindow";
import { documents } from "@/lib/mock-data";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";

export function ClientDetailClient({ clientId }: { clientId: string }) {
  const { clients, projects } = useTratoData();
  const client = clients.find((item) => item.id === clientId);

  if (!client) {
    return <TratoEmptyState title="Cliente não encontrado" description="Este cliente não está disponível nesta sessão." actionLabel="Voltar para clientes" actionHref="/clientes" />;
  }

  const relatedProjects = projects.filter((project) => project.clientId === client.id);
  const relatedDocuments = documents.filter((document) => document.clientId === client.id);

  return (
    <>
      <PageTitle title={`${client.name} | Trato`} />
      <PageHeader
        title={client.name}
        eyebrow={client.company}
        description={`${client.city}/${client.state} - ${client.email}`}
        actions={
          <>
            <TratoButton href={`/clientes/${client.id}/editar`} variant="outline" icon={<Pencil className="h-5 w-5" />}>Editar cliente</TratoButton>
            <TratoButton href="/projetos/novo" variant="secondary" icon={<Briefcase className="h-5 w-5" />}>Novo projeto</TratoButton>
            <TratoButton href="/briefing/portfolio-carlos-2026" icon={<Link2 className="h-5 w-5" />}>Gerar briefing</TratoButton>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-client-detail">
        <div className="grid gap-6">
          <TratoCard className="bg-soft-sand text-center">
            <div className="mx-auto grid h-24 w-24 place-items-center border-3 border-ink-black bg-pen-blue font-heading text-3xl font-bold text-paper-cream shadow-hard">
              {getInitials(client.name)}
            </div>
            <h2 className="mt-5 font-heading text-3xl font-bold">{client.name}</h2>
            <p className="font-mono text-sm uppercase">{client.company}</p>
          </TratoCard>
          <TratoWindow title="contato">
            <dl className="grid gap-3 text-sm">
              {[
                ["CPF/CNPJ", client.document],
                ["E-mail", client.email],
                ["WhatsApp", client.whatsapp],
                ["Cidade/UF", `${client.city}/${client.state}`],
                ["Endereço", client.address ?? "Não informado"],
                ["Última atividade", formatDate(client.lastActivity)]
              ].map(([label, value]) => (
                <div key={label} className="border-b-2 border-ink-black pb-2">
                  <dt className="font-mono text-xs font-bold uppercase">{label}</dt>
                  <dd className="break-words">{value}</dd>
                </div>
              ))}
            </dl>
          </TratoWindow>
          <TratoWindow title="observações.internas" tone="orange">
            <p>{client.notes}</p>
          </TratoWindow>
        </div>

        <div className="grid gap-6">
          <TratoWindow title="projetos.relacionados" tone="blue">
            <TratoTable
              rows={relatedProjects}
              getRowKey={(row) => row.id}
              mobileRender={(project) => (
                <div className="grid gap-3">
                  <h3 className="font-heading text-xl font-bold">{project.name}</h3>
                  <ProjectStatusBadge status={project.status} />
                  <p>{project.type} · {formatCurrency(project.finalPrice)}</p>
                  <TratoButton href={`/projetos/${project.id}`} size="sm" variant="outline">Abrir</TratoButton>
                </div>
              )}
              columns={[
                { key: "name", label: "Projeto", priority: "primary", render: (row) => <strong>{row.name}</strong> },
                { key: "type", label: "Tipo" },
                { key: "status", label: "Status", nowrap: true, render: (row) => <ProjectStatusBadge status={row.status} /> },
                { key: "finalPrice", label: "Valor final", nowrap: true, render: (row) => formatCurrency(row.finalPrice) },
                { key: "id", label: "Ações", priority: "actions", render: (row) => <TratoButton href={`/projetos/${row.id}`} size="sm" variant="outline">Abrir</TratoButton> }
              ]}
            />
          </TratoWindow>
          <TratoWindow title="documentos.gerados">
            <div className="grid gap-3 md:grid-cols-2">
              {relatedDocuments.map((document) => (
                <a key={document.id} href={`/documentos/${document.id}`}>
                  <TratoCard variant="compact" className="bg-paper-cream transition hover:bg-soft-gray">
                    <FileText className="h-5 w-5 text-pen-blue" />
                    <h3 className="mt-2 font-heading text-xl font-bold">{document.title}</h3>
                    <p className="font-mono text-xs uppercase">{document.type} · {formatDate(document.date)}</p>
                  </TratoCard>
                </a>
              ))}
            </div>
          </TratoWindow>
        </div>
      </div>
    </>
  );
}
