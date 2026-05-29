import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { EditClientScreen } from "@/components/clients/ClientFormScreens";
import { getClient } from "@/lib/mock-data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const client = getClient(id);
  return { title: `Editar ${client?.name ?? "cliente"}` };
}

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <AppShell>
      <EditClientScreen clientId={id} />
    </AppShell>
  );
}
