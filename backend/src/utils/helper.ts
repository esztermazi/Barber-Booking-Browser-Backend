import { BarberSlotDTO } from "../models/Barber";

export function generateTimeSlots(
  date: string,
  openTime: string,
  closeTime: string,
  stepMinutes: number = 30
): BarberSlotDTO[] {
  const slots: BarberSlotDTO[] = [];

  const [year, month, day] = date.split("-").map(Number);
  const [openH, openM] = openTime.split(":").map(Number);
  const [closeH, closeM] = closeTime.split(":").map(Number);

  const startTs = new Date(year, month - 1, day, openH, openM).getTime();
  const endTs = new Date(year, month - 1, day, closeH, closeM).getTime();
  const step = stepMinutes * 60 * 1000;

  for (let ts = startTs; ts < endTs; ts += step) {
    slots.push({
      start: ts,
      end: ts + step,
    });
  }

  return slots;
}

export function tsToYMD(ts: number) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}
