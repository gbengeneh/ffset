"use client";

import { useState } from "react";
import { TextAreaField, TextField } from "@/components/forms/fields";
import { Panel } from "@/components/ui";

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="contents"
      onSubmit={(event) => {
        event.preventDefault();
        // TODO: Connect reservation form to backend/API.
        setSubmitted(true);
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
          <button type="submit" className="luxury-button luxury-button-primary">
            Reserve Table
          </button>
          {submitted ? <p className="text-sm text-[var(--gold-soft)]">Reservation request captured. Confirmation workflow will be connected soon.</p> : null}
        </div>
      </Panel>
    </form>
  );
}
