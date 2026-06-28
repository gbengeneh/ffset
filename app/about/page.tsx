import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { PageSection, Panel } from "@/components/ui";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About FFSET"
        title="A premium entertainment lounge with lifestyle ambition."
        description="FFSET Lounge is rooted in Akure and built around refined wines, gaming culture, social energy, and future branch expansion into Lagos."
      />
      <PageSection containerClassName="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <Panel className="overflow-hidden rounded-[1.9rem] p-0">
            <div className="relative aspect-[4/5]">
              <Image
                src="/ceo.jpeg"
                alt="OBIDEYI OLUWASEYI, CEO of FFSET Lounge"
                fill
                loading="lazy"
                className="object-cover object-center"
              />
            </div>
          </Panel>
        </Reveal>
        <div className="grid gap-6">
          <Reveal>
            <Panel className="p-6">
              <p className="eyebrow">Leadership</p>
              <h2 className="display-font mt-4 text-4xl text-white">
                OBIDEYI OLUWASEYI is driving the FFSET Lounge vision.
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--muted)]">
                As CEO of FFSET Lounge, OBIDEYI OLUWASEYI is building more than a place to sit
                with a bottle. The brand is being shaped as an atmosphere-first destination for
                premium hangouts, gaming nights, snooker sessions, private moments, and
                community-driven competitions.
              </p>
            </Panel>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal delay={0.08}>
              <Panel>
                <p className="eyebrow">Mission</p>
                <p className="mt-4 text-sm leading-8 text-[var(--muted)]">
                  To create Akure&apos;s most memorable premium lounge experience by combining
                  hospitality, entertainment, and design-led social culture.
                </p>
              </Panel>
            </Reveal>
            <Reveal delay={0.16}>
              <Panel>
                <p className="eyebrow">Vision</p>
                <p className="mt-4 text-sm leading-8 text-[var(--muted)]">
                  To evolve into a recognizable Nigerian lifestyle brand with Lagos expansion,
                  future digital booking, and integrated event management.
                </p>
              </Panel>
            </Reveal>
          </div>
        </div>
      </PageSection>
    </>
  );
}
