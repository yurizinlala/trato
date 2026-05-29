import type { Metadata } from "next";
import { TratoDataProvider } from "@/components/providers/TratoDataProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Trato",
    template: "%s | Trato"
  },
  description:
    "Ferramenta interna para organizar clientes, projetos, briefings, contratos e documentos.",
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <TratoDataProvider>{children}</TratoDataProvider>
      </body>
    </html>
  );
}
