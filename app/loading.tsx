import { TratoWindow } from "@/components/ui/TratoWindow";

export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-paper-cream p-6">
      <TratoWindow title="carregando.trato" className="w-full max-w-lg">
        <div className="grid gap-4">
          <p className="font-mono text-sm font-bold uppercase">Organizando dados mockados...</p>
          <div className="h-5 overflow-hidden border-3 border-ink-black bg-paper-cream">
            <div className="h-full origin-left animate-scan-pulse bg-trato-orange" />
          </div>
        </div>
      </TratoWindow>
    </main>
  );
}
