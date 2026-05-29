import { AppShell } from "@/components/layout/AppShell";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { DocumentActions } from "@/components/documents/DocumentActions";
import { DocumentPreview } from "@/components/documents/DocumentPreview";
import { TratoBadge } from "@/components/ui/TratoBadge";
import { TratoCard } from "@/components/ui/TratoCard";
import { TratoWindow } from "@/components/ui/TratoWindow";
import { getClient, getDocument, getProject } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const document = getDocument(id);
  return { title: document?.title ?? "Documento" };
}

export default async function DocumentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const document = getDocument(id);
  const client = getClient(document.clientId);
  const project = getProject(document.projectId);

  return (
    <AppShell>
      <PageHeader
        title={document.title}
        eyebrow={`${document.type} · ${client.name}`}
        description={`Projeto vinculado: ${project.name}`}
        actions={<TratoBadge status={document.status} />}
      />
      <div className="grid gap-6 xl:grid-cols-document-sidebar">
        <DocumentPreview title={document.type === "Contrato" ? "Contrato de Serviço" : document.title} subtitle={document.fileName} document={document} />
        <div className="grid h-fit gap-6">
          <DocumentActions documentId={document.id} />
          <TratoWindow title="metadados">
            <dl className="grid gap-4">
              {[
                ["Nome do arquivo", document.fileName],
                ["Cliente vinculado", client.name],
                ["Projeto", project.name],
                ["Criado em", formatDate(document.date)],
                ["Tipo", document.type]
              ].map(([label, value]) => (
                <div key={label} className="border-b-2 border-ink-black pb-2">
                  <dt className="font-mono text-xs font-bold uppercase">{label}</dt>
                  <dd className="text-lg">{value}</dd>
                </div>
              ))}
            </dl>
          </TratoWindow>
          <TratoWindow title="histórico.de.versões">
            <div className="grid gap-3">
              {document.versionHistory.map((version) => (
                <TratoCard key={version.version} variant="compact" className="bg-paper-cream">
                  <strong>{version.version}</strong>
                  <p>{version.note}</p>
                  <p className="font-mono text-xs uppercase text-ink-black/70">{formatDate(version.date)}</p>
                </TratoCard>
              ))}
            </div>
          </TratoWindow>
        </div>
      </div>
    </AppShell>
  );
}
