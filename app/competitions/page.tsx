import Image from "next/image";
import { Countdown } from "@/components/countdown";
import { Reveal } from "@/components/reveal";
import { ActionLink, PageSection, Panel } from "@/components/ui";
import {
  competitionPaymentDetails,
  competitionRules,
  leaderboard,
} from "@/lib/site-data";

const competitionHeroImage =
  "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1600&q=80";

export default function CompetitionsPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={competitionHeroImage}
            alt="FFSET competition atmosphere"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(6,4,5,0.96)_10%,rgba(7,5,6,0.88)_48%,rgba(7,5,6,0.72)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(213,170,77,0.14),_transparent_20%)]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1180px] px-5 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <div className="overflow-hidden rounded-[2rem] border border-[rgba(213,170,77,0.18)] bg-[linear-gradient(180deg,rgba(15,11,12,0.78),rgba(8,6,7,0.9))] p-5 shadow-[0_26px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-6 md:p-7">
                <p className="eyebrow text-[0.68rem]">Upcoming Event</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  December 20, 2026 • 6:00 PM • Akure
                </p>
                <h1 className="display-font mt-5 max-w-[12ch] text-[2.15rem] leading-[0.96] text-white sm:text-[2.9rem] md:text-[3.7rem]">
                  FFSET FIFA Championship.
                </h1>
                <p className="mt-4 max-w-[35rem] text-[0.95rem] leading-7 text-[rgba(248,241,230,0.82)] sm:text-base sm:leading-8">
                  A focused cash-prize tournament experience with check-in, crowd energy, and a
                  premium lounge atmosphere built around serious play.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-4">
                    <p className="text-[0.66rem] uppercase tracking-[0.2em] text-[var(--gold)]">
                      Entry Fee
                    </p>
                    <p className="mt-2 text-lg text-white">{competitionPaymentDetails.entryFee}</p>
                  </div>
                  <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-4">
                    <p className="text-[0.66rem] uppercase tracking-[0.2em] text-[var(--gold)]">
                      Top Prize
                    </p>
                    <p className="mt-2 text-lg text-white">{competitionPaymentDetails.firstPrize}</p>
                  </div>
                  <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-4">
                    <p className="text-[0.66rem] uppercase tracking-[0.2em] text-[var(--gold)]">
                      Format
                    </p>
                    <p className="mt-2 text-lg text-white">Single Elimination</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <ActionLink href="/competitions/register" variant="primary">
                    Register to Play
                  </ActionLink>
                  <ActionLink href="/contact">Ask a Question</ActionLink>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <Panel className="space-y-5">
                <p className="eyebrow text-[0.68rem]">Countdown</p>
                <h2 className="display-font text-[1.9rem] text-white sm:text-[2.2rem]">
                  Kickoff is getting closer.
                </h2>
                <Countdown targetDate="2026-12-20T18:00:00+01:00" />
                <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4 text-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
                    Payment Account
                  </p>
                  <p className="mt-3 text-[var(--muted)]">
                    {competitionPaymentDetails.bankName}
                  </p>
                  <p className="mt-1 text-white">{competitionPaymentDetails.accountNumber}</p>
                  <p className="mt-1 text-white">{competitionPaymentDetails.accountName}</p>
                </div>
              </Panel>
            </Reveal>
          </div>
        </div>
      </section>

      <PageSection className="section-space">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Panel>
              <p className="eyebrow">Prize Breakdown</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  ["First Prize", competitionPaymentDetails.firstPrize],
                  ["Second Prize", competitionPaymentDetails.secondPrize],
                  ["Third Prize", competitionPaymentDetails.thirdPrize],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1.5rem] border border-white/8 bg-white/4 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--gold)]">{label}</p>
                    <p className="display-font mt-3 text-3xl text-white">{value}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={0.08}>
            <Panel>
              <p className="eyebrow">Tournament Rules</p>
              <ul className="mt-5 space-y-3 text-sm leading-8 text-[var(--muted)]">
                {competitionRules.map((rule) => (
                  <li key={rule} className="rounded-2xl border border-white/7 bg-white/3 px-4 py-3">
                    {rule}
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-2">
            <Panel>
              <p className="eyebrow">Leaderboard Preview</p>
              <div className="mt-5 space-y-3 md:hidden">
                {leaderboard.map((entry, index) => (
                  <div key={entry.player} className="rounded-[1.35rem] border border-white/8 bg-white/4 p-4 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[var(--gold)]">#{index + 1}</span>
                      <span className="text-white">{entry.player}</span>
                      <span className="text-white">{entry.points} pts</span>
                    </div>
                    <p className="mt-2 text-[var(--muted)]">{entry.game}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 hidden overflow-hidden rounded-[1.6rem] border border-white/8 md:block">
                {leaderboard.map((entry, index) => (
                  <div
                    key={entry.player}
                    className="grid grid-cols-[70px_1fr_1fr_80px] gap-3 border-b border-white/6 bg-white/3 px-4 py-4 text-sm last:border-b-0"
                  >
                    <span className="text-[var(--gold)]">#{index + 1}</span>
                    <span className="text-white">{entry.player}</span>
                    <span className="text-[var(--muted)]">{entry.game}</span>
                    <span className="text-right text-white">{entry.points}</span>
                  </div>
                ))}
              </div>
              <ActionLink href="/competitions/register" variant="primary" className="mt-6">
                Secure Your Slot
              </ActionLink>
            </Panel>
          </Reveal>
        </div>
      </PageSection>
    </>
  );
}
