import { works } from "@/lib/works";
import WorksGallery from "@/components/WorksGallery";

export default function WorksSection() {
  return (
    <section className="py-20 px-[10%] bg-white">
      <h2 className="text-2xl font-light text-[#333] mb-1">Selected Works</h2>
      <div className="mb-12" />
      <WorksGallery works={works} />
    </section>
  );
}
