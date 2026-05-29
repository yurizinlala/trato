"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";
import type { BriefingFormValues } from "@/lib/schemas/briefing.schema";

export async function submitPublicBriefing(token: string, values: BriefingFormValues) {
  if (!isSupabaseAdminConfigured()) {
    return { ok: true, stored: false };
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("briefings").upsert(
    {
      id: `brief-${token}`,
      token,
      received_at: new Date().toISOString().slice(0, 10),
      status: "briefing_recebido",
      project_type: values.projectType,
      objective: values.objective,
      goals: values.goals,
      features: values.features,
      assets: {
        hasDomain: values.hasDomain,
        hasHosting: values.hasHosting,
        hasLogo: values.hasLogo,
        hasTexts: values.hasTexts,
        hasImages: values.hasImages,
        hasReferences: values.hasReferences,
        referenceLinks: values.referenceLinks ?? "",
        notes: values.notes ?? "",
        client: {
          name: values.name,
          company: values.company,
          document: values.document,
          email: values.email,
          whatsapp: values.whatsapp,
          cityState: values.cityState
        }
      },
      desired_deadline: `${values.desiredDeadline} dias`,
      budget_range: values.budgetRange,
      attention_points: [],
      confirmation_questions: []
    },
    { onConflict: "token" }
  );

  if (error) {
    console.error(error);
    return { ok: false, stored: false };
  }

  return { ok: true, stored: true };
}

