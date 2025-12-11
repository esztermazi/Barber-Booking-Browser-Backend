const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getBookings(email: string) {
  if (!email) {
    throw new Error("Email is required");
  }

  const url = `${NEXT_PUBLIC_BACKEND_URL}/bookings?email=${encodeURIComponent(
    email
  )}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return res.json();
}

export async function createBooking(body: {
  barberId: string;
  start: number;
  end: number;
  email: string;
}) {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to create booking");

  return res.json();
}
