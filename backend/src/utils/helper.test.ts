import { generateTimeSlots, tsToYMD } from "./helper.js";

describe("helper time slot functions", () => {
  test("generateTimeSlots creates correct 30-min slots", () => {
    const slots = generateTimeSlots("2025-01-01", "09:00", "11:00", 30);

    expect(slots).toHaveLength(4);

    expect(slots[0]).toEqual({
      start: new Date(2025, 0, 1, 9, 0).getTime(),
      end: new Date(2025, 0, 1, 9, 30).getTime(),
    });

    expect(slots[3]).toEqual({
      start: new Date(2025, 0, 1, 10, 30).getTime(),
      end: new Date(2025, 0, 1, 11, 0).getTime(),
    });
  });

  test("generateTimeSlots respects custom step size", () => {
    const slots = generateTimeSlots("2025-01-01", "10:00", "11:00", 15);
    expect(slots).toHaveLength(4);
  });

  test("tsToYMD converts timestamp correctly", () => {
    const ts = new Date(2025, 4, 9).getTime();
    expect(tsToYMD(ts)).toBe("2025-05-09");
  });
});
