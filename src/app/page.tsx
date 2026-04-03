import { HeroSection } from "@/components/landing/hero-section";
import { BeforeAfterTransform } from "@/components/landing/before-after-transform";
import { ImpactStatements } from "@/components/landing/impact-statements";
import { CreationCards } from "@/components/landing/creation-cards";
import { QuickStartPrompts } from "@/components/landing/quick-start-prompts";
import { ExemplarGallery } from "@/components/landing/exemplar-gallery";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BeforeAfterTransform />
      <ImpactStatements />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <CreationCards />
          <QuickStartPrompts />
        </div>
      </section>
      <ExemplarGallery />
    </>
  );
}
