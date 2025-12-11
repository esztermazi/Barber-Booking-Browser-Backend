import { Barber } from "@/types/Barber";

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getBarbers(): Promise<Barber[]> {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/barbers`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch barbers");
  }

  return res.json() as Promise<Barber[]>;
}

export async function getAvailableSlots(barberId: string, date: string) {
  const url = `${NEXT_PUBLIC_BACKEND_URL}/barbers/${barberId}/slots?date=${date}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch slots");

  return res.json();
}
