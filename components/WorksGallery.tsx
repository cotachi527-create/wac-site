"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { Work } from "@/lib/works";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  works: Work[];
}

export default function WorksGallery({ works }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);

  const prev = useCallback(() => {
    setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  const next = useCallback(() => {
    setSelectedIndex((i) => (i !== null && i < works.length - 1 ? i + 1 : i));
  }, [works.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, close, prev, next]);

  const selected = selectedIndex !== null ? works[selectedIndex] : null;

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {works.map((work, index) => (
          <button
            key={work.id}
            onClick={() => setSelectedIndex(index)}
            className="block group text-left w-full"
            aria-label={`Day ${work.id} を拡大表示`}
          >
            <Card
              className="aspect-[4/5] overflow-hidden border-0 shadow-none cursor-zoom-in
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
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm
                     animate-in fade-in duration-200"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="画像ライトボックス"
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-5 right-6 text-white/70 hover:text-white transition-colors
                       text-3xl leading-none select-none z-10"
            aria-label="閉じる"
          >
            ×
          </button>

          {/* Prev arrow */}
          {selectedIndex! > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 text-white/60 hover:text-white transition-colors
                         text-4xl leading-none select-none z-10 px-2 py-4"
              aria-label="前の画像"
            >
              ‹
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-[90vw] h-[85vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={selected.src}
              src={selected.src}
              alt={`Day ${selected.id} — ${selected.title}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Caption */}
          <div className="absolute bottom-6 left-0 right-0 text-center text-white/60 text-xs tracking-[0.25em] uppercase pointer-events-none">
            Day {selected.id}
            {selected.title && selected.title !== "タイトル" && (
              <> &nbsp;—&nbsp; {selected.title}</>
            )}
          </div>

          {/* Next arrow */}
          {selectedIndex! < works.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 text-white/60 hover:text-white transition-colors
                         text-4xl leading-none select-none z-10 px-2 py-4"
              aria-label="次の画像"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
