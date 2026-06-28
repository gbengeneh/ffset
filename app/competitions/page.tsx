import { CompetitionCard } from "@/components/cards";
import { Countdown } from "@/components/countdown";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ActionLink, PageSection, Panel } from "@/components/ui";
import { competitionRules, leaderboard } from "@/lib/site-data";

export default function CompetitionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Competitions"
        title="Cash-prize gaming events with a real tournament presence."
        description="The competition experience is designed to grow into a recurring FFSET signature, with player registration, brackets, leaderboards, and future admin controls."
        primaryCta={{ label: "Register to Play", href: "/competitions/register" }}
      />
      <PageSection containerClassName="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-6">
          <Reveal>
            <CompetitionCard title="FFSET FIFA Championship" fee="₦5,000" prize="₦100,000" />
          </Reveal>
          <Reveal delay={0.08}>
            <Panel>
              <p className="eyebrow">Prize Pool</p>
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
          <Reveal delay={0.16}>
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
              <p className="eyebrow">Countdown</p>
              <h2 className="display-font mt-4 text-3xl text-white">Next championship kickoff</h2>
              <p className="mt-3 text-sm leading-8 text-[var(--muted)]">
                Targeting a premium tournament night atmosphere with check-in and crowd build-up.
              </p>
              <div className="mt-6">
                <Countdown targetDate="2026-12-20T18:00:00+01:00" />
              </div>
            </Panel>
          </Reveal>
          <Reveal delay={0.08}>
            <Panel>
              <p className="eyebrow">Bracket Preview</p>
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
          <Reveal delay={0.16}>
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
                  <div key={entry.player} className="grid grid-cols-[70px_1fr_1fr_80px] gap-3 border-b border-white/6 bg-white/3 px-4 py-4 text-sm last:border-b-0">
                    <span className="text-[var(--gold)]">#{index + 1}</span>
                    <span className="text-white">{entry.player}</span>
                    <span className="text-[var(--muted)]">{entry.game}</span>
                    <span className="text-right text-white">{entry.points}</span>
                  </div>
                ))}
              </div>
              <ActionLink href="/competitions/register" variant="primary" className="mt-6">
                Registration CTA
              </ActionLink>
            </Panel>
          </Reveal>
        </div>
      </PageSection>
    </>
  );
}
