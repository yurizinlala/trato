import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { NewProjectScreen } from "@/components/projects/ProjectFormScreens";

export const metadata: Metadata = {
  title: "Novo projeto"
};

export default function NewProjectPage() {
  return (
    <AppShell>
      <NewProjectScreen />
    </AppShell>
  );
}
