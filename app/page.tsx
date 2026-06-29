import Image from "next/image";
import { CompetitionCard, EventCard, WineCard } from "@/components/cards";
import { LazyVideo } from "@/components/lazy-video";
import { Reveal } from "@/components/reveal";
import { ServicesShowcase } from "@/components/services-showcase";
import { SectionTitle } from "@/components/section-title";
import { ActionLink, PageSection, Panel } from "@/components/ui";
import { contactDetails, events, galleryItems, wines } from "@/lib/site-data";

type HeroHighlight = {
  label: string;
  value: string;
  icon: "pin" | "spark" | "glass";
  motionClassName: string;
};

const heroHighlights: HeroHighlight[] = [
  {
    label: "Current Base",
    value: "Akure",
    icon: "pin",
    motionClassName: "hero-card-float",
  },
  {
    label: "Expansion Vision",
    value: "Lagos",
    icon: "spark",
    motionClassName: "hero-card-float hero-card-float-delayed",
  },
  {
    label: "Atmosphere",
    value: "Luxury Social",
    icon: "glass",
    motionClassName: "hero-card-float hero-card-float-slow",
  },
];

function HeroCardIcon({ icon }: Pick<HeroHighlight, "icon">) {
  const sharedProps = {
    "aria-hidden": true,
    viewBox: "0 0 24 24",
    className: "h-5 w-5 text-[var(--gold-soft)]",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (icon === "pin") {
    return (
      <svg {...sharedProps}>
        <path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2.2" />
      </svg>
    );
  }

  if (icon === "spark") {
    return (
      <svg {...sharedProps}>
        <path d="m12 3 1.8 4.6L18 9.4l-4.2 1.7L12 16l-1.8-4.9L6 9.4l4.2-1.8L12 3Z" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <path d="M8 4h8" />
      <path d="M9 4v2.5c0 1.8 1 3.4 2.6 4.2l.4.2.4-.2C14 9.9 15 8.3 15 6.5V4" />
      <path d="M10 14h4" />
      <path d="M9 20h6" />
      <path d="M12 10.9V20" />
    </svg>
  );
}

function HeroHighlightCard({ label, value, icon, motionClassName }: HeroHighlight) {
  return (
    <div className={motionClassName}>
      <div className="rounded-[1.6rem] border border-white/12 bg-[linear-gradient(180deg,rgba(24,17,19,0.74),rgba(10,8,9,0.62))] p-4 shadow-[0_28px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl md:p-[1.125rem]">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(213,170,77,0.2)] bg-[rgba(213,170,77,0.08)]">
            <HeroCardIcon icon={icon} />
          </div>
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--gold)]">{label}</p>
            <p className="mt-2 text-lg font-medium text-white">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <LazyVideo
            className="hero-video-zoom h-full w-full object-cover"
            src="/wine.mp4"
            poster="/logo-crop.jpeg"
            autoPlay
            muted
            loop
            loopEndTime={7.5}
            playsInline
          />
          <div className="absolute inset-0 bg-[linear-gradient(92deg,rgba(5,4,5,0.96)_0%,rgba(7,5,6,0.88)_36%,rgba(8,6,7,0.58)_68%,rgba(7,5,6,0.9)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(213,170,77,0.16),_transparent_24%),radial-gradient(circle_at_78%_22%,_rgba(127,15,46,0.32),_transparent_28%),radial-gradient(circle_at_center,_transparent_45%,_rgba(0,0,0,0.44)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2),transparent_18%,transparent_76%,rgba(0,0,0,0.48))]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid min-h-[36rem] items-end gap-8 py-10 md:min-h-[42rem] md:py-14 xl:grid-cols-[minmax(0,1.72fr)_minmax(260px,0.72fr)] xl:gap-10">
            <div className="self-center lg:pl-4 xl:pl-8">
              <Reveal delay={0.05}>
                <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(213,170,77,0.2)] bg-black/28 px-3.5 py-2.5 shadow-[0_18px_45px_rgba(0,0,0,0.2)] backdrop-blur-md">
                  <Image
                    src="/logo-crop.jpeg"
                    alt="FFSET Lounge logo"
                    width={48}
                    height={48}
                    loading="lazy"
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="eyebrow text-[0.6rem] sm:text-[0.68rem]">Premium Lounge Experience</p>
                    <p className="text-[0.65rem] leading-5 uppercase tracking-[0.12em] text-[var(--muted)] sm:text-xs sm:tracking-[0.22em]">
                      Akure • Unwind • Play • Drink
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <h1 className="display-font mt-6 max-w-[50rem] text-[1rem] leading-[0.90] text-white sm:text-[3.3rem] md:mt-7 md:text-[3.7rem] lg:text-[4.05rem] xl:max-w-[52rem] xl:text-[4.7rem]">
                  A cinematic lounge experience framed by premium wine culture.
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-5 max-w-[39rem] text-sm leading-7 text-[rgba(248,241,230,0.82)] md:mt-6 md:text-[1rem] md:leading-8">
                  FFSET Lounge blends prestige bottles, snooker, console gaming, and competition
                  energy into one polished destination designed for standout nights in Akure and a
                  future Lagos expansion.
                </p>
              </Reveal>

              <Reveal delay={0.28}>
                <div className="mt-7 flex flex-wrap gap-3 md:mt-8">
                  <ActionLink href="/competitions/register" variant="primary" className="px-5 py-3">
                    Join Competition
                  </ActionLink>
                  <ActionLink href="/wines" className="px-5 py-3">
                    View Wines
                  </ActionLink>
                  <ActionLink href="/booking" className="px-5 py-3">
                    Book a Table
                  </ActionLink>
                </div>
              </Reveal>
            </div>

            <div className="grid gap-4 self-start pb-1 sm:grid-cols-3 xl:-translate-y-2 xl:grid-cols-1 xl:self-center xl:justify-self-end xl:max-w-[18rem]">
              {heroHighlights.map((item, index) => (
                <Reveal key={item.label} delay={0.24 + index * 0.08}>
                  <HeroHighlightCard {...item} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServicesShowcase />

      <PageSection className="section-space pt-0" containerClassName="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <CompetitionCard title="FFSET FIFA Championship" fee="₦5,000" prize="₦100,000" />
        </Reveal>
        <Reveal delay={0.12}>
          <Panel>
            <p className="eyebrow">Featured Competition Preview</p>
            <h3 className="display-font mt-4 text-3xl text-white">
              Tournament culture is part of the experience.
            </h3>
            <p className="mt-4 text-sm leading-8 text-[var(--muted)]">
              Structured match days, bracket visibility, player check-in, and a spectator-friendly
              setting make every competition feel like an event.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ActionLink href="/competitions">View Competition</ActionLink>
              <ActionLink href="/competitions/register" variant="primary">
                Register Now
              </ActionLink>
            </div>
          </Panel>
        </Reveal>
      </PageSection>

      <PageSection className="section-space pt-0">
        <SectionTitle
          eyebrow="Featured Wines"
          title="Premium labels curated for status, celebration, and slow evenings."
          description="The catalogue is ready for future inventory integration, but already designed to present the lounge as a luxury destination."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {wines.slice(0, 3).map((wine, index) => (
            <Reveal key={wine.name} delay={index * 0.08}>
              <WineCard {...wine} />
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection className="section-space pt-0">
        <SectionTitle
          eyebrow="Gallery Preview"
          title="A visual identity that feels alive even before the full gallery expands."
          description="Real videos and imagery from your public assets are already built into the experience to avoid a placeholder-template feel."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {galleryItems.slice(0, 3).map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article className="overflow-hidden rounded-[1.75rem] border border-[rgba(213,170,77,0.12)] bg-[rgba(12,9,10,0.92)] shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
                <div className="relative aspect-[4/3]">
                  {item.type === "video" ? (
                    <LazyVideo
                      className="h-full w-full object-cover"
                      src={item.src}
                      poster="/logo-crop.jpeg"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      loading="lazy"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--gold)]">{item.category}</p>
                    <p className="display-font mt-2 text-2xl text-white">{item.title}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection className="section-space pt-0" containerClassName="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Panel>
            <SectionTitle
              eyebrow="Location"
              title="Grounded in Akure. Designed to scale."
              description="FFSET Lounge serves Akure today while keeping the brand, interface, and service model ready for a Lagos branch."
            />
            <p className="text-sm leading-8 text-[var(--muted)]">{contactDetails.address}</p>
            <ActionLink href="/contact" variant="primary" className="mt-7">
              Contact the Lounge
            </ActionLink>
          </Panel>
        </Reveal>
        <Reveal delay={0.12}>
          <Panel>
            <div className="grid gap-6 md:grid-cols-2">
              {events.slice(0, 2).map((event) => (
                <EventCard key={event.title} {...event} />
              ))}
            </div>
          </Panel>
        </Reveal>
      </PageSection>
    </>
  );
}
