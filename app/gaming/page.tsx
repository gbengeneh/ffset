import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { PageSection, Panel } from "@/components/ui";
import { games, gamingPackages } from "@/lib/site-data";

export default function GamingPage() {
  return (
    <>
      <PageHero
        eyebrow="Gaming"
        title="High-energy play zones built for spectators and competitors."
        description="Snooker and console gaming at FFSET Lounge are not side attractions. They are a major part of the atmosphere, programming, and community growth strategy."
      />
      <PageSection containerClassName="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Panel className="p-6">
            <p className="eyebrow">Available Games</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {games.map((game) => (
                <div key={game} className="rounded-[1.4rem] border border-white/8 bg-white/4 px-4 py-5 text-white">
                  {game}
                </div>
              ))}
            </div>
          </Panel>
        </Reveal>
        <div className="grid gap-6">
          {gamingPackages.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.08}>
              <Panel>
                <p className="eyebrow">{item.price}</p>
                <h2 className="display-font mt-4 text-3xl text-white">{item.name}</h2>
                <p className="mt-4 text-sm leading-8 text-[var(--muted)]">{item.description}</p>
              </Panel>
            </Reveal>
          ))}
        </div>
      </PageSection>
    </>
  );
}
