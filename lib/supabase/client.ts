"use client";

import { createBrowserClient } from "@supabase/ssr";
import { supabasePublishableKey, supabaseUrl } from "@/lib/supabase/config";

export function createClient() {
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error("Supabase não está configurado. Preencha NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.");
  }

  return createBrowserClient(supabaseUrl, supabasePublishableKey);
}

