import { PageHero } from "@/components/page-hero";
import { ServicesShowcase } from "@/components/services-showcase";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Every offering is designed to feel premium, social, and memorable."
        description="From prestige wines to structured competitions, FFSET Lounge brings multiple entertainment moods into one polished environment."
      />
      <ServicesShowcase className="pt-0" />
    </>
  );
}
