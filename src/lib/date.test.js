import { describe, test, expect } from "vitest";
import { formatDate } from "./date";

describe("formatDate", () => {
  test("returns 'Date TBA' when no date is given", () => {
    expect(formatDate(null)).toBe("Date TBA");
  });

  test("returns the original text when it isn't a real date", () => {
    expect(formatDate("Coming soon")).toBe("Coming soon");
  });

  test("formats a valid date string as 'Mon DD, YYYY'", () => {
    expect(formatDate("2026-08-15")).toBe("Aug 15, 2026");
  });
});