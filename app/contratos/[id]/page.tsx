import { AppShell } from "@/components/layout/AppShell";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContractForm } from "@/components/forms/ContractForm";
import { ContractPreview } from "@/components/documents/ContractPreview";
import { TratoBadge } from "@/components/ui/TratoBadge";
import { TratoWindow } from "@/components/ui/TratoWindow";
import { clients, getClient, getContract, getProject, projects } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const contract = getContract(id);
  return { title: contract?.name ?? "Contrato" };
}

export default async function ContractDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const contract = getContract(id);
  const client = getClient(contract.clientId);
  const project = getProject(contract.projectId);

  return (
    <AppShell>
      <PageHeader
        title="Gerador de contrato"
        eyebrow={`${client.name} · ${project.name}`}
        description={`Última edição em ${formatDate(contract.updatedAt)}.`}
        actions={<TratoBadge status={contract.status} />}
      />
      <div className="grid gap-6 xl:grid-cols-contract-editor">
        <ContractForm clients={clients} projects={projects} contract={contract} />
        <TratoWindow title="visualização.a4" tone="blue" bodyClassName="bg-soft-gray p-6">
          <ContractPreview contract={contract} />
        </TratoWindow>
      </div>
    </AppShell>
  );
}
