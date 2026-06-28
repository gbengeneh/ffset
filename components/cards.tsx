import Image from "next/image";
import type { ReactNode } from "react";
import { contactDetails } from "@/lib/site-data";
import { ActionLink, Panel } from "@/components/ui";

function buildWineWhatsAppHref({
  name,
  category,
  size,
  availability,
  imageUrl,
}: {
  name: string;
  category: string;
  size: string;
  availability: string;
  imageUrl?: string;
}) {
  const baseUrl = contactDetails.whatsapp;
  const lines = [
    "Hi FFSET Lounge, I would like to reserve this wine:",
    "",
    `Wine: ${name}`,
    `Category: ${category}`,
    `Bottle Size: ${size}`,
    `Availability: ${availability}`,
  ];

  if (imageUrl) {
    lines.push(`Image: ${imageUrl}`);
  }

  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}text=${encodeURIComponent(lines.join("\n"))}`;
}

type CardBaseProps = {
  title: string;
  description: string;
  accent?: string;
  children?: ReactNode;
};

export function ServiceCard({ title, description, accent, children }: CardBaseProps) {
  return (
    <Panel as="article" className="transition duration-300 hover:-translate-y-1 hover:border-[rgba(213,170,77,0.28)]">
      <p className="mb-3 text-sm uppercase tracking-[0.22em] text-[var(--gold)]">{accent}</p>
      <h3 className="display-font mb-3 text-2xl text-white">{title}</h3>
      <p className="text-sm leading-7 text-[var(--muted)]">{description}</p>
      {children}
    </Panel>
  );
}

type WineCardProps = {
  name: string;
  category: string;
  description: string;
  size: string;
  availability: string;
  imageUrl?: string;
};

export function WineCard({
  name,
  category,
  description,
  size,
  availability,
  imageUrl,
}: WineCardProps) {
  const wineWhatsAppHref = buildWineWhatsAppHref({
    name,
    category,
    size,
    availability,
    imageUrl,
  });

  return (
    <Panel as="article" className="flex h-full flex-col">
      <div className="mb-5 rounded-[1.45rem] border border-[rgba(213,170,77,0.12)] bg-[radial-gradient(circle_at_top,_rgba(127,15,46,0.4),_transparent_48%),linear-gradient(180deg,#231416,_#0e090a)] p-5">
        <div className="mx-auto flex aspect-[4/5] w-full max-w-[210px] items-center justify-center rounded-[1.5rem] border border-[rgba(255,255,255,0.08)] bg-black/25">
          <Image
            src={imageUrl ?? "/logo-crop.jpeg"}
            alt={`${name} bottle`}
            width={180}
            height={220}
            loading="lazy"
            className="h-44 w-36 rounded-3xl object-contain opacity-95"
          />
        </div>
      </div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">{category}</p>
          <h3 className="display-font mt-2 text-2xl text-white">{name}</h3>
        </div>
        <span className="rounded-full border border-[rgba(213,170,77,0.18)] px-3 py-1 text-xs text-[var(--gold-soft)]">
          {availability}
        </span>
      </div>
      <p className="mb-4 text-sm leading-7 text-[var(--muted)]">{description}</p>
      <div className="mt-auto flex flex-col items-start justify-between gap-3 pt-4 text-sm text-[var(--muted)] sm:flex-row sm:items-center">
        <span>{size}</span>
        <ActionLink href={wineWhatsAppHref} className="px-4 py-3 text-xs">
          Reserve / Enquire on WhatsApp
        </ActionLink>
      </div>
    </Panel>
  );
}

type EventCardProps = {
  title: string;
  date: string;
  description: string;
};

export function EventCard({ title, date, description }: EventCardProps) {
  return (
    <Panel as="article">
      <p className="mb-2 text-sm uppercase tracking-[0.24em] text-[var(--gold)]">{date}</p>
      <h3 className="display-font mb-3 text-2xl text-white">{title}</h3>
      <p className="text-sm leading-7 text-[var(--muted)]">{description}</p>
    </Panel>
  );
}

type CompetitionCardProps = {
  title: string;
  prize: string;
  fee: string;
};

export function CompetitionCard({ title, prize, fee }: CompetitionCardProps) {
  return (
    <Panel as="article">
      <p className="mb-2 text-sm uppercase tracking-[0.22em] text-[var(--gold)]">Upcoming tournament</p>
      <h3 className="display-font mb-4 text-3xl text-white">{title}</h3>
      <div className="grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-2">
        <div className="rounded-2xl border border-white/7 bg-white/3 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">Registration</p>
          <p className="mt-2 text-lg text-white">{fee}</p>
        </div>
        <div className="rounded-2xl border border-white/7 bg-white/3 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">Top prize</p>
          <p className="mt-2 text-lg text-white">{prize}</p>
        </div>
      </div>
    </Panel>
  );
}

export function DashboardCard({ label, value }: { label: string; value: string }) {
  return (
    <Panel as="article" compact>
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">{label}</p>
      <p className="display-font mt-3 text-4xl text-white">{value}</p>
    </Panel>
  );
}
