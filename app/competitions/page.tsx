import Image from "next/image";
import { Countdown } from "@/components/countdown";
import { Reveal } from "@/components/reveal";
import { ActionLink, PageSection, Panel } from "@/components/ui";
import { competitionRules, leaderboard } from "@/lib/site-data";

const competitionHeroImage =
  "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1600&q=80";

function TrophyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 text-[var(--gold-soft)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 4h8v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V4Z" />
      <path d="M9 20h6" />
      <path d="M12 10v10" />
      <path d="M6 6H4a3 3 0 0 0 3 3" />
      <path d="M18 6h2a3 3 0 0 1-3 3" />
    </svg>
  );
}

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
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(6,4,5,0.96)_6%,rgba(7,5,6,0.88)_42%,rgba(7,5,6,0.56)_68%,rgba(5,4,5,0.94)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(213,170,77,0.18),_transparent_22%),radial-gradient(circle_at_bottom_left,_rgba(127,15,46,0.28),_transparent_28%)]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1320px] px-5 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12 xl:px-10">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] xl:items-end">
            <Reveal>
              <div className="overflow-hidden rounded-[2rem] border border-[rgba(213,170,77,0.2)] bg-[linear-gradient(180deg,rgba(16,12,13,0.8),rgba(9,7,8,0.9))] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.26)] backdrop-blur-xl sm:p-6 md:p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(213,170,77,0.24)] bg-[rgba(213,170,77,0.08)]">
                    <TrophyIcon />
                  </div>
                  <div>
                    <p className="eyebrow text-[0.68rem]">Upcoming Event</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                      December 20, 2026 • 6:00 PM
                    </p>
                  </div>
                </div>

                <h1 className="display-font mt-5 text-[2.2rem] leading-[0.96] text-white sm:text-[2.8rem] md:text-[3.4rem] xl:max-w-[11ch] xl:text-[4.15rem]">
                  FFSET FIFA Championship.
                </h1>

                <p className="mt-4 max-w-[38rem] text-[0.95rem] leading-7 text-[rgba(248,241,230,0.82)] sm:text-base sm:leading-8">
                  A cash-prize gaming night built to feel like a real tournament event, with
                  player check-in, crowd energy, bracket drama, and a premium lounge atmosphere.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    ["Entry Fee", "₦5,000"],
                    ["Top Prize", "₦100,000"],
                    ["Location", "Akure"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-4"
                    >
                      <p className="text-[0.66rem] uppercase tracking-[0.2em] text-[var(--gold)]">
                        {label}
                      </p>
                      <p className="mt-2 text-lg text-white">{value}</p>
                    </div>
                  ))}
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
              <div className="overflow-hidden rounded-[2rem] border border-[rgba(213,170,77,0.18)] bg-[linear-gradient(180deg,rgba(17,13,14,0.82),rgba(8,6,7,0.94))] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-6">
                <p className="eyebrow text-[0.68rem]">Kickoff Countdown</p>
                <h2 className="display-font mt-3 text-[1.9rem] text-white sm:text-[2.2rem]">
                  Next championship begins soon.
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)] sm:text-[0.95rem]">
                  The countdown stays visible on mobile first so visitors immediately understand the
                  urgency and the event timing before reading anything else.
                </p>
                <div className="mt-5">
                  <Countdown targetDate="2026-12-20T18:00:00+01:00" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <PageSection className="section-space">
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-6">
            <Reveal>
              <Panel>
                <p className="eyebrow">Prize Pool</p>
                <h2 className="display-font mt-4 text-3xl text-white">Real rewards, real stakes.</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {[
                    ["First Prize", "₦100,000"],
                    ["Second Prize", "₦50,000"],
                    ["Third Prize", "₦30,000"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[1.6rem] border border-white/8 bg-white/4 p-4">
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
          </div>

          <div className="grid gap-6">
            <Reveal>
              <Panel>
                <p className="eyebrow">Bracket Preview</p>
                <h2 className="display-font mt-4 text-3xl text-white">From group tension to final match.</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {[
                    ["Quarter Finals", "AceJay vs Shadow7", "PadKing vs RYB"],
                    ["Semi Finals", "Winner QF1 vs Winner QF2", "Winner QF3 vs Winner QF4"],
                    ["Final", "Semi Winner A vs Semi Winner B", "Grand Prize Match"],
                  ].map(([stage, matchA, matchB]) => (
                    <div key={stage} className="rounded-[1.6rem] border border-white/8 bg-white/4 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">{stage}</p>
                      <p className="mt-3 text-sm text-white">{matchA}</p>
                      <p className="mt-2 text-sm text-[var(--muted)]">{matchB}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            </Reveal>

            <Reveal delay={0.08}>
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
        </div>
      </PageSection>
    </>
  );
}
