import Image from "next/image";
import { contactDetails, type LoungeEvent } from "@/lib/site-data";
import { ActionLink } from "@/components/ui";

function buildEventWhatsAppHref(title: string) {
  const baseUrl = contactDetails.whatsapp;
  const message = `Hi FFSET Lounge, I would like to ask about: ${title}`;
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}text=${encodeURIComponent(message)}`;
}

function EventIcon({ icon }: Pick<LoungeEvent, "icon">) {
  const props = {
    "aria-hidden": true,
    viewBox: "0 0 24 24",
    className: "h-4.5 w-4.5 text-[var(--gold-soft)] sm:h-5 sm:w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case "music":
      return (
        <svg {...props}>
          <path d="M9 18V6l10-2v12" />
          <circle cx="6.5" cy="18" r="2.5" />
          <circle cx="16.5" cy="16" r="2.5" />
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
    case "wine":
      return (
        <svg {...props}>
          <path d="M8 4h8" />
          <path d="M9 4v3.5c0 1.8 1 3.4 2.6 4.2l.4.2.4-.2C14 11.9 15 10.3 15 8.5V4" />
          <path d="M12 11.9V20" />
          <path d="M9 20h6" />
        </svg>
      );
    case "cake":
      return (
        <svg {...props}>
          <path d="M4 20h16v-5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v5Z" />
          <path d="M4 20h16" />
          <path d="M8 12V9M12 12V9M16 12V9" />
          <path d="M12 6.5c.9 0 1.5-.7 1.5-1.5S12.4 3.2 12 2.5c-.4.7-1.5 1.7-1.5 2.5S11.1 6.5 12 6.5Z" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <path d="M8 4h8v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V4Z" />
          <path d="M9 20h6" />
          <path d="M12 10v10" />
          <path d="M6 6H4a3 3 0 0 0 3 3" />
          <path d="M18 6h2a3 3 0 0 1-3 3" />
        </svg>
      );
  }
}

export function EventStoryCard(event: LoungeEvent) {
  const { title, date, frequency, description, icon, imageUrl, imagePosition } = event;

  return (
    <article className="group relative overflow-hidden rounded-[1.6rem] border border-[rgba(213,170,77,0.16)] bg-[linear-gradient(180deg,rgba(20,15,16,0.95),rgba(8,6,7,0.98))] shadow-[0_24px_60px_rgba(0,0,0,0.2)] transition duration-500 hover:-translate-y-1 hover:border-[rgba(213,170,77,0.3)]">
      <div className="relative aspect-[6/5] overflow-hidden sm:aspect-[4/3]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          loading="lazy"
          style={{ objectPosition: imagePosition ?? "center" }}
          className="object-cover transition duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,5,5,0.15),rgba(7,5,6,0.4)_45%,rgba(7,5,6,0.95)_100%)]" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3.5 sm:p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(213,170,77,0.3)] bg-[linear-gradient(180deg,rgba(52,40,28,0.62),rgba(26,20,15,0.32))] backdrop-blur-md">
            <EventIcon icon={icon} />
          </div>
          <span className="rounded-full border border-white/12 bg-black/40 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.14em] text-[var(--gold-soft)] backdrop-blur-md">
            {frequency}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <p className="text-[0.6rem] uppercase tracking-[0.22em] text-[var(--gold)]">{date}</p>
          <h3 className="display-font mt-1.5 text-xl leading-tight text-white sm:text-2xl">{title}</h3>
          <p className="mt-2 text-[0.82rem] leading-6 text-[rgba(248,241,230,0.82)] transition duration-300 group-hover:text-white">
            {description}
          </p>
          <ActionLink
            href={buildEventWhatsAppHref(title)}
            className="mt-3.5 px-3.5 py-2 text-[0.78rem]"
          >
            Ask About This Night
          </ActionLink>
        </div>
      </div>
    </article>
  );
}
