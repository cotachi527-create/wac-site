"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FloatingHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500
        ${visible
          ? "translate-y-0 opacity-100 bg-white/80 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : "-translate-y-full opacity-0"
        }`}
    >
      <div className="max-w-6xl mx-auto px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-light tracking-[0.35em] text-[#222] hover:opacity-60 transition-opacity"
        >
          WAC
        </Link>

        <nav className="flex items-center gap-10">
          <Link
            href="/#works"
            className="text-xs tracking-[0.2em] text-[#444] uppercase hover:text-[#111] transition-colors"
          >
            Works
          </Link>
          <Link
            href="/#contact"
            className="text-xs tracking-[0.2em] text-[#444] uppercase hover:text-[#111] transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
