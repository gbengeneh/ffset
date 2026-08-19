"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField } from "@/components/forms/fields";
import { ApiError } from "@/lib/api-client";
import { useAuth } from "@/lib/auth-context";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-white/8 bg-[rgba(15,10,11,0.85)] backdrop-blur-xl p-6 sm:p-8">
        <p className="eyebrow text-[0.68rem]">FFSET Lounge</p>
        <h1 className="display-font mt-2 text-2xl text-white">Admin Console</h1>
        <p className="mt-2 text-[0.83rem] leading-6 text-[var(--muted)]">
          Sign in with your FFSET staff administrator account.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setError(null);
            setSubmitting(true);

            const formData = new FormData(event.currentTarget);
            const email = String(formData.get("email") ?? "");
            const password = String(formData.get("password") ?? "");

            try {
              const user = await login(email, password);

              if (user.role !== "admin") {
                setError("This login is for FFSET staff administrators.");
                setSubmitting(false);
                return;
              }

              router.replace("/admin");
            } catch (submissionError) {
              setError(
                submissionError instanceof ApiError
                  ? submissionError.message
                  : "Unable to sign in right now."
              );
              setSubmitting(false);
            }
          }}
        >
          <TextField label="Email" name="email" type="email" autoComplete="email" required />
          <TextField label="Password" name="password" type="password" autoComplete="current-password" required />

          {error ? <p className="text-[0.83rem] text-[rgb(220,145,145)]">{error}</p> : null}

          <button
            type="submit"
            className="luxury-button luxury-button-primary w-full justify-center px-4 py-3 text-sm"
            disabled={submitting}
          >
            {submitting ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
