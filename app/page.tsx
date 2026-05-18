import FloatingHeader from "@/components/FloatingHeader";
import HeroCanvas from "@/components/HeroCanvas";
import VisionSection from "@/components/VisionSection";
import WorksSection from "@/components/WorksSection";

export default function Home() {
  return (
    <>
      <FloatingHeader />
      <main>
        <HeroCanvas />
        <div id="contact">
          <VisionSection />
        </div>
        <div id="works">
          <WorksSection />
        </div>
      </main>
    </>
  );
}
