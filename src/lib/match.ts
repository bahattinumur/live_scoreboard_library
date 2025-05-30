import { v4 as uuidv4 } from 'uuid';

export class Match {
  private _homeScore: number = 0;
  private _awayScore: number = 0;
  public readonly id: string;
  public homeTeam: string;
  public awayTeam: string;
  public startTime: Date;

  constructor(
    homeTeam: string,
    awayTeam: string,
    startTime: Date = new Date()
  ) {
    if (homeTeam.trim() === '' || awayTeam.trim() === '') {
      throw new Error('Team names cannot be empty.');
    }

    if (homeTeam.toLowerCase() === awayTeam.toLowerCase()) {
      throw new Error('Matches cannot be started between the same teams.');
    }

    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.startTime = startTime;

    this.id = uuidv4();
  }


  get homeScore(): number {
    return this._homeScore;
  }

  set homeScore(value: number) {
    if (value < 0) {
      throw new Error('homeScore cannot be negative.');
    }
    this._homeScore = value;
  }

  get awayScore(): number {
    return this._awayScore;
  }

  set awayScore(value: number) {
    if (value < 0) {
      throw new Error('awayScore cannot be negative.');
    }
    this._awayScore = value;
  }

  getTotalScore(): number {
    return this._homeScore + this._awayScore;
  }
}