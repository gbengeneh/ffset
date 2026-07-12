import Image from "next/image";
import { Countdown } from "@/components/countdown";
import { Reveal } from "@/components/reveal";
import { RegisterButton } from "@/components/register-button";
import { ActionLink, PageSection, Panel } from "@/components/ui";
import {
  competitionPaymentDetails,
  competitionRules,
  leaderboard,
} from "@/lib/site-data";

const competitionHeroImage =
  "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1600&q=80";

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

        <div className="relative mx-auto w-full max-w-[1180px] px-5 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-9">
          <Reveal>
            <div className="overflow-hidden rounded-[1.6rem] border border-[rgba(213,170,77,0.18)] bg-[linear-gradient(180deg,rgba(15,11,12,0.78),rgba(8,6,7,0.9))] p-4 shadow-[0_26px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-5 md:p-6">
              <p className="eyebrow text-[0.62rem]">Upcoming Event</p>

              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-2">
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                  December 20, 2026 • 6:00 PM • Akure
                </p>
                <Countdown targetDate="2026-12-20T18:00:00+01:00" compact />
              </div>

              <h1 className="display-font mt-3 max-w-[13ch] text-[1.7rem] leading-[1.05] text-white sm:text-[2.15rem] md:text-[2.6rem]">
                FFSET FIFA Championship.
              </h1>
              <p className="mt-2.5 max-w-[32rem] text-[0.85rem] leading-6 text-[rgba(248,241,230,0.82)] sm:text-[0.92rem] sm:leading-7">
                A focused cash-prize tournament with check-in, crowd energy, and a lounge
                atmosphere built around serious play.
              </p>

              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-3 py-2.5">
                  <p className="text-[0.58rem] uppercase tracking-[0.16em] text-[var(--gold)]">
                    Entry Fee
                  </p>
                  <p className="mt-1 text-sm text-white sm:text-base">{competitionPaymentDetails.entryFee}</p>
                </div>
                <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-3 py-2.5">
                  <p className="text-[0.58rem] uppercase tracking-[0.16em] text-[var(--gold)]">
                    Top Prize
                  </p>
                  <p className="mt-1 text-sm text-white sm:text-base">{competitionPaymentDetails.firstPrize}</p>
                </div>
                <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-3 py-2.5">
                  <p className="text-[0.58rem] uppercase tracking-[0.16em] text-[var(--gold)]">
                    Format
                  </p>
                  <p className="mt-1 text-sm text-white sm:text-base">Single Elimination</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2.5">
                  <RegisterButton variant="primary" className="px-4 py-2.5 text-[0.83rem]">
                    Register to Play
                  </RegisterButton>
                  <ActionLink href="/contact" className="px-4 py-2.5 text-[0.83rem]">
                    Ask a Question
                  </ActionLink>
                </div>
                <p className="text-[0.72rem] text-[var(--muted)]">
                  Pay to <span className="text-white">{competitionPaymentDetails.bankName}</span> —{" "}
                  <span className="text-white">{competitionPaymentDetails.accountNumber}</span> (
                  {competitionPaymentDetails.accountName})
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PageSection className="section-space">
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <Panel className="p-4 sm:p-5">
              <p className="eyebrow text-[0.66rem]">Prize Breakdown</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {[
                  ["First Prize", competitionPaymentDetails.firstPrize],
                  ["Second Prize", competitionPaymentDetails.secondPrize],
                  ["Third Prize", competitionPaymentDetails.thirdPrize],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1.1rem] border border-white/8 bg-white/4 p-3">
                    <p className="text-[0.56rem] uppercase tracking-[0.16em] text-[var(--gold)]">{label}</p>
                    <p className="display-font mt-1.5 text-lg text-white sm:text-xl">{value}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={0.08}>
            <Panel className="p-4 sm:p-5">
              <p className="eyebrow text-[0.66rem]">Tournament Rules</p>
              <ul className="mt-3 space-y-2 text-[0.8rem] leading-5 text-[var(--muted)]">
                {competitionRules.map((rule) => (
                  <li key={rule} className="rounded-xl border border-white/7 bg-white/3 px-3 py-2">
                    {rule}
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-2">
            <Panel className="p-4 sm:p-5">
              <p className="eyebrow text-[0.66rem]">Leaderboard Preview</p>
              <div className="mt-3 space-y-2 md:hidden">
                {leaderboard.map((entry, index) => (
                  <div key={entry.player} className="rounded-[1rem] border border-white/8 bg-white/4 p-3 text-[0.8rem]">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[var(--gold)]">#{index + 1}</span>
                      <span className="text-white">{entry.player}</span>
                      <span className="text-white">{entry.points} pts</span>
                    </div>
                    <p className="mt-1 text-[var(--muted)]">{entry.game}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 hidden overflow-hidden rounded-[1.2rem] border border-white/8 md:block">
                {leaderboard.map((entry, index) => (
                  <div
                    key={entry.player}
                    className="grid grid-cols-[70px_1fr_1fr_80px] gap-3 border-b border-white/6 bg-white/3 px-3 py-2.5 text-[0.8rem] last:border-b-0"
                  >
                    <span className="text-[var(--gold)]">#{index + 1}</span>
                    <span className="text-white">{entry.player}</span>
                    <span className="text-[var(--muted)]">{entry.game}</span>
                    <span className="text-right text-white">{entry.points}</span>
                  </div>
                ))}
              </div>
              <RegisterButton variant="primary" className="mt-4 px-4 py-2.5 text-[0.83rem]">
                Secure Your Slot
              </RegisterButton>
            </Panel>
          </Reveal>
        </div>
      </PageSection>
    </>
  );
}
