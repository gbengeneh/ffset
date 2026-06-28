import { BookingForm } from "@/components/forms/booking-form";
import { PageHero } from "@/components/page-hero";
import { PageSection } from "@/components/ui";

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Bookings"
        title="Reserve your table for a lounge night that feels intentional."
        description="The reservation experience is already shaped for future availability logic, CRM follow-up, and booking approvals once the backend is introduced."
      />
      <PageSection>
          <BookingForm />
      </PageSection>
    </>
  );
}
