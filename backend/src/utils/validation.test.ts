import {
  isValidEmail,
  isValidDate,
  isValidDateOnly,
  isValidTimestamp,
  isFutureTimestamp,
  isWithinOpeningHours,
  isSunday,
  isHoliday,
} from "./validation.js";

describe("validation helpers", () => {
  describe("isValidEmail", () => {
    test("accepts valid emails", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
    });

    test("rejects invalid emails", () => {
      expect(isValidEmail("invalid")).toBe(false);
      expect(isValidEmail("a@b")).toBe(false);
    });
  });

  describe("isValidDate", () => {
    test("accepts valid timestamp", () => {
      expect(isValidDate(Date.now())).toBe(true);
    });

    test("rejects invalid timestamp", () => {
      expect(isValidDate(NaN)).toBe(false);
    });
  });

  describe("isValidDateOnly", () => {
    test("accepts YYYY-MM-DD format", () => {
      expect(isValidDateOnly("2025-05-09")).toBe(true);
    });

    test("rejects invalid dates", () => {
      expect(isValidDateOnly("2025-13-01")).toBe(false);
      expect(isValidDateOnly("2025-02-31")).toBe(false);
      expect(isValidDateOnly("invalid")).toBe(false);
    });
  });

  describe("isValidTimestamp", () => {
    test("accepts positive numbers", () => {
      expect(isValidTimestamp(Date.now())).toBe(true);
    });

    test("rejects invalid values", () => {
      expect(isValidTimestamp(-1)).toBe(false);
      expect(isValidTimestamp(NaN)).toBe(false);
    });
  });

  describe("isFutureTimestamp", () => {
    test("returns true for future timestamps", () => {
      expect(isFutureTimestamp(Date.now() + 10000)).toBe(true);
    });

    test("returns false for past timestamps", () => {
      expect(isFutureTimestamp(Date.now() - 10000)).toBe(false);
    });
  });

  describe("isWithinOpeningHours", () => {
    test("returns true during opening hours", () => {
      const ts = new Date(2025, 0, 1, 10, 0).getTime();
      expect(isWithinOpeningHours(ts)).toBe(true);
    });
  });

  describe("isSunday", () => {
    test("detects closed days correctly", () => {
      const sunday = new Date(2025, 0, 5).getTime();
      expect(isSunday(sunday)).toBe(true);
    });
  });

  describe("isHoliday", () => {
    test("detects holidays", () => {
      const holiday = new Date(2025, 11, 25).getTime();
      expect(isHoliday(holiday)).toBe(true);
    });

    test("returns false for non-holidays", () => {
      const normalDay = new Date(2025, 10, 20).getTime();
      expect(isHoliday(normalDay)).toBe(false);
    });
  });
});
