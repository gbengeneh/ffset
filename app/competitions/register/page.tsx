import { CompetitionRegisterForm } from "@/components/forms/competition-register-form";
import { Countdown } from "@/components/countdown";
import { PageSection, Panel } from "@/components/ui";
import { formatNaira } from "@/lib/admin-types";
import { getCompetitions } from "@/lib/public-api";
import { bankTransferDetails } from "@/lib/site-data";

export default async function CompetitionRegistrationPage() {
  const competitions = await getCompetitions();
  const competition = competitions[0] ?? null;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,7,8,0.96),rgba(8,6,7,0.92))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(213,170,77,0.12),_transparent_22%),radial-gradient(circle_at_bottom_left,_rgba(127,15,46,0.2),_transparent_26%)]" />

        <div className="relative mx-auto w-full max-w-[1100px] px-5 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-9">
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <Panel className="space-y-3 p-5">
              <p className="eyebrow text-[0.68rem]">Register</p>
              <h1 className="display-font text-[1.6rem] leading-[1.08] text-white sm:text-[2rem]">
                {competition ? `Secure your slot for the ${competition.title}.` : "Registration is not open right now."}
              </h1>
              <p className="text-[0.85rem] leading-6 text-[var(--muted)] sm:text-[0.9rem] sm:leading-7">
                Complete your player details, make payment to the official account below, and
                submit the form so the team can confirm your slot.
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1">
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                  August 28, 2026 • 6:00 PM • Akure
                </p>
                <Countdown targetDate="2026-08-28T18:00:00+01:00" compact />
              </div>
            </Panel>

            <Panel className="space-y-3 p-5">
              <p className="eyebrow text-[0.68rem]">Official Payment Account</p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                <div className="rounded-[1.15rem] border border-white/8 bg-white/[0.03] p-3.5">
                  <p className="text-[0.6rem] uppercase tracking-[0.18em] text-[var(--gold)]">Bank</p>
                  <p className="mt-1.5 text-base text-white">{bankTransferDetails.bankName}</p>
                </div>
                <div className="rounded-[1.15rem] border border-white/8 bg-white/[0.03] p-3.5">
                  <p className="text-[0.6rem] uppercase tracking-[0.18em] text-[var(--gold)]">Entry Fee</p>
                  <p className="mt-1.5 text-base text-white">
                    {competition ? formatNaira(competition.entry_fee) : "—"}
                  </p>
                </div>
                <div className="rounded-[1.15rem] border border-white/8 bg-white/[0.03] p-3.5">
                  <p className="text-[0.6rem] uppercase tracking-[0.18em] text-[var(--gold)]">Account Number</p>
                  <p className="mt-1.5 text-base text-white">{bankTransferDetails.accountNumber}</p>
                </div>
                <div className="rounded-[1.15rem] border border-white/8 bg-white/[0.03] p-3.5">
                  <p className="text-[0.6rem] uppercase tracking-[0.18em] text-[var(--gold)]">Account Name</p>
                  <p className="mt-1.5 text-base text-white">{bankTransferDetails.accountName}</p>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </section>

      <PageSection className="section-space pt-0">
        <Panel className="p-5">
          <p className="eyebrow text-[0.68rem]">Player Details</p>
          <div className="mt-4">
            {competition ? (
              <CompetitionRegisterForm competitionId={competition.id} />
            ) : (
              <p className="text-sm text-[var(--muted)]">
                There are no competitions open for registration right now — check back soon.
              </p>
            )}
          </div>
        </Panel>
      </PageSection>
    </>
  );
}
