import Image from "next/image";
import { AddToCartButton } from "@/components/add-to-cart-button";
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

type WineCardProps = {
  id: number;
  name: string;
  category: string;
  description: string;
  size: string;
  availability: string;
  price: string;
  rawPrice: string;
  imageUrl?: string;
  isPurchasable: boolean;
  stockQuantity: number | null;
};

export function WineCard({
  id,
  name,
  category,
  description,
  size,
  availability,
  price,
  rawPrice,
  imageUrl,
  isPurchasable,
  stockQuantity,
}: WineCardProps) {
  const isRemoteImage = Boolean(imageUrl?.startsWith("http"));
  const wineWhatsAppHref = buildWineWhatsAppHref({
    name,
    category,
    size,
    availability,
    imageUrl,
  });

  return (
    <Panel as="article" className="flex h-full flex-col">
      <div className="-m-5 mb-5 overflow-hidden rounded-t-[1.75rem] border-b border-[rgba(213,170,77,0.12)] bg-[#110d0e] md:-m-6 md:mb-6">
        <div className="flex aspect-[4/3] w-full items-center justify-center bg-[linear-gradient(180deg,rgba(255,255,255,0.015),rgba(0,0,0,0.08))] p-6">
          <Image
            src={imageUrl ?? "/logo-crop.jpeg"}
            alt={`${name} bottle`}
            width={180}
            height={220}
            sizes="(max-width: 768px) 144px, 180px"
            loading="lazy"
            unoptimized={isRemoteImage}
            className="h-52 w-40 object-contain opacity-95 drop-shadow-[0_16px_22px_rgba(0,0,0,0.22)]"
          />
        </div>
      </div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--gold)]">{category}</p>
          <h3 className="display-font mt-1.5 text-xl text-white sm:text-2xl">{name}</h3>
        </div>
        <span className="rounded-full border border-[rgba(213,170,77,0.18)] px-3 py-1 text-xs text-[var(--gold-soft)]">
          {availability}
        </span>
      </div>
      <p className="mb-3 text-[0.82rem] leading-6 text-[var(--muted)] sm:text-sm sm:leading-7">{description}</p>
      <div className="mb-3 flex items-center justify-between gap-4 text-sm">
        <span className="text-[var(--muted)]">{size}</span>
        <span className="display-font text-lg text-[var(--gold)]">{price}</span>
      </div>
      <div className="mt-auto space-y-2 pt-1">
        {isPurchasable ? (
          <AddToCartButton
            className="w-full justify-center"
            item={{
              productId: id,
              name,
              price: rawPrice,
              imageUrl,
              type: "wine",
              maxQuantity: stockQuantity ?? undefined,
            }}
          />
        ) : null}
        <ActionLink href={wineWhatsAppHref} className="w-full justify-center px-4 py-3 text-xs">
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
      <p className="mb-2 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--gold)]">{date}</p>
      <h3 className="display-font mb-2 text-xl text-white sm:text-2xl">{title}</h3>
      <p className="text-[0.82rem] leading-6 text-[var(--muted)] sm:text-sm sm:leading-7">{description}</p>
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
      <p className="mb-2 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--gold)]">Upcoming tournament</p>
      <h3 className="display-font mb-3 text-xl text-white sm:text-2xl">{title}</h3>
      <div className="grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-2">
        <div className="rounded-2xl border border-white/7 bg-white/3 p-3.5">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--gold)]">Registration</p>
          <p className="mt-1.5 text-base text-white">{fee}</p>
        </div>
        <div className="rounded-2xl border border-white/7 bg-white/3 p-3.5">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--gold)]">Top prize</p>
          <p className="mt-1.5 text-base text-white">{prize}</p>
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
