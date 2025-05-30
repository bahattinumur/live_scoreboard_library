import { Match } from './match';

export class Scoreboard {
  private matches: Map<string, Match> = new Map();

  startMatch(homeTeam: string, awayTeam: string): string {
    const match = new Match(homeTeam, awayTeam);
    this.matches.set(match.id, match);
    return match.id;
  }

  updateScore(matchId: string, homeScore: number, awayScore: number): void {
    const match = this.matches.get(matchId);
    if (!match) {
      throw new Error('No match found.');
    }
    match.homeScore = homeScore;
    match.awayScore = awayScore;
  }

  finishMatch(matchId: string): void {
    const removed = this.matches.delete(matchId);
    if (!removed) {
      throw new Error('No match found.');
    }
  }

  getSummary(): Match[] {
    return Array.from(this.matches.values()).sort((a, b) => {
      const scoreDiff = b.getTotalScore() - a.getTotalScore();
      if (scoreDiff !== 0) return scoreDiff;
      return b.startTime.getTime() - a.startTime.getTime();
    });
  }

  getOngoingMatches(): Match[] {
    return Array.from(this.matches.values());
  }
}
