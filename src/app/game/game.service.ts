import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IUser, UserService } from '../shared/user.service';
import { UserInfo } from 'firebase';

interface IGameCreation {
  name: string;
  title: string;
  img: string;
  startTime: string;
  description: string;
  maxPlayers: number;
}

export interface IGame extends IGameCreation {
  id?: string;
  master: IUser;
  players: IUser[];
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private db: AngularFirestore, private userService: UserService) {}

  getGame(id: string): Observable<IGame> {
    return this.getGameQuery()
      .doc<IGame>(id)
      .valueChanges();
  }

  save(game: Partial<IGame>) {
    return this.getGameQuery()
      .doc(game.id)
      .set(game, { merge: true });
  }

  create(game: IGameCreation) {
    return {
      ...game,
      master: this.userService.getCleanUser(),
      id: this.db.createId(),
      players: [],
    };
  }

  private getGameQuery(refCb?: QueryFn): AngularFirestoreCollection<IGame> {
    return this.db.collection<IGame>('games', refCb);
  }
}
