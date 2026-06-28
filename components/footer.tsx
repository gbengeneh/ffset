import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/contact-icons";
import { contactDetails, navigation } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-white/6 py-10">
      <div className="container-shell grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.9fr]">
        <div className="space-y-4">
          <p className="eyebrow">FFSET Lounge</p>
          <h3 className="display-font text-3xl text-white">A premium social destination built for Akure and beyond.</h3>
          <p className="max-w-xl text-sm leading-7 text-[var(--muted)]">
            Premium wines, console gaming, snooker, and event energy with future-ready room for Lagos expansion.
          </p>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">Explore</p>
          <div className="grid grid-cols-2 gap-3 text-sm text-[var(--muted)]">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-3 text-sm text-[var(--muted)]">
          <p className="font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">Contact</p>
          <div className="flex items-start gap-3">
            <MapPinIcon className="mt-1 h-4 w-4 text-[var(--gold)]" />
            <p>{contactDetails.address}</p>
          </div>
          <div className="flex items-start gap-3">
            <PhoneIcon className="mt-1 h-4 w-4 text-[var(--gold)]" />
            <div>
              <p>{contactDetails.phonePrimary}</p>
              <p>{contactDetails.phoneSecondary}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MailIcon className="mt-1 h-4 w-4 text-[var(--gold)]" />
            <p>{contactDetails.email}</p>
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href={contactDetails.instagramUrl} className="inline-flex items-center gap-2 text-[var(--gold-soft)] hover:text-white">
              <InstagramIcon className="h-4 w-4" />
              <span>{contactDetails.instagram}</span>
            </Link>
            <span className="inline-flex items-center gap-2">
              <FacebookIcon className="h-4 w-4 text-[var(--gold)]" />
              <span>{contactDetails.facebook}</span>
            </span>
          </div>
          <Link href={contactDetails.whatsapp} className="inline-flex items-center gap-2 text-[var(--gold-soft)] hover:text-white">
            <WhatsAppIcon className="h-4 w-4" />
            <span>Reserve or enquire on WhatsApp</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
