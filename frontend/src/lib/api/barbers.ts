import { Barber } from "@/types/Barber";

export async function getBarbers(): Promise<Barber[]> {
  const res = await fetch("/api/barbers", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch barbers");
  }

  return res.json();
}

export async function getBarbersServer(): Promise<Barber[]> {
  const backendUrl = process.env.BACKEND_URL;
  const apiKey = process.env.INTERNAL_API_KEY;

  if (!backendUrl || !apiKey) {
    throw new Error("Missing BACKEND_URL or INTERNAL_API_KEY");
  }

  const res = await fetch(`${backendUrl}/barbers`, {
    headers: {
      "X-API-Key": apiKey,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch barbers");
  }

  return res.json();
}

export async function getAvailableSlots(barberId: string, date: string) {
  const res = await fetch(`/api/barbers/${barberId}/slots?date=${date}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch slots");
  }

  return res.json();
}
