import { describe, it, expect, beforeEach } from "vitest";
import { Scoreboard } from "../src/lib/scoreboard";

describe("Scoreboard", () => {
  let scoreboard: Scoreboard;

  beforeEach(() => {
    // Fresh scoreboard instance before each test
    scoreboard = new Scoreboard();
  });

  it("should start a match and return a valid match id", () => {
    // Basic match start test
    const matchId = scoreboard.startMatch("Mexico", "Canada");
    const matches = scoreboard.getOngoingMatches();
    expect(matches).toHaveLength(1);
    expect(matches[0].id).toBe(matchId);
    expect(matches[0].homeTeam).toBe("Mexico");
    expect(matches[0].awayTeam).toBe("Canada");
  });

  it("should update match scores correctly", () => {
    // Verifies that score updates are reflected
    const matchId = scoreboard.startMatch("Spain", "Brazil");
    scoreboard.updateScore(matchId, 10, 2);
    const match = scoreboard.getOngoingMatches()[0];
    expect(match.homeScore).toBe(10);
    expect(match.awayScore).toBe(2);
  });

  it("should throw if trying to update score of non-existent match", () => {
    // Error handling for invalid match ID
    expect(() => scoreboard.updateScore("invalid-id", 1, 1)).toThrow(
      "No match found."
    );
  });

  it("should finish a match and remove it from the scoreboard", () => {
    // Finish match and check if it's removed
    const matchId = scoreboard.startMatch("Germany", "France");
    scoreboard.finishMatch(matchId);
    expect(scoreboard.getOngoingMatches()).toHaveLength(0);
  });

  it("should throw if trying to finish a non-existent match", () => {
    // Error case for finishing a match that doesn't exist
    expect(() => scoreboard.finishMatch("invalid-id")).toThrow(
      "No match found."
    );
  });

  it("should return summary sorted by total score and start time", async () => {
    // Add matches with different total scores and start times
    const id1 = scoreboard.startMatch("Mexico", "Canada");
    await wait(10);
    const id2 = scoreboard.startMatch("Spain", "Brazil");
    await wait(20);
    const id3 = scoreboard.startMatch("Germany", "France");
    await wait(30);
    const id4 = scoreboard.startMatch("Uruguay", "Italy");
    await wait(40);
    const id5 = scoreboard.startMatch("Argentina", "Australia");

    scoreboard.updateScore(id1, 0, 5);
    scoreboard.updateScore(id2, 10, 2);
    scoreboard.updateScore(id3, 2, 2);
    scoreboard.updateScore(id4, 6, 6);
    scoreboard.updateScore(id5, 3, 1);

    const summary = scoreboard.getSummary();
    // Should be sorted by total score (desc), then by recency (desc)
    expect(summary.map((m) => m.id)).toEqual([id4, id2, id1, id5, id3]);
  });
});

// Helper to simulate time gaps between match starts
function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
