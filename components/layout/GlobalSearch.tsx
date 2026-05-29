"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useRef, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useTratoData } from "@/components/providers/TratoDataProvider";
import { TratoInput } from "@/components/ui/TratoInput";
import { briefings, contracts, documents } from "@/lib/mock-data";
import { normalizeText } from "@/lib/utils";

type SearchItem = {
  type: "Cliente" | "Projeto" | "Briefing" | "Contrato" | "Documento";
  title: string;
  subtitle: string;
  href: string;
};

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { clients, projects } = useTratoData();

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const items = useMemo<SearchItem[]>(() => {
    const clientName = (clientId: string) =>
      clients.find((client) => client.id === clientId)?.name ?? "Cliente removido";
    const projectName = (projectId: string) =>
      projects.find((project) => project.id === projectId)?.name ?? "Projeto removido";

    return [
      ...clients.map((client) => ({
        type: "Cliente" as const,
        title: client.name,
        subtitle: `${client.company} · ${client.email}`,
        href: `/clientes/${client.id}`
      })),
      ...projects.map((project) => ({
        type: "Projeto" as const,
        title: project.name,
        subtitle: `${clientName(project.clientId)} · ${project.type}`,
        href: `/projetos/${project.id}`
      })),
      ...briefings.map((briefing) => ({
        type: "Briefing" as const,
        title: projectName(briefing.projectId),
        subtitle: `${clientName(briefing.clientId)} · ${briefing.projectType}`,
        href: `/briefings/${briefing.id}`
      })),
      ...contracts.map((contract) => ({
        type: "Contrato" as const,
        title: contract.name,
        subtitle: `${clientName(contract.clientId)} · ${projectName(contract.projectId)}`,
        href: `/contratos/${contract.id}`
      })),
      ...documents.map((document) => ({
        type: "Documento" as const,
        title: document.title,
        subtitle: `${document.type} · ${clientName(document.clientId)}`,
        href: `/documentos/${document.id}`
      }))
    ];
  }, [clients, projects]);

  const results = useMemo(() => {
    const term = normalizeText(deferredQuery);
    if (!term) return [];
    return items
      .filter((item) => normalizeText(`${item.type} ${item.title} ${item.subtitle}`).includes(term))
      .slice(0, 8);
  }, [deferredQuery, items]);

  const grouped = useMemo(
    () =>
      results.reduce<Record<string, SearchItem[]>>((groups, item) => {
        groups[item.type] = [...(groups[item.type] ?? []), item];
        return groups;
      }, {}),
    [results]
  );

  return (
    <div ref={wrapperRef} className="relative hidden w-full max-w-2xl lg:block">
      <TratoInput
        label="Busca global"
        hideLabel
        leftIcon={<Search className="h-5 w-5" />}
        className="bg-paper-cream font-mono text-sm uppercase"
        placeholder="Buscar projetos, clientes..."
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
          if (event.key === "Enter" && results[0]) window.location.href = results[0].href;
        }}
      />

      {open && query ? (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto border-3 border-ink-black bg-paper-cream p-3 shadow-hard-lg">
          {results.length ? (
            <div className="grid gap-3">
              {Object.entries(grouped).map(([type, group]) => (
                <div key={type} className="grid gap-2">
                  <p className="font-mono text-xs font-bold uppercase text-ink-black/65">{type}</p>
                  {group.map((item) => (
                    <Link
                      key={`${item.type}-${item.href}`}
                      className="trato-focus block border-2 border-ink-black bg-soft-sand px-3 py-2 transition hover:bg-soft-gray"
                      href={item.href}
                      onClick={() => setOpen(false)}
                    >
                      <strong className="font-heading text-sm uppercase">{item.title}</strong>
                      <p className="mt-1 text-xs text-ink-black/70">{item.subtitle}</p>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p className="px-3 py-4 font-mono text-sm font-bold uppercase">Nenhum resultado encontrado.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
