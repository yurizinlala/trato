"use server";

import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export type LoginResult = {
  ok: boolean;
  message?: string;
};

export async function signInWithPassword(values: { email: string; password: string; next?: string }): Promise<LoginResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      message: "Supabase ainda não está configurado. Preencha o .env.local para ativar autenticação real."
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password
  });

  if (error) return { ok: false, message: "E-mail ou senha inválidos." };

  return { ok: true };
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  redirect("/login");
}

