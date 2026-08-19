"use client";

import { BarList } from "@/components/admin/bar-list";
import {
  BookingsIcon,
  CompetitionsIcon,
  MailIcon,
  RegistrationsIcon,
  RevenueIcon,
  StockIcon,
  WarningIcon,
} from "@/components/admin/icons";
import { AdminPageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { useApiResource } from "@/hooks/use-api-resource";
import {
  formatNaira,
  type BookingsAnalytics,
  type CompetitionAnalyticsRow,
  type DashboardStats,
  type PlayersAnalytics,
  type SalesReport,
  type TopProductsReport,
} from "@/lib/admin-types";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-5">
      <p className="eyebrow mb-4 text-[0.68rem]">{title}</p>
      {children}
    </div>
  );
}

export default function AdminDashboardPage() {
  const { data: stats, loading: statsLoading } = useApiResource<DashboardStats>("/admin/dashboard/stats");
  const { data: sales, loading: salesLoading } = useApiResource<SalesReport>("/admin/reports/sales");
  const { data: topProducts, loading: topProductsLoading } = useApiResource<TopProductsReport>(
    "/admin/analytics/top-products"
  );
  const { data: competitions, loading: competitionsLoading } = useApiResource<CompetitionAnalyticsRow[]>(
    "/admin/analytics/competitions"
  );
  const { data: bookings, loading: bookingsLoading } = useApiResource<BookingsAnalytics>(
    "/admin/analytics/bookings"
  );
  const { data: players, loading: playersLoading } = useApiResource<PlayersAnalytics>(
    "/admin/analytics/players"
  );

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Dashboard"
        description="A live snapshot of FFSET Lounge operations — bookings, competitions, inventory, and revenue."
      />

      {statsLoading || !stats ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-6 text-sm text-[var(--muted)]">
          Loading stats…
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Revenue Today" value={formatNaira(stats.revenue_today)} icon={RevenueIcon} />
          <StatCard label="Revenue This Month" value={formatNaira(stats.revenue_this_month)} icon={RevenueIcon} />
          <StatCard label="Total Bookings" value={String(stats.total_bookings)} icon={BookingsIcon} />
          <StatCard
            label="Competition Registrations"
            value={String(stats.total_registrations)}
            icon={RegistrationsIcon}
          />
          <StatCard label="Upcoming Events" value={String(stats.upcoming_events)} icon={CompetitionsIcon} />
          <StatCard label="Available Products" value={String(stats.available_products)} icon={StockIcon} />
          <StatCard label="Low Stock Products" value={String(stats.low_stock_products)} icon={WarningIcon} />
          <StatCard label="Unread Messages" value={String(stats.recent_messages)} icon={MailIcon} />
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Revenue — Last 30 Days">
          {salesLoading || !sales ? (
            <p className="text-sm text-[var(--muted)]">Loading…</p>
          ) : (
            <BarList
              items={sales.rows.map((row) => ({ label: row.date, value: Number(row.revenue) }))}
              valueFormatter={(value) => formatNaira(value)}
            />
          )}
        </Section>

        <Section title="Top Products — Last 30 Days">
          {topProductsLoading || !topProducts ? (
            <p className="text-sm text-[var(--muted)]">Loading…</p>
          ) : (
            <BarList
              items={topProducts.rows.map((row) => ({
                label: row.product.name,
                value: Number(row.total_revenue),
              }))}
              valueFormatter={(value) => formatNaira(value)}
            />
          )}
        </Section>

        <Section title="Competitions">
          {competitionsLoading || !competitions ? (
            <p className="text-sm text-[var(--muted)]">Loading…</p>
          ) : competitions.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">No competitions yet.</p>
          ) : (
            <div className="space-y-3">
              {competitions.map((competition) => (
                <div key={competition.id} className="rounded-lg border border-white/7 bg-white/3 p-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-white">{competition.title}</p>
                    <span className="text-xs text-[var(--gold-soft)]">{competition.status}</span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {competition.paid_registrations} paid · {competition.pending_registrations} pending ·{" "}
                    {formatNaira(competition.revenue)} revenue
                  </p>
                </div>
              ))}
            </div>
          )}
        </Section>

        <Section title="Bookings & Players">
          {bookingsLoading || !bookings || playersLoading || !players ? (
            <p className="text-sm text-[var(--muted)]">Loading…</p>
          ) : (
            <div className="space-y-4">
              <BarList
                items={bookings.by_status.map((row) => ({ label: row.status, value: row.count }))}
              />
              <p className="text-xs text-[var(--muted)]">
                {players.total_players} registered players in total.
              </p>
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}
