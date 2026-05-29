import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export type DevUser = {
  id: "dev-user";
  email: "dev@trato.local";
};

export async function getCurrentUser(): Promise<User | DevUser | null> {
  if (!isSupabaseConfigured()) {
    return { id: "dev-user", email: "dev@trato.local" };
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

