"use client";

import { useState } from "react";
import { SelectField, TextField } from "@/components/forms/fields";
import { submitFormToTelegram } from "@/components/forms/telegram-submit";
import { Panel } from "@/components/ui";
import { competitionPaymentDetails } from "@/lib/site-data";

export function CompetitionRegisterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="contents"
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
      <Panel className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Full Name" name="fullName" placeholder="Your full name" autoComplete="name" minLength={3} required />
          <TextField label="Phone Number" name="phone" type="tel" placeholder="0800 000 0000" autoComplete="tel" pattern="^[0-9()+ -]{7,}$" required />
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
        <div className="rounded-[1.4rem] border border-[rgba(213,170,77,0.14)] bg-white/[0.03] p-4 text-sm">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--gold)]">Payment Details</p>
          <div className="mt-3 space-y-2 text-[var(--muted)]">
            <p>
              Bank: <span className="text-white">{competitionPaymentDetails.bankName}</span>
            </p>
            <p>
              Account Number: <span className="text-white">{competitionPaymentDetails.accountNumber}</span>
            </p>
            <p>
              Account Name: <span className="text-white">{competitionPaymentDetails.accountName}</span>
            </p>
            <p>
              Entry Fee: <span className="text-white">{competitionPaymentDetails.entryFee}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className="luxury-button luxury-button-primary" disabled={submitting}>
            {submitting ? "Sending..." : "Submit Registration"}
          </button>
          {submitted ? <p className="text-sm text-[var(--gold-soft)]">Registration sent to Telegram successfully.</p> : null}
          {error ? <p className="text-sm text-[rgb(220,145,145)]">{error}</p> : null}
        </div>
      </Panel>
    </form>
  );
}
