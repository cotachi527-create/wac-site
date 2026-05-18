import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { works } from "@/lib/works";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return works.map((w) => ({ id: w.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const work = works.find((w) => w.id === params.id);
  if (!work) return {};
  return {
    title: `Day ${work.id} — ${work.title} | WAC`,
  };
}

export default function WorkPage({ params }: { params: { id: string } }) {
  const work = works.find((w) => w.id === params.id);
  if (!work) notFound();

  const currentIndex = works.indexOf(work);
  const prev = works[currentIndex - 1] ?? null;
  const next = works[currentIndex + 1] ?? null;

  return (
    <div className="min-h-screen bg-[#fafaf8] font-[family-name:var(--font-serif)]">
      {/* Back link */}
      <div className="px-8 pt-10 pb-6 max-w-5xl mx-auto">
        <Link
          href="/#works"
          className="group inline-flex items-center gap-2 text-xs tracking-[0.2em] text-[#888] uppercase
                     hover:text-[#333] transition-colors"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Works
        </Link>
      </div>

      <main className="max-w-5xl mx-auto px-8 pb-24">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] bg-[#e8e8e8] overflow-hidden">
          <Image
            src={work.src}
            alt={`Day ${work.id} — ${work.title}`}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 900px"
            priority
          />
        </div>

        {/* Info */}
        <div className="mt-10 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="space-y-3">
            <p className="text-xs tracking-[0.3em] text-[#aaa] uppercase">Day {work.id}</p>
            <h1 className="text-3xl font-light tracking-wide text-[#222]">{work.title}</h1>
            <p className="text-sm text-[#aaa] tracking-wider">{work.date}</p>
          </div>

          {work.tags && work.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {work.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs tracking-widest rounded-none border-[#ccc] text-[#666]">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {work.description && (
          <p className="mt-8 text-[#555] leading-loose max-w-2xl">{work.description}</p>
        )}

        {/* Prev / Next */}
        <div className="mt-20 pt-8 border-t border-[#e8e8e8] flex justify-between items-center">
          {prev ? (
            <Link
              href={`/works/${prev.id}`}
              className="group flex items-center gap-3 text-sm tracking-[0.15em] text-[#666] hover:text-[#111] transition-colors"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <span>
                <span className="block text-xs text-[#aaa] mb-0.5">Prev</span>
                Day {prev.id}
              </span>
            </Link>
          ) : <span />}

          {next ? (
            <Link
              href={`/works/${next.id}`}
              className="group flex items-center gap-3 text-sm tracking-[0.15em] text-[#666] hover:text-[#111] transition-colors text-right"
            >
              <span>
                <span className="block text-xs text-[#aaa] mb-0.5">Next</span>
                Day {next.id}
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          ) : <span />}
        </div>
      </main>
    </div>
  );
}
