import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { PageSection, Panel } from "@/components/ui";

function MissionIcon() {
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
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function VisionIcon() {
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
      <path d="m12 3 1.8 4.6L18 9.4l-4.2 1.7L12 16l-1.8-4.9L6 9.4l4.2-1.8L12 3Z" />
      <path d="M19 16.5v3M17.5 18h3" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About FFSET"
        title="A premium entertainment lounge with lifestyle ambition."
        description="FFSET Lounge is rooted in Akure and built around refined wines, gaming culture, and social energy."
      />
      <PageSection containerClassName="grid gap-1 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <Panel className="overflow-hidden rounded-[1.6rem] p-0">
            <div className="relative aspect-[4/5]">
              <Image
                src="/ceo2.jpeg"
                alt="OBIDEYI OLUWASEYI, CEO of FFSET Lounge"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[center_18%] rounded-2xl sm:rounded-[1.6rem]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(6,4,5,0.85)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className="text-[0.95rem] font-medium text-white sm:text-base">OBIDEYI OLUWASEYI</p>
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--gold)]">
                  Founder &amp; CEO
                </p>
              </div>
            </div>
          </Panel>
        </Reveal>

        <div className="grid gap-5">
          <Reveal>
            <Panel className="p-5 sm:p-6">
              <p className="eyebrow text-[0.68rem]">Leadership</p>
              <h2 className="display-font mt-2.5 text-[1.5rem] leading-[1.15] text-white sm:text-[1.8rem]">
                Building more than a place to sit with a bottle.
              </h2>
              <p className="mt-3 text-[0.85rem] leading-6 text-[var(--muted)] sm:text-[0.92rem] sm:leading-7">
                OBIDEYI OLUWASEYI is shaping FFSET as an atmosphere-first destination for lounge
                nights, gaming, snooker, private hangouts, and community-driven competitions.
              </p>
            </Panel>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            <Reveal delay={0.08}>
              <Panel className="h-full p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(213,170,77,0.26)] bg-[rgba(213,170,77,0.08)]">
                  <MissionIcon />
                </div>
                <p className="eyebrow mt-3 text-[0.68rem]">Mission</p>
                <p className="mt-2 text-[0.85rem] leading-6 text-[var(--muted)]">
                  To create Akure&apos;s most memorable lounge experience by combining hospitality,
                  entertainment, and design-led social culture.
                </p>
              </Panel>
            </Reveal>
            <Reveal delay={0.16}>
              <Panel className="h-full p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(213,170,77,0.26)] bg-[rgba(213,170,77,0.08)]">
                  <VisionIcon />
                </div>
                <p className="eyebrow mt-3 text-[0.68rem]">Vision</p>
                <p className="mt-2 text-[0.85rem] leading-6 text-[var(--muted)]">
                  To grow into a recognizable Nigerian lifestyle brand, with a Lagos location and a
                  calendar of signature events.
                </p>
              </Panel>
            </Reveal>
          </div>
        </div>
      </PageSection>
    </>
  );
}
