import {Genre} from "./genre";
import {Platform} from "./platform";
import {Publisher} from "./publisher";
import {Developer} from "./developer";

export class Game {
  id: string;
  name: string;
  release: Date;
  pegiRate: number;
  description: string;
  criticsScore: number;
  personalScore: number;
  developer: Developer;
  genres: Genre[] = [];
  platforms: Platform[] = [];
  publishers: Publisher[] = [];
}
