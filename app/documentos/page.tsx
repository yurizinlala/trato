import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { DocumentsPageClient } from "@/components/documents/DocumentsPageClient";

export const metadata: Metadata = {
  title: "Documentos"
};

export default function DocumentsPage() {
  return (
    <AppShell>
      <DocumentsPageClient />
    </AppShell>
  );
}
