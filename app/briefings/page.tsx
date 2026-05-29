import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { BriefingsPageClient } from "@/components/briefings/BriefingsPageClient";

export const metadata: Metadata = {
  title: "Briefings"
};

export default function BriefingsPage() {
  return (
    <AppShell>
      <BriefingsPageClient />
    </AppShell>
  );
}
