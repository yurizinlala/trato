import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { EditProjectScreen } from "@/components/projects/ProjectFormScreens";
import { getProject } from "@/lib/mock-data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  return { title: `Editar ${project?.name ?? "projeto"}` };
}

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <AppShell>
      <EditProjectScreen projectId={id} />
    </AppShell>
  );
}
