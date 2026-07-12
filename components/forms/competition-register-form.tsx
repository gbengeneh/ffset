"use client";

import { useState } from "react";
import { SelectField, TextField } from "@/components/forms/fields";
import { submitFormToTelegram } from "@/components/forms/telegram-submit";

type CompetitionRegisterFormProps = {
  onSuccess?: () => void;
};

export function CompetitionRegisterForm({ onSuccess }: CompetitionRegisterFormProps = {}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setError(null);
        setSubmitted(false);
        setSubmitting(true);

        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
          await submitFormToTelegram({
            formType: "Competition Registration",
            fields: [
              { label: "Full Name", value: formData.get("fullName") },
              { label: "Phone Number", value: formData.get("phone") },
              { label: "Email Address", value: formData.get("email") },
              { label: "Gamertag / Player Name", value: formData.get("gamerTag") },
              { label: "Preferred Game", value: formData.get("preferredGame") },
              { label: "State", value: formData.get("state") },
              { label: "Payment Name", value: formData.get("paymentName") },
            ],
          });

          form.reset();
          setSubmitted(true);
          onSuccess?.();
        } catch (submissionError) {
          setError(
            submissionError instanceof Error
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
            { label: "EA FC / FIFA", value: "ea-fc" },
            { label: "Mortal Kombat", value: "mortal-kombat" },
            { label: "Call of Duty", value: "call-of-duty" },
            { label: "NBA 2K", value: "nba-2k" },
          ]}
        />
        <TextField label="State" name="state" placeholder="Ondo" autoComplete="address-level1" required />
        <TextField
          label="Payment Name"
          name="paymentName"
          placeholder="Name used for bank transfer"
          minLength={2}
          required
        />
      </div>
      <div className="flex flex-wrap items-center gap-3.5 pt-1">
        <button type="submit" className="luxury-button luxury-button-primary text-[0.83rem]" disabled={submitting}>
          {submitting ? "Sending..." : "Submit Registration"}
        </button>
        {submitted ? (
          <p className="text-[0.83rem] text-[var(--gold-soft)]">Registration sent to Telegram successfully.</p>
        ) : null}
        {error ? <p className="text-[0.83rem] text-[rgb(220,145,145)]">{error}</p> : null}
      </div>
    </form>
  );
}
