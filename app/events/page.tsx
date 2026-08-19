import { EventStoryCard } from "@/components/event-story-card";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ActionLink, PageSection, Panel } from "@/components/ui";
import { getEvents } from "@/lib/public-api";
import { toEventCardProps } from "@/lib/public-mappers";
import { contactDetails } from "@/lib/site-data";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="A calendar designed for social gravity."
        description="Weekly nights, monthly tastings, and private hangouts — every event is a reason to come back."
      />

      <PageSection containerClassName="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {events.map((event, index) => (
          <Reveal key={event.id} delay={index * 0.06}>
            <EventStoryCard {...toEventCardProps(event)} />
          </Reveal>
        ))}
      </PageSection>

      <PageSection className="section-space pt-0">
        <Reveal>
          <Panel className="flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <p className="eyebrow text-[0.68rem]">Private Events</p>
              <h2 className="display-font mt-2 text-[1.3rem] leading-[1.15] text-white sm:text-[1.6rem]">
                Planning something private? We&apos;ll build the night around you.
              </h2>
              <p className="mt-2 max-w-xl text-[0.85rem] leading-6 text-[var(--muted)] sm:text-[0.9rem]">
                Birthdays, work hangouts, or a full-lounge takeover — tell us the occasion and
                we&apos;ll shape the setup, seating, and service around it.
              </p>
            </div>
            <ActionLink href={contactDetails.whatsapp} variant="primary" className="shrink-0 px-4 py-2.5 text-[0.83rem]">
              Plan an Event
            </ActionLink>
          </Panel>
        </Reveal>
      </PageSection>
    </>
  );
}
