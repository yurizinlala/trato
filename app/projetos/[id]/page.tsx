import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectDetailClient } from "@/components/projects/ProjectDetailClient";
import { getProject } from "@/lib/mock-data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  return { title: project?.name ?? "Projeto" };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <AppShell>
      <ProjectDetailClient projectId={id} />
    </AppShell>
  );
}
