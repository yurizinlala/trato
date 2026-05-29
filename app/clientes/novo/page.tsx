import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { NewClientScreen } from "@/components/clients/ClientFormScreens";

export const metadata: Metadata = {
  title: "Novo cliente"
};

export default function NewClientPage() {
  return (
    <AppShell>
      <NewClientScreen />
    </AppShell>
  );
}
