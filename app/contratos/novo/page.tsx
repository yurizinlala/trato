import { AppShell } from "@/components/layout/AppShell";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContractForm } from "@/components/forms/ContractForm";
import { clients, projects } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Novo contrato"
};

export default function NewContractPage() {
  return (
    <AppShell>
      <PageHeader title="Novo contrato" eyebrow="Gerar minuta" description="Selecione cliente, projeto e template para criar a minuta inicial." />
      <ContractForm clients={clients} projects={projects} />
    </AppShell>
  );
}
