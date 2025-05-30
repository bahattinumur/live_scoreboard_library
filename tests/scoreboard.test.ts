import { describe, it, expect, beforeEach } from 'vitest';
import { Scoreboard } from '../src/lib/scoreboard';

describe('Scoreboard', () => {
  let scoreboard: Scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
  });

  it('should start a match and return a valid match id', () => {
    const matchId = scoreboard.startMatch('Mexico', 'Canada');
    const matches = scoreboard.getOngoingMatches();
    expect(matches).toHaveLength(1);
    expect(matches[0].id).toBe(matchId);
    expect(matches[0].homeTeam).toBe('Mexico');
    expect(matches[0].awayTeam).toBe('Canada');
  });

  it('should update match scores correctly', () => {
    const matchId = scoreboard.startMatch('Spain', 'Brazil');
    scoreboard.updateScore(matchId, 10, 2);
    const match = scoreboard.getOngoingMatches()[0];
    expect(match.homeScore).toBe(10);
    expect(match.awayScore).toBe(2);
  });

  it('should throw if trying to update score of non-existent match', () => {
    expect(() => scoreboard.updateScore('invalid-id', 1, 1)).toThrow('No match found.');
  });

  it('should finish a match and remove it from the scoreboard', () => {
    const matchId = scoreboard.startMatch('Germany', 'France');
    scoreboard.finishMatch(matchId);
    expect(scoreboard.getOngoingMatches()).toHaveLength(0);
  });

  it('should throw if trying to finish a non-existent match', () => {
    expect(() => scoreboard.finishMatch('invalid-id')).toThrow('No match found.');
  });

  it('should return summary sorted by total score and start time', async () => {
    const id1 = scoreboard.startMatch('Mexico', 'Canada');
    await wait(10);
    const id2 = scoreboard.startMatch('Spain', 'Brazil');
    await wait(10);
    const id3 = scoreboard.startMatch('Germany', 'France');

    scoreboard.updateScore(id1, 0, 5);
    scoreboard.updateScore(id2, 10, 2);
    scoreboard.updateScore(id3, 2, 2);

    const summary = scoreboard.getSummary();

    expect(summary.map(m => m.id)).toEqual([id2, id1, id3]);
  });
});

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
