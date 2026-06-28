import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { PageSection } from "@/components/ui";
import { ServiceCard } from "@/components/cards";
import { services } from "@/lib/site-data";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Every offering is designed to feel premium, social, and memorable."
        description="From prestige wines to structured competitions, FFSET Lounge brings multiple entertainment moods into one polished environment."
      />
      <PageSection containerClassName="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08}>
              <ServiceCard {...service} />
            </Reveal>
          ))}
      </PageSection>
    </>
  );
}
