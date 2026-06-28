"use client";

import { useState } from "react";
import { TextAreaField, TextField } from "@/components/forms/fields";
import { Panel } from "@/components/ui";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="contents"
      onSubmit={(event) => {
        event.preventDefault();
        // TODO: Connect contact form to CRM/mail backend.
        setSubmitted(true);
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
          <button type="submit" className="luxury-button luxury-button-primary">
            Send Message
          </button>
          {submitted ? <p className="text-sm text-[var(--gold-soft)]">Message captured. Backend delivery will be connected in the next integration phase.</p> : null}
        </div>
      </Panel>
    </form>
  );
}
