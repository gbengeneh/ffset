import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { PageSection } from "@/components/ui";
import { serviceHighlights, services, type ServiceItem } from "@/lib/site-data";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 10h10" />
      <path d="m10.5 5 5 5-5 5" />
    </svg>
  );
}

function ServiceIcon({ icon }: Pick<ServiceItem, "icon">) {
  const props = {
    "aria-hidden": true,
    viewBox: "0 0 24 24",
    className: "h-6 w-6 text-[var(--gold-soft)] transition-transform duration-300 group-hover:rotate-3",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case "wine":
      return (
        <svg {...props}>
          <path d="M8 3h8" />
          <path d="M9 3v3.5c0 1.8 1 3.4 2.6 4.2l.4.2.4-.2C14 9.9 15 8.3 15 6.5V3" />
          <path d="M12 10.9V20" />
          <path d="M9 20h6" />
        </svg>
      );
    case "snooker":
      return (
        <svg {...props}>
          <path d="M4 7.5h16" />
          <path d="M6.5 7.5 4 18" />
          <path d="M17.5 7.5 20 18" />
          <path d="M8.2 12.5h.01" />
          <path d="M12 10.8h.01" />
          <path d="M15.8 14.4h.01" />
        </svg>
      );
    case "controller":
      return (
        <svg {...props}>
          <path d="M8.2 9H7a3 3 0 0 0-2.9 3.7l.8 3.2a1.8 1.8 0 0 0 3.1.8l1.4-1.5h5.2l1.4 1.5a1.8 1.8 0 0 0 3.1-.8l.8-3.2A3 3 0 0 0 17 9h-1.2l-1.4-2H9.6L8.2 9Z" />
          <path d="M8 12h2" />
          <path d="M9 11v2" />
          <path d="M15.5 11.5h.01" />
          <path d="M17 13h.01" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...props}>
          <path d="M7 3v3" />
          <path d="M17 3v3" />
          <path d="M4 9h16" />
          <rect x="4" y="5.5" width="16" height="14.5" rx="2.5" />
          <path d="M8 13h.01" />
          <path d="M12 13h.01" />
          <path d="M16 13h.01" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...props}>
          <path d="M8 4h8v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V4Z" />
          <path d="M9 20h6" />
          <path d="M12 10v10" />
          <path d="M6 6H4a3 3 0 0 0 3 3" />
          <path d="M18 6h2a3 3 0 0 1-3 3" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <rect x="5" y="7" width="14" height="11" rx="2.5" />
          <path d="M9 7V5.7A1.7 1.7 0 0 1 10.7 4h2.6A1.7 1.7 0 0 1 15 5.7V7" />
        </svg>
      );
  }
}

function HighlightIcon({ icon }: { icon: (typeof serviceHighlights)[number]["icon"] }) {
  const props = {
    "aria-hidden": true,
    viewBox: "0 0 24 24",
    className: "h-6 w-6 text-[var(--gold-soft)]",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case "spark":
      return (
        <svg {...props}>
          <path d="m12 3 1.8 4.6L18 9.4l-4.2 1.7L12 16l-1.8-4.9L6 9.4l4.2-1.8L12 3Z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 3 18 5.7v5.8c0 4-2.5 6.7-6 8.5-3.5-1.8-6-4.5-6-8.5V5.7L12 3Z" />
          <path d="m9.5 11.8 1.5 1.5 3.5-3.8" />
        </svg>
      );
    case "lounge":
      return (
        <svg {...props}>
          <path d="M7.5 11.3a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z" />
          <path d="M16.5 11.3a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z" />
          <path d="M3.5 18v-1.2a3.3 3.3 0 0 1 3.3-3.3h1.4a3.3 3.3 0 0 1 3.3 3.3V18" />
          <path d="M12.5 18v-1.2a3.3 3.3 0 0 1 3.3-3.3h1.4a3.3 3.3 0 0 1 3.3 3.3V18" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      );
  }
}

function SectionHeader() {
  return (
    <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center md:mb-16">
      <p className="eyebrow">What We Offer</p>
      <h2 className="display-font mt-5 text-[2.8rem] leading-[0.95] text-white sm:text-[3.5rem] md:text-[4.8rem]">
        Our Services
      </h2>
      <div className="mt-5 flex items-center gap-4 text-[var(--gold)]">
        <span className="h-px w-20 bg-[linear-gradient(90deg,transparent,rgba(213,170,77,0.72))]" />
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(213,170,77,0.26)] bg-[rgba(213,170,77,0.06)]">
          <span className="h-2.5 w-2.5 rounded-full border border-[rgba(213,170,77,0.9)]" />
        </span>
        <span className="h-px w-20 bg-[linear-gradient(90deg,rgba(213,170,77,0.72),transparent)]" />
      </div>
      <p className="mt-6 max-w-2xl text-base leading-8 text-[rgba(248,241,230,0.78)] md:text-lg">
        From premium wines to immersive gaming and exciting events, FFSET Lounge delivers
        unforgettable experiences with a richer sense of atmosphere than a typical business
        showcase.
      </p>
    </div>
  );
}

function ManifestoBlock() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-[rgba(213,170,77,0.14)] bg-[linear-gradient(180deg,rgba(20,15,14,0.94),rgba(11,9,10,0.98))] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.16)] md:p-8 xl:min-h-[32rem]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(213,170,77,0.45),transparent)]" />
      <div>
        <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[var(--gold)]">
          Luxury Social Programming
        </p>
        <h3 className="display-font mt-5 max-w-sm text-[2.15rem] leading-[1.04] text-white md:text-[2.55rem]">
          A house for prestige pours, competition energy, and memorable nights.
        </h3>
        <p className="mt-5 max-w-md text-[0.98rem] leading-8 text-[var(--muted)]">
          Every offering at FFSET Lounge is designed to feel polished and intentional. Guests move
          between wine, gaming, events, and premium social moments inside one composed atmosphere.
        </p>
      </div>
      <div className="mt-8 space-y-4 border-t border-white/8 pt-6">
        {services.slice(0, 4).map((service) => (
          <div key={service.title} className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.67rem] uppercase tracking-[0.22em] text-[var(--gold)]">
                {service.accent}
              </p>
              <p className="mt-1 text-sm leading-7 text-[rgba(248,241,230,0.86)]">{service.title}</p>
            </div>
            <span className="mt-2 h-px w-10 shrink-0 bg-[rgba(213,170,77,0.24)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

type StoryPanelProps = {
  service: ServiceItem;
  className?: string;
  aspectClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  overlayClassName?: string;
  priority?: boolean;
};

function StoryPanel({
  service,
  className = "",
  aspectClassName = "aspect-[1.05/1]",
  titleClassName = "text-[2rem] md:text-[2.2rem]",
  descriptionClassName = "max-w-[30rem]",
  overlayClassName = "",
  priority = false,
}: StoryPanelProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[2rem] border border-[rgba(213,170,77,0.16)] bg-[linear-gradient(180deg,rgba(20,15,16,0.95),rgba(8,6,7,0.98))] shadow-[0_24px_60px_rgba(0,0,0,0.2)] transition duration-500 hover:-translate-y-1 hover:border-[rgba(213,170,77,0.3)] ${className}`.trim()}
    >
      <div className={`relative overflow-hidden ${aspectClassName}`.trim()}>
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          loading={priority ? "eager" : "lazy"}
          style={{ objectPosition: service.imagePosition ?? "center" }}
          className="object-cover transition duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,5,5,0.12),rgba(7,5,6,0.36)_42%,rgba(7,5,6,0.94)_100%)]" />
        <div
          className={`absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(213,170,77,0.12),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(127,15,46,0.26),_transparent_34%)] ${overlayClassName}`.trim()}
        />
      </div>

      <div className="absolute inset-x-0 top-0 p-5 md:p-6">
        <div className="flex h-15 w-15 items-center justify-center rounded-full border border-[rgba(213,170,77,0.3)] bg-[linear-gradient(180deg,rgba(52,40,28,0.62),rgba(26,20,15,0.32))] backdrop-blur-md">
          <ServiceIcon icon={service.icon} />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--gold)]">
          {service.accent}
        </p>
        <h3 className={`display-font mt-3 leading-tight text-white ${titleClassName}`.trim()}>
          {service.title}
        </h3>
        <p
          className={`mt-3 text-[0.98rem] leading-8 text-[rgba(248,241,230,0.82)] transition duration-300 group-hover:text-white ${descriptionClassName}`.trim()}
        >
          {service.description}
        </p>
        <Link
          href={service.href}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium tracking-[0.04em] text-[var(--gold-soft)] transition duration-300 hover:text-white"
        >
          <span>{service.cta}</span>
          <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}

function FeatureStrip() {
  return (
    <div className="glass-panel grid gap-5 rounded-[2rem] border-[rgba(213,170,77,0.18)] bg-[linear-gradient(180deg,rgba(27,20,18,0.8),rgba(12,9,10,0.9))] p-6 md:grid-cols-2 md:gap-0 md:p-7 xl:grid-cols-4">
      {serviceHighlights.map((item, index) => (
        <div
          key={item.title}
          className={`flex items-start gap-4 ${
            index > 0 ? "md:border-l md:border-white/8 md:pl-6 xl:pl-8" : ""
          } ${index < serviceHighlights.length - 1 ? "xl:pr-8" : ""}`}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(213,170,77,0.26)] bg-[rgba(213,170,77,0.08)]">
            <HighlightIcon icon={item.icon} />
          </div>
          <div>
            <p className="text-lg font-medium text-[var(--gold-soft)]">{item.title}</p>
            <p className="mt-1 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

type ServicesShowcaseProps = {
  className?: string;
};

export function ServicesShowcase({ className = "" }: ServicesShowcaseProps) {
  const [wine, snooker, gaming, events, competitions, corporate] = services;

  return (
    <PageSection className={`section-space ${className}`.trim()}>
      <div className="relative overflow-hidden rounded-[2.6rem] border border-[rgba(213,170,77,0.08)] bg-[radial-gradient(circle_at_top,_rgba(213,170,77,0.08),_transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(127,15,46,0.14),_transparent_24%)] px-1 py-2 md:px-2">
        <Reveal>
          <SectionHeader />
        </Reveal>

        <div className="grid gap-6 xl:grid-cols-12">
          <Reveal className="xl:col-span-5 xl:h-full">
            <ManifestoBlock />
          </Reveal>

          <Reveal delay={0.06} className="xl:col-span-7 xl:h-full">
            <StoryPanel
              service={wine}
              className="h-full"
              aspectClassName="aspect-[1.45/1] md:aspect-[1.7/1] xl:h-full xl:min-h-[32rem]"
              titleClassName="text-[2.2rem] md:text-[2.8rem] xl:text-[3rem]"
              descriptionClassName="max-w-[33rem]"
              priority
            />
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-1 xl:col-span-6">
            <StoryPanel
              service={snooker}
              aspectClassName="aspect-[1.08/1] md:aspect-[1.18/1] xl:aspect-[1.22/1]"
              titleClassName="text-[2rem] md:text-[2.25rem]"
              descriptionClassName="max-w-[24rem]"
            />
          </Reveal>

          <Reveal delay={0.14} className="md:col-span-1 xl:col-span-6">
            <StoryPanel
              service={gaming}
              aspectClassName="aspect-[1.08/1] md:aspect-[1.18/1] xl:aspect-[1.22/1]"
              titleClassName="text-[2rem] md:text-[2.25rem] xl:text-[2.35rem]"
              descriptionClassName="max-w-[25rem]"
            />
          </Reveal>

          <Reveal delay={0.18} className="md:col-span-1 xl:col-span-4">
            <StoryPanel
              service={events}
              aspectClassName="aspect-[1.02/1]"
              titleClassName="text-[1.95rem] md:text-[2.1rem]"
              descriptionClassName="max-w-[22rem]"
            />
          </Reveal>

          <Reveal delay={0.22} className="md:col-span-1 xl:col-span-4">
            <StoryPanel
              service={competitions}
              aspectClassName="aspect-[0.96/1]"
              titleClassName="text-[1.95rem] md:text-[2.2rem]"
              descriptionClassName="max-w-[22rem]"
            />
          </Reveal>

          <Reveal delay={0.26} className="md:col-span-2 xl:col-span-4">
            <StoryPanel
              service={corporate}
              aspectClassName="aspect-[1.12/1] md:aspect-[2.05/1] xl:aspect-[1.02/1]"
              titleClassName="text-[1.95rem] md:text-[2.1rem]"
              descriptionClassName="max-w-[24rem]"
            />
          </Reveal>
        </div>

        <div className="mt-8 md:mt-10">
          <Reveal delay={0.2}>
            <FeatureStrip />
          </Reveal>
        </div>
      </div>
    </PageSection>
  );
}
