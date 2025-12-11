import axios, { AxiosError } from "axios";
import type { Barber, BarberSlotDTO } from "../models/Barber.ts";
import type { Booking } from "../models/Booking.ts";

import {
  OPENING_HOUR,
  CLOSING_HOUR,
  BOOKINGS_PATH,
} from "../utils/constants.ts";

import { toTimeString, generateTimeSlots } from "../utils/helper.ts";
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

  static computeSlots(barberId: string, date: string): BarberSlotDTO[] {
    if (!isValidDateOnly(date)) {
      throw new Error(
        "Invalid date format. Expected YYYY-MM-DD (e.g., 2025-12-13)"
      );
    }

    const allSlots = generateTimeSlots(
      date,
      toTimeString(OPENING_HOUR),
      toTimeString(CLOSING_HOUR)
    );

    const bookings = readJSON<Booking[]>(BOOKINGS_PATH);

    const bookedSlots: BarberSlotDTO[] = bookings
      .filter(
        (b: Booking) =>
          b.barberId === barberId &&
          new Date(Number(b.start)).toISOString().slice(0, 10) === date
      )
      .map((b: Booking) => ({
        start: Number(b.start),
        end: Number(b.end),
      }));

    return allSlots.filter(
      (slot: BarberSlotDTO) =>
        !bookedSlots.some(
          (b: BarberSlotDTO) => slot.start < b.end && slot.end > b.start
        )
    );
  }
}
