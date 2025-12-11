"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full h-16 z-50 bg-transparent backdrop-blur-sm border-b border-white/20">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center text-white">
        <Link href="/" className="text-2xl font-bold tracking-wide">
          B𐤡B
        </Link>

        <div className="hidden md:flex gap-6 text-sm">
          <Link
            href="/barbers"
            className="px-3 py-2 border border-white/20 rounded-md hover:border-white/40 transition"
          >
            Barbers
          </Link>
          <Link
            href="/appointments"
            className="px-3 py-2 border border-white/20 rounded-md hover:border-white/40 transition"
          >
            Appointments
          </Link>
          <Link
            href="/book"
            className="bg-[#8B5A2B] px-3 py-1 rounded font-[Impact,_Haettenschweiler,_'Arial_Narrow_Bold',_sans-serif] tracking-wide text-lg hover:bg-[#7a4f25] transition"
          >
            Schedule
          </Link>
        </div>

        <Button
          className="md:hidden text-2xl focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </Button>
      </nav>

      <div
        className={`md:hidden bg-black/40 backdrop-blur-md border-b border-white/10 text-white px-6 py-4 flex flex-col gap-4 text-lg transition-all duration-300 ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <Link href="/barbers" onClick={() => setOpen(false)}>
          Barbers
        </Link>
        <Link href="/appointments" onClick={() => setOpen(false)}>
          Appointments
        </Link>
        <Link href="/book" onClick={() => setOpen(false)}>
          Schedule
        </Link>
      </div>
    </header>
  );
}
