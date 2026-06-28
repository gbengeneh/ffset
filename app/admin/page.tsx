import { DashboardCard } from "@/components/cards";
import { PageHero } from "@/components/page-hero";
import { PageSection, Panel } from "@/components/ui";
import { dashboardStats } from "@/lib/site-data";

const adminLinks = [
  "Dashboard",
  "Wines",
  "Events",
  "Competitions",
  "Players",
  "Bookings",
  "Gallery",
  "Messages",
  "Settings",
];

export default function AdminPage() {
  return (
    <>
      <PageHero
        eyebrow="Admin Dashboard Preview"
        title="A future-ready control room for FFSET operations."
        description="This preview stays non-functional for now, but establishes the visual language and information layout needed for eventual admin workflows."
      />
      <PageSection containerClassName="grid gap-6 xl:grid-cols-[260px_1fr]">
        <Panel as="aside" compact>
          <p className="eyebrow">Admin Sidebar</p>
          <div className="mt-5 space-y-2">
            {adminLinks.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/7 bg-white/4 px-4 py-3 text-sm text-[var(--muted)]"
              >
                {item}
              </div>
            ))}
          </div>
        </Panel>
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {dashboardStats.map((card) => (
              <DashboardCard key={card.label} {...card} />
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel as="section">
              <p className="eyebrow">Recent Messages</p>
              <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
                <div className="rounded-2xl border border-white/7 bg-white/4 p-4">
                  New table request for a birthday hangout on Friday night.
                </div>
                <div className="rounded-2xl border border-white/7 bg-white/4 p-4">
                  Competition enquiry requesting team-vs-team format.
                </div>
                <div className="rounded-2xl border border-white/7 bg-white/4 p-4">
                  Bottle reservation request from a returning premium client.
                </div>
              </div>
            </Panel>
            <Panel as="section">
              <p className="eyebrow">Operations Snapshot</p>
              <div className="mt-5 grid gap-3 text-sm text-[var(--muted)]">
                <div className="rounded-2xl border border-white/7 bg-white/4 p-4">
                  Featured event slot prepared for weekly highlight.
                </div>
                <div className="rounded-2xl border border-white/7 bg-white/4 p-4">
                  Inventory UI ready for wine availability syncing.
                </div>
                <div className="rounded-2xl border border-white/7 bg-white/4 p-4">
                  Competition records panel reserved for live bracket data.
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </PageSection>
    </>
  );
}
