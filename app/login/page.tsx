"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/admin";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    setIsLoading(false);

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { message?: string } | null;
      setMessage(data?.message || "Login gagal.");
      return;
    }

    router.push(nextPath.startsWith("/") ? nextPath : "/admin");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-4 py-10 text-white">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Website
        </Link>

        <form onSubmit={login} className="glass rounded-[8px] p-7 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10">
              <LockKeyhole className="h-5 w-5 text-[#c9a75d]" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.38em] text-[#c9a75d]">Login Admin</p>
            <h1 className="font-display mt-3 text-5xl font-semibold leading-none">Masuk Admin</h1>
            <p className="mt-4 text-sm leading-6 text-white/58">Masukkan username dan password untuk mengedit website.</p>
          </div>

          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/56">Username</span>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                className="h-12 rounded-[8px] border border-white/12 bg-white/8 px-4 text-sm text-white outline-none transition focus:border-[#c9a75d]/70"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/56">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                className="h-12 rounded-[8px] border border-white/12 bg-white/8 px-4 text-sm text-white outline-none transition focus:border-[#c9a75d]/70"
              />
            </label>
          </div>

          {message ? <p className="mt-4 rounded-[8px] border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">{message}</p> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-950 transition hover:bg-[#d7dadd] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Masuk..." : "Masuk"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
