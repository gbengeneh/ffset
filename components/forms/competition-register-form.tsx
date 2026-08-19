"use client";

import { useState } from "react";
import { SelectField, TextField } from "@/components/forms/fields";
import { initializePayment } from "@/lib/payment";
import { PublicApiError, submitPublicForm } from "@/lib/public-form";
import { games } from "@/lib/site-data";

type CompetitionRegisterFormProps = {
  competitionId: number;
  onSuccess?: () => void;
};

type RegistrationResponse = {
  sale_id: number | null;
};

export function CompetitionRegisterForm({ competitionId, onSuccess }: CompetitionRegisterFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saleId, setSaleId] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [payingNow, setPayingNow] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <p className="text-[0.9rem] text-[var(--gold-soft)]">Registration received.</p>
        <p className="mt-1.5 text-[0.78rem] leading-5 text-[var(--muted)]">
          Your slot will be confirmed once the team verifies your payment. If you don&apos;t hear back
          within 24 hours, please message <span className="text-white">0906 770 4282</span>.
        </p>
        {saleId ? (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="luxury-button luxury-button-primary text-[0.8rem]"
              disabled={payingNow}
              onClick={async () => {
                setPayError(null);
                setPayingNow(true);
                try {
                  const { authorization_url } = await initializePayment(saleId, email);
                  window.location.href = authorization_url;
                } catch (payingError) {
                  setPayError(
                    payingError instanceof PublicApiError ? payingError.message : "Could not start payment."
                  );
                  setPayingNow(false);
                }
              }}
            >
              {payingNow ? "Redirecting..." : "Pay Now with Card"}
            </button>
            {payError ? <p className="text-[0.78rem] text-[rgb(220,145,145)]">{payError}</p> : null}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setError(null);
        setPayError(null);
        setSubmitted(false);
        setSubmitting(true);

        const form = event.currentTarget;
        const formData = new FormData(form);
        const submittedEmail = String(formData.get("email") ?? "");

        try {
          const response = await submitPublicForm<RegistrationResponse>(
            `/competitions/${competitionId}/register`,
            {
              name: formData.get("fullName"),
              phone: formData.get("phone"),
              email: submittedEmail,
              gamertag: formData.get("gamerTag"),
              game: formData.get("preferredGame"),
              state: formData.get("state"),
            }
          );

          form.reset();
          setSubmitted(true);
          setSaleId(response.sale_id);
          setEmail(submittedEmail);
          onSuccess?.();
        } catch (submissionError) {
          setError(
            submissionError instanceof PublicApiError
              ? submissionError.message
              : "Competition registration failed."
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <div className="grid gap-3.5 md:grid-cols-2">
        <TextField label="Full Name" name="fullName" placeholder="Your full name" autoComplete="name" minLength={3} required />
        <TextField label="Phone Number" name="phone" type="tel" placeholder="0800 000 0000" autoComplete="tel" minLength={7} required />
        <TextField label="Email Address" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
        <TextField label="Gamertag / Player Name" name="gamerTag" placeholder="Your competition alias" minLength={2} required />
        <SelectField
          label="Preferred Game"
          name="preferredGame"
          defaultValue=""
          required
          options={[
            { label: "Select preferred game", value: "" },
            ...games.map((game) => ({ label: game, value: game })),
          ]}
        />
        <TextField label="State" name="state" placeholder="Ondo" autoComplete="address-level1" required />
      </div>
      <div className="flex flex-wrap items-center gap-3.5 pt-1">
        <button type="submit" className="luxury-button luxury-button-primary text-[0.83rem]" disabled={submitting}>
          {submitting ? "Sending..." : "Submit Registration"}
        </button>
        {error ? <p className="text-[0.83rem] text-[rgb(220,145,145)]">{error}</p> : null}
      </div>
    </form>
  );
}
