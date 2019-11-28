import { IGame } from '../game/game.service';

export interface IEvent {
  id?: string;
  city: string;
  state: string;
  local: string;
  address: string;
  date: number;
  startTime: string;
  endTime: string;
  name: string;
  img: string;
  games: string[] | IGame[];
  description: string;
}
