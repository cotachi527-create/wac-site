import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { works } from "@/lib/works";

export default function WorksSection() {
  return (
    <section className="py-20 px-[10%] bg-white">
      <h2 className="text-2xl font-light text-[#333] mb-1">Selected Works</h2>
      <div className="mb-12" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {works.map((work) => (
          <Link key={work.id} href={`/works/${work.id}`} className="block group">
            <Card
              className="aspect-[4/5] overflow-hidden border-0 shadow-none cursor-pointer
                         transition-transform duration-400 group-hover:scale-[0.98]
                         group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                         relative bg-[#e8e8e8] rounded-none p-0"
            >
              <CardContent className="p-0 h-full relative">
                <Image
                  src={work.src}
                  alt={`Day ${work.id}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div
                  className="absolute inset-x-0 bottom-0 px-5 py-4
                             bg-gradient-to-t from-black/65 to-transparent
                             text-white text-sm tracking-wide
                             opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                >
                  Day {work.id} &nbsp;|&nbsp; {work.title}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
