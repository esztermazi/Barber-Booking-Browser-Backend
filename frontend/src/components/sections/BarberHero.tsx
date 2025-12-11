"use client";

import Image from "next/image";

type BarberHeroProps = {
  title: string;
  description?: string;
  imageUrl?: string;
};

export function BarberHero({ title, description, imageUrl }: BarberHeroProps) {
  return (
    <section className="w-full bg-black text-white py-20 px-6 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>

      {description && (
        <p className="max-w-3xl text-center text-lg mb-10 text-white/90">
          {description}
        </p>
      )}

      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          width={800}
          height={450}
          className="rounded-xl shadow-lg"
        />
      )}
    </section>
  );
}
