"use client";

import { useState } from "react";
import { TextAreaField, TextField } from "@/components/forms/fields";
import { submitFormToTelegram } from "@/components/forms/telegram-submit";
import { Panel } from "@/components/ui";

export function BookingForm() {
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
            formType: "Booking Request",
            fields: [
              { label: "Full Name", value: formData.get("fullName") },
              { label: "Phone Number", value: formData.get("phone") },
              { label: "Date", value: formData.get("date") },
              { label: "Time", value: formData.get("time") },
              { label: "Number of Guests", value: formData.get("guests") },
              { label: "Occasion", value: formData.get("occasion") },
              { label: "Special Request", value: formData.get("specialRequest") },
            ],
          });

          form.reset();
          setSubmitted(true);
        } catch (submissionError) {
          setError(
            submissionError instanceof Error
              ? submissionError.message
              : "Booking submission failed."
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Panel className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Full Name" name="fullName" placeholder="Your full name" autoComplete="name" minLength={3} required />
          <TextField label="Phone Number" name="phone" type="tel" placeholder="0800 000 0000" autoComplete="tel" pattern="^[0-9+()\\-\\s]{7,}$" hint="Use a reachable phone number for booking confirmation." required />
          <TextField label="Date" name="date" type="date" required />
          <TextField label="Time" name="time" type="time" required />
          <TextField label="Number of Guests" name="guests" type="number" min="1" max="30" required />
          <TextField label="Occasion" name="occasion" placeholder="Birthday, catch-up, viewing night" />
        </div>
        <TextAreaField label="Special Request" name="specialRequest" className="min-h-32" placeholder="Tell FFSET about seating, bottle service, or any special setup you want." maxLength={300} />
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className="luxury-button luxury-button-primary" disabled={submitting}>
            {submitting ? "Sending..." : "Reserve Table"}
          </button>
          {submitted ? <p className="text-sm text-[var(--gold-soft)]">Reservation request sent to Telegram successfully.</p> : null}
          {error ? <p className="text-sm text-[rgb(220,145,145)]">{error}</p> : null}
        </div>
      </Panel>
    </form>
  );
}
