"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageTitle } from "@/components/layout/PageTitle";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { useTratoData } from "@/components/providers/TratoDataProvider";
import { TratoEmptyState } from "@/components/ui/TratoEmptyState";

export function NewProjectScreen() {
  const router = useRouter();
  const { clients, createProject } = useTratoData();

  return (
    <>
      <PageTitle title="Novo projeto | Trato" />
      <PageHeader title="Novo projeto" eyebrow="Criar workspace" />
      <ProjectForm
        clients={clients}
        onSubmit={(values) => {
          const project = createProject(values);
          router.push(`/projetos/${project.id}`);
        }}
      />
    </>
  );
}

export function EditProjectScreen({ projectId }: { projectId: string }) {
  const router = useRouter();
  const { clients, projects, updateProject } = useTratoData();
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return <TratoEmptyState title="Projeto não encontrado" description="Este projeto não está disponível nesta sessão." actionLabel="Voltar para projetos" actionHref="/projetos" />;
  }

  return (
    <>
      <PageTitle title={`Editar ${project.name} | Trato`} />
      <PageHeader title="Editar projeto" eyebrow={project.name} />
      <ProjectForm
        mode="edit"
        projectId={project.id}
        clients={clients}
        defaultValues={{
          clientId: project.clientId,
          name: project.name,
          type: project.type,
          description: project.description,
          desiredDeadline: project.desiredDeadline,
          notes: project.scope.notes
        }}
        onSubmit={(values) => {
          updateProject(project.id, values);
          router.push(`/projetos/${project.id}`);
        }}
      />
    </>
  );
}
