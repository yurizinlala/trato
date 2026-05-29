import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectsPageClient } from "@/components/projects/ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projetos"
};

export default function ProjectsPage() {
  return (
    <AppShell>
      <ProjectsPageClient />
    </AppShell>
  );
}
