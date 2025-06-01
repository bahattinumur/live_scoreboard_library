import { describe, it, expect, beforeEach } from "vitest";
import { Match } from "../src/lib/match";

describe("Match", () => {
  let match: Match;

  beforeEach(() => {
    // Create a fresh match before each test
    match = new Match("Spain", "Brazil");
  });

  it("should initialize with correct team names and zero scores", () => {
    // Initial state check for team names and scores
    expect(match.homeTeam).toBe("Spain");
    expect(match.awayTeam).toBe("Brazil");
    expect(match.homeScore).toBe(0);
    expect(match.awayScore).toBe(0);
  });

  it("should have a valid UUID as ID", () => {
    // Check if match ID is a valid UUID v4
    expect(match.id).toBeDefined();
    expect(typeof match.id).toBe("string");
    expect(match.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });

  it("should update home and away scores correctly", () => {
    // Setting valid scores and verifying updates
    match.homeScore = 3;
    match.awayScore = 2;
    expect(match.homeScore).toBe(3);
    expect(match.awayScore).toBe(2);
  });

  it("should not allow negative homeScore", () => {
    // Validation: negative home score should throw
    expect(() => {
      match.homeScore = -1;
    }).toThrow("homeScore cannot be negative.");
  });

  it("should not allow negative awayScore", () => {
    // Validation: negative away score should throw
    expect(() => {
      match.awayScore = -5;
    }).toThrow("awayScore cannot be negative.");
  });

  it("should store the startTime as a Date object", () => {
    // Ensure startTime is correctly stored
    expect(match.startTime instanceof Date).toBe(true);
  });
});
