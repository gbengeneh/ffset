import { CompetitionRegisterForm } from "@/components/forms/competition-register-form";
import { PageHero } from "@/components/page-hero";
import { PageSection } from "@/components/ui";

export default function CompetitionRegistrationPage() {
  return (
    <>
      <PageHero
        eyebrow="Register"
        title="Secure your slot for the next FFSET championship."
        description="This registration flow is UI-only for now, but the structure is ready for future player management, payment, and bracket seeding integrations."
      />
      <PageSection>
          <CompetitionRegisterForm />
      </PageSection>
    </>
  );
}
