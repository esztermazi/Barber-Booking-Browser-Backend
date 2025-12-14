import axios, { AxiosError } from "axios";
import type { Barber, BarberSlotDTO } from "../models/Barber.js";
import type { Booking } from "../models/Booking.js";

import {
  BOOKINGS_PATH,
  CLOSED_DAYS,
  weekdays,
  HOLIDAYS,
} from "../utils/constants.js";

import { generateTimeSlots, tsToYMD } from "../utils/helper.js";
import { readJSON } from "../utils/storage.js";
import { isValidDateOnly } from "../utils/validation.js";

export class BarbersService {
  private static getApiConfig() {
    const API_URL = process.env.API_URL;
    const API_KEY = process.env.API_KEY;

    if (!API_URL) {
      throw new Error("Missing API_URL environment variable");
    }

    if (!API_KEY) {
      throw new Error("Missing API_KEY environment variable");
    }

    return { API_URL, API_KEY };
  }

  static async fetchAll(): Promise<Barber[]> {
    const { API_URL, API_KEY } = this.getApiConfig();

    try {
      const response = await axios.get<Barber[]>(API_URL, {
        headers: { "x-api-key": API_KEY },
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

    const today = tsToYMD(Date.now());
    if (date < today) {
      return [];
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
    const validSlots =
      date === today ? allSlots.filter((slot) => slot.end > now) : allSlots;

    const bookings = readJSON<Booking[]>(BOOKINGS_PATH);

    const bookedSlots = bookings
      .filter(
        (booking) =>
          booking.barberId === barberId &&
          tsToYMD(Number(booking.start)) === date
      )
      .map((b) => ({
        start: Number(b.start),
        end: Number(b.end),
      }));

    return validSlots.filter(
      (slot) =>
        !bookedSlots.some((b) => slot.start < b.end && slot.end > b.start)
    );
  }
}
