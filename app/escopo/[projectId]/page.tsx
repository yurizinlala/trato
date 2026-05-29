import { AppShell } from "@/components/layout/AppShell";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScopeForm } from "@/components/forms/ScopeForm";
import { getClient, getProject } from "@/lib/mock-data";

export async function generateMetadata({ params }: { params: Promise<{ projectId: string }> }): Promise<Metadata> {
  const { projectId } = await params;
  const project = getProject(projectId);
  return { title: `Escopo ${project?.name ?? ""}` };
}

export default async function ScopePage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = getProject(projectId);
  const client = getClient(project.clientId);

  return (
    <AppShell>
      <PageHeader
        title="Sugestão de escopo"
        eyebrow={`${client.name} · ${project.name}`}
        description="Edite o escopo sugerido pelo briefing e compare com o preview estruturado antes de aplicar ao projeto."
      />
      <ScopeForm scope={project.scope} projectId={project.id} />
    </AppShell>
  );
}
