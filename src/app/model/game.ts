export class Game {
  id: string;
  name: string;
  release: Date;
  pegiRate: number;
  description: string;
  criticsScore: number;
  personalScore: number;
  developer: string;
  genres: string[] = [];
  platforms: string[] = [];
  publishers: string[] = [];
}
