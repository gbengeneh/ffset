import { WineCard } from "@/components/cards";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { PageSection } from "@/components/ui";
import { contactDetails, wines } from "@/lib/site-data";

export default function WinesPage() {
  return (
    <>
      <PageHero
        eyebrow="Wine Catalogue"
        title="A luxury bottle list ready for real inventory later."
        description="This catalogue is intentionally structured for future backend integration, while already presenting the lounge with a premium retail-and-reserve feel."
        primaryCta={{ label: "Reserve on WhatsApp", href: contactDetails.whatsapp }}
      />
      <PageSection containerClassName="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {wines.map((wine, index) => (
          <Reveal key={wine.name} delay={index * 0.06}>
            <WineCard {...wine} />
          </Reveal>
        ))}
      </PageSection>
    </>
  );
}
