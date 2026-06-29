import { CompetitionRegisterForm } from "@/components/forms/competition-register-form";
import { PageSection, Panel } from "@/components/ui";
import { competitionPaymentDetails } from "@/lib/site-data";

export default function CompetitionRegistrationPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,7,8,0.96),rgba(8,6,7,0.92))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(213,170,77,0.12),_transparent_22%),radial-gradient(circle_at_bottom_left,_rgba(127,15,46,0.2),_transparent_26%)]" />

        <div className="relative mx-auto w-full max-w-[1100px] px-5 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <Panel className="space-y-5">
              <p className="eyebrow">Register</p>
              <h1 className="display-font text-[2.1rem] leading-[0.96] text-white sm:text-[2.8rem]">
                Secure your slot for the next FFSET championship.
              </h1>
              <p className="text-sm leading-7 text-[var(--muted)] sm:text-[0.98rem] sm:leading-8">
                Complete your player details, make payment to the official account below, and
                submit the registration form so the team can confirm your slot.
              </p>
            </Panel>

            <Panel className="space-y-4">
              <p className="eyebrow">Official Payment Account</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">Bank</p>
                  <p className="mt-2 text-lg text-white">{competitionPaymentDetails.bankName}</p>
                </div>
                <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">Entry Fee</p>
                  <p className="mt-2 text-lg text-white">{competitionPaymentDetails.entryFee}</p>
                </div>
                <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">Account Number</p>
                  <p className="mt-2 text-lg text-white">{competitionPaymentDetails.accountNumber}</p>
                </div>
                <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">Account Name</p>
                  <p className="mt-2 text-lg text-white">{competitionPaymentDetails.accountName}</p>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </section>

      <PageSection className="section-space pt-0">
        <CompetitionRegisterForm />
      </PageSection>
    </>
  );
}
