"use client";

import { useState } from "react";
import { SelectField, TextField } from "@/components/forms/fields";
import { Panel } from "@/components/ui";

export function CompetitionRegisterForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="contents"
      onSubmit={(event) => {
        event.preventDefault();
        // TODO: Connect competition registration to backend/API and payment provider.
        setSubmitted(true);
      }}
    >
      <Panel className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Full Name" name="fullName" placeholder="Your full name" autoComplete="name" minLength={3} required />
          <TextField label="Phone Number" name="phone" type="tel" placeholder="0800 000 0000" autoComplete="tel" pattern="^[0-9+()\\-\\s]{7,}$" required />
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
        </div>
        <p className="text-sm text-[var(--muted)]">Payment integration will be added soon.</p>
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className="luxury-button luxury-button-primary">
            Submit Registration
          </button>
          {submitted ? <p className="text-sm text-[var(--gold-soft)]">Registration received. The live payment and player management flow will be connected next.</p> : null}
        </div>
      </Panel>
    </form>
  );
}
