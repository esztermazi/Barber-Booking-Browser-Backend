import { jest } from "@jest/globals";
import { BarbersService } from "./barbers.service.js";
import { tsToYMD } from "../utils/helper.js";

jest.spyOn(BarbersService, "fetchAll").mockResolvedValue([
  {
    id: "barber-1",
    name: "Test Barber",
    workSchedule: {
      monday: { start: "09:00", end: "17:00" },
      tuesday: { start: "09:00", end: "17:00" },
      wednesday: { start: "09:00", end: "17:00" },
      thursday: { start: "09:00", end: "17:00" },
      friday: { start: "09:00", end: "17:00" },
    },
  },
] as any);

describe("BarbersService.computeSlots", () => {
  it("returns empty array for past date", async () => {
    const yesterday = tsToYMD(Date.now() - 24 * 60 * 60 * 1000);

    const slots = await BarbersService.computeSlots("barber-1", yesterday);

    expect(slots).toEqual([]);
  });

  it("throws error for invalid date format", async () => {
    await expect(
      BarbersService.computeSlots("barber-1", "2025/01/01")
    ).rejects.toThrow("Invalid date format");
  });

  it("generates slots successfully for a future working day", async () => {
    const tomorrow = tsToYMD(Date.now() + 24 * 60 * 60 * 1000);

    const slots = await BarbersService.computeSlots("barber-1", tomorrow);

    expect(slots.length).toBeGreaterThan(0);

    expect(slots[0]).toHaveProperty("start");
    expect(slots[0]).toHaveProperty("end");

    expect(slots[0].start).toBeLessThan(slots[0].end);
  });
});
