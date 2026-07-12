import Image from "next/image";
import { CompetitionCard, EventCard, WineCard } from "@/components/cards";
import { LazyVideo } from "@/components/lazy-video";
import { LogoMark } from "@/components/logo-mark";
import { Reveal } from "@/components/reveal";
import { ServicesShowcase } from "@/components/services-showcase";
import { SectionTitle } from "@/components/section-title";
import { RegisterButton } from "@/components/register-button";
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
      <div className="rounded-[1.4rem] border border-white/12 bg-[linear-gradient(180deg,rgba(24,17,19,0.74),rgba(10,8,9,0.62))] p-3.5 shadow-[0_28px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
        <div className="flex items-start gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[rgba(213,170,77,0.2)] bg-[rgba(213,170,77,0.08)]">
            <HeroCardIcon icon={icon} />
          </div>
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[var(--gold)]">{label}</p>
            <p className="mt-1.5 text-base font-medium text-white">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroHighlightChip({ label, value, icon }: Pick<HeroHighlight, "label" | "value" | "icon">) {
  return (
    <div className="flex shrink-0 snap-start items-center gap-2.5 rounded-2xl border border-white/12 bg-[rgba(12,9,10,0.72)] px-3.5 py-2.5 backdrop-blur-xl">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[rgba(213,170,77,0.2)] bg-[rgba(213,170,77,0.08)]">
        <HeroCardIcon icon={icon} />
      </div>
      <div>
        <p className="text-[0.6rem] uppercase tracking-[0.18em] text-[var(--gold)]">{label}</p>
        <p className="text-sm font-medium whitespace-nowrap text-white">{value}</p>
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
            poster="/poster-wine.jpg"
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
          <div className="grid min-h-[30rem] grid-cols-1 items-end gap-4 py-8 sm:min-h-[28rem] sm:gap-5 sm:py-7 md:min-h-[32rem] md:py-9 xl:grid-cols-[minmax(0,1.72fr)_minmax(260px,0.72fr)] xl:gap-10">
            <div className="min-w-0 self-center lg:pl-4 xl:pl-8">
              <Reveal delay={0.05}>
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(213,170,77,0.2)] bg-black/36 px-2.5 py-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.2)] backdrop-blur-md sm:gap-2.5 sm:px-3 sm:py-2">
                  <LogoMark className="h-7 w-7 rounded-full sm:h-8 sm:w-8" />
                  <div>
                    <p className="eyebrow text-[0.55rem] sm:text-[0.62rem]">Premium Lounge Experience</p>
                    <p className="text-[0.6rem] leading-4 uppercase tracking-[0.1em] text-[var(--muted)] sm:text-[0.68rem] sm:tracking-[0.18em]">
                      Akure • Unwind • Play • Drink
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <h1 className="display-font text-balance mt-3 max-w-[36rem] text-[1.7rem] leading-[1.14] text-white sm:mt-4 sm:text-[2.15rem] sm:leading-[1.08] md:text-[2.55rem] lg:text-[2.8rem] xl:max-w-[40rem] xl:text-[3.15rem]">
                  A cinematic lounge experience framed by premium wine culture.
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-pretty mt-2.5 max-w-[32rem] text-[0.85rem] leading-6 text-[rgba(248,241,230,0.82)] sm:mt-3.5 sm:text-[0.875rem] sm:leading-7 md:text-[0.9rem]">
                  FFSET Lounge blends prestige bottles, snooker, console gaming, and competition
                  energy into one polished destination designed for standout nights in Akure and a
                  future Lagos expansion.
                </p>
              </Reveal>

              <Reveal delay={0.28}>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:flex sm:flex-wrap sm:gap-2.5">
                  <RegisterButton
                    variant="primary"
                    className="col-span-2 px-4 py-2.5 text-xs sm:col-auto sm:px-4 sm:py-2.5 sm:text-[0.83rem]"
                  >
                    Join Competition
                  </RegisterButton>
                  <ActionLink href="/wines" className="px-4 py-2.5 text-xs sm:px-4 sm:py-2.5 sm:text-[0.83rem]">
                    View Wines
                  </ActionLink>
                  <ActionLink href="/booking" className="px-4 py-2.5 text-xs sm:px-4 sm:py-2.5 sm:text-[0.83rem]">
                    Book a Table
                  </ActionLink>
                </div>
              </Reveal>

              <Reveal delay={0.34}>
                <div className="scrollbar-none -mx-5 mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-1 sm:hidden">
                  {heroHighlights.map((item) => (
                    <HeroHighlightChip key={item.label} {...item} />
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="hidden gap-4 self-start pb-1 sm:grid sm:grid-cols-3 xl:-translate-y-2 xl:grid-cols-1 xl:self-center xl:justify-self-end xl:max-w-[18rem]">
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
            <p className="eyebrow text-[0.68rem]">Compete at FFSET</p>
            <h3 className="display-font mt-3 text-[1.6rem] leading-[1.1] text-white sm:text-[1.9rem]">
              Tournament culture is part of the experience.
            </h3>
            <p className="mt-3 text-[0.85rem] leading-6 text-[var(--muted)] sm:text-[0.92rem] sm:leading-7">
              Live brackets, player check-in, and a crowd to match — every tournament plays like a
              main event.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <ActionLink href="/competitions" className="px-4 py-2.5 text-[0.83rem]">
                View Competition
              </ActionLink>
              <RegisterButton variant="primary" className="px-4 py-2.5 text-[0.83rem]">
                Register Now
              </RegisterButton>
            </div>
          </Panel>
        </Reveal>
      </PageSection>

      <PageSection className="section-space pt-0">
        <SectionTitle
          eyebrow="Featured Wines"
          title="Wine, champagne, and spirits, ready to reserve."
          description="A rotating selection of bottles — reserve any of them directly on WhatsApp."
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
          title="Inside the lounge, in pictures and video."
          description="A look at the wine nights, snooker tables, and crowd that shows up for both."
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
                      poster={item.poster}
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
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--gold)]">{item.category}</p>
                    <p className="display-font mt-1.5 text-xl text-white sm:text-2xl">{item.title}</p>
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
              title="Grounded in Akure. Built to scale."
              description="Visit us in Akure today, with a Lagos location planned next."
            />
            <p className="text-[0.85rem] leading-6 text-[var(--muted)] sm:text-[0.92rem] sm:leading-7">
              {contactDetails.address}
            </p>
            <ActionLink href="/contact" variant="primary" className="mt-5 px-4 py-2.5 text-[0.83rem]">
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
