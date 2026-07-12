import { ActionLink, PageSection, Panel } from "@/components/ui";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <PageSection className="section-space">
      <Panel className="relative overflow-hidden rounded-[1.75rem] px-5 py-8 sm:px-7 sm:py-9 md:px-8 md:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(213,170,77,0.15),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(127,15,46,0.3),_transparent_38%)]" />
        <div className="relative max-w-3xl">
          <p className="eyebrow text-[0.68rem]">{eyebrow}</p>
          <h1 className="display-font mt-3 text-[1.85rem] leading-[1.1] text-white sm:text-[2.3rem] md:text-[2.9rem]">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-[0.85rem] leading-6 text-[var(--muted)] sm:text-[0.92rem] sm:leading-7 md:text-base">
            {description}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-5 flex flex-wrap gap-2.5">
              {primaryCta ? (
                <ActionLink href={primaryCta.href} variant="primary" className="px-4 py-2.5 text-[0.83rem]">
                  {primaryCta.label}
                </ActionLink>
              ) : null}
              {secondaryCta ? (
                <ActionLink href={secondaryCta.href} variant="secondary" className="px-4 py-2.5 text-[0.83rem]">
                  {secondaryCta.label}
                </ActionLink>
              ) : null}
            </div>
          )}
        </div>
      </Panel>
    </PageSection>
  );
}
