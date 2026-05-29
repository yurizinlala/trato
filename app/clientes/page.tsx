import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { ClientsPageClient } from "@/components/clients/ClientsPageClient";

export const metadata: Metadata = {
  title: "Clientes"
};

export default function ClientsPage() {
  return (
    <AppShell>
      <ClientsPageClient />
    </AppShell>
  );
}
