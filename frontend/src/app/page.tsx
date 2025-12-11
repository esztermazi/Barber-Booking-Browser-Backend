"use client";

import { BarberHero } from "@/components/sections/BarberHero";
import { Hero } from "@/components/sections/Hero";
import { useRef } from "react";

export default function Home() {
  const aboutRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <Hero onScroll={handleScroll} />
      <div ref={aboutRef}>
        <BarberHero
          title="About Us"
          description="At BBB Barber Shop, we specialize in delivering high–quality grooming experiences tailored to your style. Our expert team has mastered both modern and classic cuts — ensuring every visit leaves you confident, sharp, and refreshed."
          imageUrl="/barber-working.jpg"
        />
      </div>
    </div>
  );
}
