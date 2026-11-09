"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Field, FormError } from "@/components/field";
import { authClient } from "@/lib/auth-client";

export function SignInForm() {
  const params = useSearchParams();
  const next = safeNext(params.get("next"));
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    const result =
      mode === "sign-in"
        ? await authClient.signIn.email({ email, password })
        : await authClient.signUp.email({
            email,
            password,
            name: String(fd.get("name") || email.split("@")[0]),
          });
    setPending(false);
    if (result.error) {
      setError(result.error.message ?? "That did not work. Try again.");
      return;
    }
    // A full page load, so no page remembered from before sign-in (such as the
    // redirect that sent you here) is reused.
    window.location.assign(next);
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-5">
      {mode === "sign-up" && <Field name="name" label="Your name" autoComplete="name" />}
      <Field name="email" label="Email" type="email" autoComplete="email" />
      <Field
        name="password"
        label="Password"
        type="password"
        autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
        minLength={8}
        hint="At least 8 characters."
      />
      <FormError message={error} />
      <button type="submit" className="btn btn-primary w-full" disabled={pending}>
        {pending ? "One moment…" : mode === "sign-in" ? "Sign in" : "Create account"}
      </button>
      <p>
        {mode === "sign-in" ? "New here? " : "Already have an account? "}
        <button
          type="button"
          className="link"
          onClick={() => {
            setMode(mode === "sign-in" ? "sign-up" : "sign-in");
            setError(null);
          }}
        >
          {mode === "sign-in" ? "Create an account" : "Sign in instead"}
        </button>
      </p>
    </form>
  );
}

/** Only same-site paths are allowed after sign-in, so a crafted link cannot send people elsewhere. */
function safeNext(raw: string | null) {
  if (!raw || typeof window === "undefined") return "/account";
  try {
    const url = new URL(raw, window.location.origin);
    return url.origin === window.location.origin ? url.pathname + url.search + url.hash : "/account";
  } catch {
    return "/account";
  }
}
