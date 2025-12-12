import { v4 as uuid } from "uuid";
import { readJSON, writeJSON } from "../utils/storage.ts";
import {
  isValidEmail,
  isValidTimestamp,
  isFutureTimestamp,
  isWithinOpeningHours,
  isSunday,
  isHoliday,
} from "../utils/validation.ts";
import {
  BOOKINGS_PATH,
  OPENING_HOUR,
  CLOSING_HOUR,
} from "../utils/constants.ts";

import type { Booking, BookingDTO } from "../models/Booking.ts";
import { BarbersService } from "./barbers.service.ts";

export class BookingsService {
  static async getAll(email?: string): Promise<BookingDTO.List[]> {
    const bookings = readJSON<Booking[]>(BOOKINGS_PATH);

    const barbers = await BarbersService.fetchAll();

    const barberMap = new Map(barbers.map((b) => [b.id, b.name]));

    const result = bookings.map((b) => ({
      ...b,
      barber: barberMap.get(b.barberId) ?? "Unknown barber",
    }));

    if (email) {
      return result.filter((b) => b.email === email);
    }

    return result;
  }

  static create(data: BookingDTO.Create): Booking {
    const { barberId, start, end, email } = data;

    if (!barberId || !start || !end || !email) {
      throw new Error("Missing required data");
    }

    if (!isValidEmail(email)) throw new Error("Invalid email format");
    if (!isValidTimestamp(start) || !isValidTimestamp(end))
      throw new Error("Invalid timestamp format");

    if (!isFutureTimestamp(start)) throw new Error("Cannot book past dates");
    if (isSunday(start)) throw new Error("Cannot book on Sundays");
    if (isHoliday(start)) throw new Error("Cannot book on public holidays");

    if (!isWithinOpeningHours(start) || !isWithinOpeningHours(end)) {
      throw new Error(
        `Outside opening hours (${OPENING_HOUR}:00–${CLOSING_HOUR}:00)`
      );
    }

    const bookings = readJSON<Booking[]>(BOOKINGS_PATH);

    const conflict = bookings.some((b: Booking) => {
      if (b.barberId !== barberId) return false;
      return start < b.end && end > b.start;
    });

    if (conflict) {
      throw new Error("This time slot overlaps an existing booking");
    }

    const newBooking: Booking = {
      id: uuid(),
      barberId,
      start,
      end,
      email,
    };

    const updated = [...bookings, newBooking];
    writeJSON(BOOKINGS_PATH, updated);

    return newBooking;
  }

  static delete(id: string): boolean {
    const bookings = readJSON<Booking[]>(BOOKINGS_PATH);
    const exists = bookings.some((b: Booking) => b.id === id);

    if (!exists) return false;

    const updated = bookings.filter((b: Booking) => b.id !== id);
    writeJSON(BOOKINGS_PATH, updated);

    return true;
  }
}
