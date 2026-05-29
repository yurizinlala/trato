import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { ClientDetailClient } from "@/components/clients/ClientDetailClient";
import { getClient } from "@/lib/mock-data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const client = getClient(id);
  return { title: client?.name ?? "Cliente" };
}

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <AppShell>
      <ClientDetailClient clientId={id} />
    </AppShell>
  );
}
