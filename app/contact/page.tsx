import { ContactForm } from "@/components/forms/contact-form";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/contact-icons";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ActionLink, PageSection, Panel } from "@/components/ui";
import { contactDetails } from "@/lib/site-data";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach FFSET Lounge for reservations, events, and premium enquiries."
        description="The contact experience supports WhatsApp-first conversion today and leaves room for a full backend messaging workflow later."
      />
      <PageSection containerClassName="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-6">
          <Reveal>
            <Panel>
              <p className="eyebrow">Direct Contact</p>
              <div className="mt-5 space-y-3 text-sm leading-8 text-[var(--muted)]">
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
                  <WhatsAppIcon className="mt-1 h-4 w-4 text-[var(--gold)]" />
                  <p>WhatsApp Business: {contactDetails.whatsappBusinessNumber}</p>
                </div>
                <div className="flex items-start gap-3">
                  <MailIcon className="mt-1 h-4 w-4 text-[var(--gold)]" />
                  <p>{contactDetails.email}</p>
                </div>
                <div className="flex items-start gap-3">
                  <InstagramIcon className="mt-1 h-4 w-4 text-[var(--gold)]" />
                  <ActionLink href={contactDetails.instagramUrl} className="px-0 py-0 text-sm text-[var(--gold-soft)]">
                    {contactDetails.instagram}
                  </ActionLink>
                </div>
                <div className="flex items-start gap-3">
                  <FacebookIcon className="mt-1 h-4 w-4 text-[var(--gold)]" />
                  <p>{contactDetails.facebook}</p>
                </div>
              </div>
              <ActionLink href={contactDetails.whatsapp} variant="primary" className="mt-6 gap-2">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp CTA
              </ActionLink>
            </Panel>
          </Reveal>
          <Reveal delay={0.08}>
            <Panel className="overflow-hidden rounded-[1.75rem] p-0">
              <div className="flex min-h-80 items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(213,170,77,0.12),_transparent_32%),linear-gradient(135deg,_rgba(127,15,46,0.32),_rgba(0,0,0,0.5))] p-8 text-center">
                <div>
                  <p className="eyebrow">Google Map Placeholder</p>
                  <p className="display-font mt-4 text-3xl text-white">Akure, Ondo State, Nigeria</p>
                  <p className="mt-4 max-w-md text-sm leading-8 text-[var(--muted)]">
                    Replace this panel with an embedded map or location API when the backend and
                    operational details are ready.
                  </p>
                </div>
              </div>
            </Panel>
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <ContactForm />
        </Reveal>
      </PageSection>
    </>
  );
}
