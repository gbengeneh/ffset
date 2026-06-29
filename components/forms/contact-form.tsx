"use client";

import { useState } from "react";
import { TextAreaField, TextField } from "@/components/forms/fields";
import { submitFormToTelegram } from "@/components/forms/telegram-submit";
import { Panel } from "@/components/ui";

export function ContactForm() {
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
            formType: "Contact Message",
            fields: [
              { label: "Full Name", value: formData.get("fullName") },
              { label: "Email Address", value: formData.get("email") },
              { label: "Phone Number", value: formData.get("phone") },
              { label: "Message", value: formData.get("message") },
            ],
          });

          form.reset();
          setSubmitted(true);
        } catch (submissionError) {
          setError(
            submissionError instanceof Error
              ? submissionError.message
              : "Contact submission failed."
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Panel className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Full Name" name="fullName" placeholder="Your full name" autoComplete="name" minLength={3} required />
          <TextField label="Email Address" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
        </div>
        <TextField label="Phone Number" name="phone" type="tel" placeholder="0800 000 0000" autoComplete="tel" pattern="^[0-9+()\\-\\s]{7,}$" />
        <TextAreaField label="Message" name="message" className="min-h-36" placeholder="Tell us what you need for booking, wines, events, or collaborations." minLength={12} maxLength={500} required />
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className="luxury-button luxury-button-primary" disabled={submitting}>
            {submitting ? "Sending..." : "Send Message"}
          </button>
          {submitted ? <p className="text-sm text-[var(--gold-soft)]">Message sent to Telegram successfully.</p> : null}
          {error ? <p className="text-sm text-[rgb(220,145,145)]">{error}</p> : null}
        </div>
      </Panel>
    </form>
  );
}
