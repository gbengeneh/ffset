import { GalleryGrid } from "@/components/gallery-grid";
import { PageHero } from "@/components/page-hero";
import { PageSection } from "@/components/ui";
import { getGallery } from "@/lib/public-api";
import { toGalleryItemProps } from "@/lib/public-mappers";

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Inside FFSET, in pictures and video."
        description="Wine nights, snooker tables, packages, and moments from real visits — tap any tile for a closer look."
      />
      <PageSection>
        <GalleryGrid items={items.map(toGalleryItemProps)} />
      </PageSection>
    </>
  );
}
