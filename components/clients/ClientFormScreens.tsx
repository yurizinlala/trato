"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageTitle } from "@/components/layout/PageTitle";
import { ClientForm } from "@/components/forms/ClientForm";
import { useTratoData } from "@/components/providers/TratoDataProvider";
import { TratoEmptyState } from "@/components/ui/TratoEmptyState";

export function NewClientScreen() {
  const router = useRouter();
  const { createClient } = useTratoData();

  return (
    <>
      <PageTitle title="Novo cliente | Trato" />
      <PageHeader title="Novo cliente" eyebrow="Cadastro interno" />
      <ClientForm
        onSubmit={async (values) => {
          const client = await createClient(values);
          router.push(`/clientes/${client.id}`);
        }}
      />
    </>
  );
}

export function EditClientScreen({ clientId }: { clientId: string }) {
  const router = useRouter();
  const { clients, updateClient } = useTratoData();
  const client = clients.find((item) => item.id === clientId);

  if (!client) {
    return <TratoEmptyState title="Cliente não encontrado" description="Este cliente não está disponível nesta sessão." actionLabel="Voltar para clientes" actionHref="/clientes" />;
  }

  return (
    <>
      <PageTitle title={`Editar ${client.name} | Trato`} />
      <PageHeader title="Editar cliente" eyebrow={client.name} />
      <ClientForm
        mode="edit"
        defaultValues={{
          name: client.name,
          company: client.company,
          document: client.document,
          email: client.email,
          whatsapp: client.whatsapp,
          city: client.city,
          state: client.state,
          address: client.address,
          notes: client.notes
        }}
        onSubmit={async (values) => {
          await updateClient(client.id, values);
          router.push(`/clientes/${client.id}`);
        }}
      />
    </>
  );
}
