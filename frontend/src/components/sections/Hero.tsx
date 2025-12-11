"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollDownIcon } from "../ui/scroll-down-icon";

export function Hero({ onScroll }: { onScroll: () => void }) {
  return (
    <section
      className="h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center relative"
      style={{ backgroundImage: "url('/wallpaper.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <main className="relative z-10 flex flex-col gap-6 items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          Crafting confidence
          <br /> just one cut at a time
        </h1>

        <p className="text-lg md:text-xl max-w-xl drop-shadow-md">
          Book your next session with a professional barber and enjoy a premium
          grooming experience.
        </p>

        <Link href="/book">
          <Button
            size="lg"
            className="cursor-pointer px-8 py-4 text-lg font-[Impact,_Haettenschweiler,_'Arial_Narrow_Bold',_sans-serif] bg-white text-black hover:bg-white/80 transition"
          >
            Schedule an appointment
          </Button>
        </Link>

        <p className="text-2xl text-white mt-4 font-[Snell_Roundhand,Segoe_Script,'Brush_Script_MT',cursive]">
          Look under the table
        </p>

        <ScrollDownIcon onClick={onScroll} />
      </main>
    </section>
  );
}
