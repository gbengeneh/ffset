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
      <Panel className="relative overflow-hidden rounded-[2rem] px-5 py-12 md:px-8 md:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(213,170,77,0.15),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(127,15,46,0.3),_transparent_38%)]" />
        <div className="relative max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-font mt-4 text-4xl leading-tight text-white md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)] md:text-base md:leading-8">
            {description}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {primaryCta ? (
                <ActionLink href={primaryCta.href} variant="primary">
                  {primaryCta.label}
                </ActionLink>
              ) : null}
              {secondaryCta ? (
                <ActionLink href={secondaryCta.href} variant="secondary">
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
