import { EventCard } from "@/components/cards";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { PageSection } from "@/components/ui";
import { events } from "@/lib/site-data";

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="A calendar designed for social gravity."
        description="FFSET events mix music, gaming, wine culture, and celebration formats that keep the lounge active and worth returning to."
      />
      <PageSection containerClassName="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event, index) => (
            <Reveal key={event.title} delay={index * 0.08}>
              <EventCard {...event} />
            </Reveal>
          ))}
      </PageSection>
    </>
  );
}
