import axios, { AxiosError } from "axios";
import type { Barber, BarberSlotDTO } from "../models/Barber.ts";
import type { Booking } from "../models/Booking.ts";

import {
  BOOKINGS_PATH,
  CLOSED_DAYS,
  weekdays,
  HOLIDAYS,
} from "../utils/constants.ts";

import { generateTimeSlots, tsToYMD } from "../utils/helper.ts";
import { readJSON } from "../utils/storage.ts";
import { isValidDateOnly } from "../utils/validation.ts";

export class BarbersService {
  private static API_URL = process.env.API_URL!;
  private static API_KEY = process.env.API_KEY!;

  static async fetchAll(): Promise<Barber[]> {
    try {
      const response = await axios.get<Barber[]>(this.API_URL, {
        headers: { "x-api-key": this.API_KEY },
      });

      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error("External API error:", err.response?.data ?? err.message);
      throw new Error("Failed to fetch barbers");
    }
  }
  static async computeSlots(
    barberId: string,
    date: string
  ): Promise<BarberSlotDTO[]> {
    if (!isValidDateOnly(date)) {
      throw new Error("Invalid date format. Expected YYYY-MM-DD");
    }

    const barbers = await BarbersService.fetchAll();
    const barber = barbers.find((barber) => barber.id === barberId);
    if (!barber) throw new Error("Barber not found");

    const [y, m, d] = date.split("-").map(Number);
    const dayIndex = new Date(y, m - 1, d).getDay();

    const dayName = weekdays[dayIndex] as keyof Barber["workSchedule"];
    const schedule = barber.workSchedule[dayName];

    if (!schedule || !schedule.start || !schedule.end) return [];
    if (CLOSED_DAYS.includes(dayIndex)) return [];

    const monthDay = `${String(m).padStart(2, "0")}-${String(d).padStart(
      2,
      "0"
    )}`;
    if (HOLIDAYS.includes(monthDay)) return [];

    const allSlots = generateTimeSlots(date, schedule.start, schedule.end);

    const now = Date.now();
    const today = tsToYMD(now);
    const validSlots =
      date === today ? allSlots.filter((slot) => slot.end > now) : allSlots;

    const bookings = readJSON<Booking[]>(BOOKINGS_PATH);

    const bookedSlots = bookings
      .filter(
        (booking) =>
          booking.barberId === barberId &&
          tsToYMD(Number(booking.start)) === date
      )
      .map((bookedSlot) => ({
        start: Number(bookedSlot.start),
        end: Number(bookedSlot.end),
      }));

    return validSlots.filter(
      (slot) =>
        !bookedSlots.some(
          (bookedSlot) =>
            slot.start < bookedSlot.end && slot.end > bookedSlot.start
        )
    );
  }
}
