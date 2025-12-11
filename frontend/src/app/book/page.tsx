"use client";

import { useEffect, useState } from "react";
import { getAvailableSlots, getBarbers } from "@/lib/api/barbers";
import { createBooking } from "@/lib/api/bookings";
import type { Barber } from "@/types/Barber";
import type { BarberSlot } from "@/types/Barber";

export default function BookPage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [barberId, setBarberId] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<BarberSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<BarberSlot | null>(null);
  const [email, setEmail] = useState("");

  const [loadingSlots, setLoadingSlots] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getBarbers();
      setBarbers(data);
    }
    load();
  }, []);

  async function loadSlots() {
    if (!barberId || !date) return;

    setLoadingSlots(true);
    setError("");
    setSlots([]);

    try {
      const data = await getAvailableSlots(barberId, date);
      setSlots(data);
    } catch {
      setError("Failed to load slots");
    }

    setLoadingSlots(false);
  }

  async function handleBooking() {
    if (!selectedSlot || !email || !barberId) {
      setError("Please select barber, date, slot, and enter email.");
      return;
    }

    try {
      await createBooking({
        barberId,
        start: selectedSlot.start,
        end: selectedSlot.end,
        email,
      });

      setSuccess("Appointment successfully booked!");
      setError("");
    } catch {
      setError("Failed to create booking");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Book an Appointment</h1>

      <label className="block mb-2 font-medium">Choose a Barber</label>
      <select
        value={barberId}
        onChange={(e) => setBarberId(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-6"
      >
        <option value="">Select barber…</option>
        {barbers.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      <label className="block mb-2 font-medium">Choose a Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-6"
      />

      <button
        onClick={loadSlots}
        disabled={!barberId || !date}
        className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-400"
      >
        Load Available Slots
      </button>

      {loadingSlots && <p className="mt-4">Loading slots…</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {slots.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Available Time Slots</h2>

          <ul className="space-y-2">
            {slots.map((slot) => (
              <li key={slot.start}>
                <button
                  className={`w-full border p-3 rounded ${
                    selectedSlot?.start === slot.start
                      ? "bg-black text-white"
                      : "bg-white"
                  }`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {new Date(slot.start).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {" — "}
                  {new Date(slot.end).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedSlot && (
        <>
          <label className="block mt-6 mb-2 font-medium">Your Email</label>
          <input
            type="email"
            className="border px-3 py-2 rounded w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <button
            onClick={handleBooking}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Schedule Appointment
          </button>
        </>
      )}

      {success && <p className="text-green-600 mt-4">{success}</p>}
    </div>
  );
}
