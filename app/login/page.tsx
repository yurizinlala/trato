"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInWithPassword } from "@/lib/auth/actions";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoInput } from "@/components/ui/TratoInput";
import { TratoLogo } from "@/components/ui/TratoLogo";
import { TratoNotice } from "@/components/ui/TratoNotice";
import { TratoWindow } from "@/components/ui/TratoWindow";

const loginSchema = z.object({
  email: z.string().email("Informe um e-mail válido."),
  password: z.string().min(4, "Informe a senha.")
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState("");
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "dev@trato.com.br", password: "trato" }
  });

  return (
    <main className="grid min-h-screen place-items-center bg-paper-cream p-5">
      <TratoWindow title="trato_login.exe" tone="default" className="w-full max-w-xl shadow-hard-orange">
        <form
          className="grid gap-6 p-2"
          onSubmit={handleSubmit((values) => {
            setServerError("");
            startTransition(async () => {
              const result = await signInWithPassword({
                ...values,
                next: searchParams.get("next") ?? "/dashboard"
              });

              if (!result.ok) {
                setServerError(result.message ?? "Não foi possível entrar.");
                return;
              }

              router.push(searchParams.get("next") ?? "/dashboard");
              router.refresh();
            });
          })}
        >
          <div className="grid place-items-center gap-4 py-4 text-center">
            <TratoLogo href="" inverted className="text-6xl" />
            <h1 className="font-heading text-3xl font-bold uppercase">
              Organize briefings, escopos e contratos sem bagunça.
            </h1>
            <span className="border-2 border-ink-black bg-warning-yellow px-3 py-1 font-mono text-xs font-bold uppercase">
              Acesso interno
            </span>
          </div>
          {serverError ? <TratoNotice tone="warning">{serverError}</TratoNotice> : null}
          <TratoInput label="E-mail" type="email" error={errors.email?.message} {...register("email")} />
          <TratoInput label="Senha" type="password" error={errors.password?.message} {...register("password")} />
          <TratoButton type="submit" size="lg" disabled={isPending} icon={<LogIn className="h-5 w-5" />}>
            {isPending ? "Entrando..." : "Entrar"}
          </TratoButton>
        </form>
      </TratoWindow>
    </main>
  );
}
