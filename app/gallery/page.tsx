import Image from "next/image";
import { LazyVideo } from "@/components/lazy-video";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { PageSection, Panel } from "@/components/ui";
import { galleryItems } from "@/lib/site-data";

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A live gallery using your real assets, not filler placeholders."
        description="The gallery already reflects the FFSET brand through actual imagery and video, while leaving room for future categorization and CMS-backed uploads."
      />
      <PageSection containerClassName="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {galleryItems.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.06}>
            <Panel className="overflow-hidden rounded-[1.75rem] p-0">
              <div className="relative aspect-[4/3]">
                {item.type === "video" ? (
                  <LazyVideo
                    className="h-full w-full object-cover"
                    src={item.src}
                    poster="/logo-crop.jpeg"
                    autoPlay
                    controls
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <Image src={item.src} alt={item.title} fill loading="lazy" className="object-cover" />
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--gold)]">{item.category}</p>
                  <p className="display-font mt-2 text-2xl text-white">{item.title}</p>
                </div>
              </div>
            </Panel>
          </Reveal>
        ))}
      </PageSection>
    </>
  );
}
