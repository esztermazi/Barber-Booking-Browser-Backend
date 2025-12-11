import { Barber } from "@/types/Barber";

export async function getBarbers(): Promise<Barber[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/barbers`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch barbers");
  }

  return res.json() as Promise<Barber[]>;
}
