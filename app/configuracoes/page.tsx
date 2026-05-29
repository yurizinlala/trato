import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { SettingsForm } from "@/components/forms/SettingsForm";
import { settings } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Configurações"
};

export default function SettingsPage() {
  return (
    <AppShell>
      <PageHeader title="Configurações" eyebrow="Preferências internas" />
      <SettingsForm settings={settings} />
    </AppShell>
  );
}
