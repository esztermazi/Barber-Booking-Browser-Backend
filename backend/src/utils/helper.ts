import { BarberSlotDTO } from "../models/Barber";

export function generateTimeSlots(
  date: string,
  openTime: string,
  closeTime: string,
  stepMinutes: number = 30
): BarberSlotDTO[] {
  const slots: BarberSlotDTO[] = [];

  const startTs = new Date(`${date}T${openTime}:00`).getTime();
  const endTs = new Date(`${date}T${closeTime}:00`).getTime();
  const step = stepMinutes * 60 * 1000;

  for (let ts = startTs; ts < endTs; ts += step) {
    slots.push({
      start: ts,
      end: ts + step,
    });
  }

  return slots;
}

export const toTimeString = (h: number): string =>
  `${String(h).padStart(2, "0")}:00`;
