import { AppShell } from "@/components/layout/AppShell";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PriceForm } from "@/components/forms/PriceForm";
import { getClient, getProject } from "@/lib/mock-data";

export async function generateMetadata({ params }: { params: Promise<{ projectId: string }> }): Promise<Metadata> {
  const { projectId } = await params;
  const project = getProject(projectId);
  return { title: `Preço ${project?.name ?? ""}` };
}

export default async function PricePage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = getProject(projectId);
  const client = getClient(project.clientId);

  return (
    <AppShell>
      <PageHeader
        title="Precificação interna"
        eyebrow={`${client.company} · ${project.name}`}
        description="Ajuste a sugestão de preço sem expor valores automáticos ao cliente."
      />
      <PriceForm
        projectId={project.id}
        suggestedPrice={project.suggestedPrice}
        finalPrice={project.finalPrice}
        paymentTerms={project.paymentTerms}
      />
    </AppShell>
  );
}
