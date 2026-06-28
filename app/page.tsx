import Image from "next/image";
import { CompetitionCard, EventCard, ServiceCard, WineCard } from "@/components/cards";
import { LazyVideo } from "@/components/lazy-video";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { ActionLink, PageSection, Panel } from "@/components/ui";
import { contactDetails, events, galleryItems, services, wines } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <LazyVideo
            className="h-full w-full scale-[1.06] object-cover"
            src="/wine.mp4"
            poster="/logo-crop.jpeg"
            autoPlay
            muted
            loop
            loopEndTime={7.5}
            playsInline
          />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(6,4,5,0.94)_8%,rgba(6,4,5,0.78)_40%,rgba(6,4,5,0.6)_62%,rgba(6,4,5,0.88)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(213,170,77,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(127,15,46,0.38),_transparent_32%)]" />
        </div>

        <div className="container-shell relative">
          <div className="grid min-h-[34rem] items-end gap-8 py-9 md:min-h-[39rem] md:py-12 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="max-w-3xl self-center">
              <Reveal delay={0.05}>
                <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[rgba(213,170,77,0.22)] bg-black/30 px-3 py-2 backdrop-blur-md">
                  <Image
                    src="/logo-crop.jpeg"
                    alt="FFSET Lounge logo"
                    width={44}
                    height={44}
                    loading="lazy"
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="eyebrow text-[0.68rem]">Premium Lounge Experience</p>
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                      Akure • Unwind • Play • Drink
                    </p>
                  </div>
                </div>
              </Reveal>

             <Reveal delay={0.12}>
              <h1 className="display-font w-full max-w-full md:max-w-[70%] text-xl leading-[0.96] text-white md:text-5xl xl:text-[4.5rem]">
                A cinematic lounge experience framed by premium wine culture.
              </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[rgba(248,241,230,0.82)] md:text-[0.95rem] md:leading-7">
                  FFSET Lounge blends prestige bottles, snooker, console gaming, and
                  competition energy into one polished destination designed for standout nights
                  in Akure and a future Lagos expansion.
                </p>
              </Reveal>

              <Reveal delay={0.28}>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ActionLink href="/competitions/register" variant="primary">
                    Join Competition
                  </ActionLink>
                  <ActionLink href="/wines">View Wines</ActionLink>
                  <ActionLink href="/booking">Book a Table</ActionLink>
                </div>
              </Reveal>
            </div>

            <div className="grid gap-3 self-end sm:grid-cols-3 xl:grid-cols-1 xl:justify-self-end xl:max-w-sm">
              {[
                ["Current Base", "Akure"],
                ["Expansion Vision", "Lagos"],
                ["Atmosphere", "Luxury Social"],
              ].map(([label, value], index) => (
                <Reveal key={label} delay={0.24 + index * 0.08}>
                  <div className="rounded-[1.45rem] border border-white/10 bg-[rgba(9,7,8,0.44)] p-4 backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--gold)]">{label}</p>
                    <p className="mt-2 text-lg text-white">{value}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PageSection className="section-space">
        <SectionTitle
          eyebrow="Services"
          title="Luxury social programming with real range."
          description="Every zone of FFSET Lounge is designed to feel intentional, whether the guest came to celebrate, compete, unwind, or host."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, 6).map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08}>
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>
      </PageSection>

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
              <Panel className="overflow-hidden rounded-[1.75rem] p-0">
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
                    <Image src={item.src} alt={item.title} fill loading="lazy" className="object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--gold)]">{item.category}</p>
                    <p className="display-font mt-2 text-2xl text-white">{item.title}</p>
                  </div>
                </div>
              </Panel>
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
