import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as R from 'ramda';
import { BehaviorSubject, concat, from, Observable, of } from 'rxjs';
import { bufferCount, map, mergeMap, pluck, take, tap } from 'rxjs/operators';
import { GamePage } from '../../game/game.page';
import { GameService, IGame } from '../../game/game.service';
import { UserService } from '../../shared/user.service';
import { IEvent } from '../event.interface';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: 'event.detail.page.html',
  styleUrls: ['event.detail.page.scss'],
})
export class EventDetailPage {
  event$: Observable<IEvent>;
  games$: Observable<IGame[]>;
  gamesSub$ = new BehaviorSubject([{} as IGame]);
  event: IEvent;
  games: IGame[] = [];
  userId: string;
  alreadyParticipateFrom: IGame;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private gameService: GameService,
    private userService: UserService,
  ) {
    this.userId = this.userService.getCleanUser().uid;

    this.event$ = this.route.params.pipe(
      mergeMap(e => this.eventService.getEvent(e.id)),
      tap(e => (this.event = e)),
    );

    this.event$.pipe(
      pluck('games'),
      mergeMap(games => {
        if (!games.length) {
          this.games = [];
          return of([]);
        }
        return concat(
          from(games).pipe(
            mergeMap((e: string) => this.gameService.getGame(e)),
            bufferCount(games.length),
            tap(e => (this.games = e)),
            take(1),
          ),
          from(games).pipe(
            mergeMap((e: string) => this.gameService.getGame(e)),
            map(e => ({ ...e, participate: e.players.some(j => j.uid === this.userId) })),
            tap(e => {
              this.games = this.games.map(j => {
                if (j.id === e.id) {
                  return e;
                }
                return j;
              });
            }),
            tap(e => (this.alreadyParticipateFrom = this.games.find((j: any) => j.participate))),
          ),
        );
      }),
    ).subscribe();
  }

  async createGame() {
    const modal = await this.modalController.create({
      component: GamePage,
      backdropDismiss: false,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data.game) {
      await this.eventService.save({
        id: this.event.id,
        games: [...this.event.games, data.game.id],
      });
    }
  }

  async editGame(game: IGame) {
    const modal = await this.modalController.create({
      component: GamePage,
      backdropDismiss: false,
      componentProps: {
        game,
        editing: true,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data.game) {
      const games = R.uniq([...this.event.games, data.game.id]);
      await this.eventService.save({ id: this.event.id, games });
    }
  }

  async deleteGame(game: IGame) {
    if (!confirm(`Deseja realmente apagar a sua mesa de ${game.title} - ${game.name}?`)) {
      return;
    }
    const games = R.without([game.id], this.event.games);
    await this.eventService.save({ id: this.event.id, games });
  }

  async participate(game: IGame) {
    if (
      this.alreadyParticipateFrom &&
      !confirm(
        `Você já esta participando da mesa ${this.alreadyParticipateFrom.title} - ${this.alreadyParticipateFrom.name},
 deseja abandona-la para participar da mesa de ${game.title} - ${game.name}?`,
      )
    ) {
      return;
    }
    if (
      !this.alreadyParticipateFrom &&
      !confirm(`Deseja realmente participar da mesa de ${game.title} - ${game.name}?`)
    ) {
      return;
    }
    if (this.alreadyParticipateFrom) {
      await this.getOut(this.alreadyParticipateFrom, true);
    }
    const players = R.uniq([...game.players, this.userService.getCleanUser()]);
    await this.gameService.save({ id: game.id, players });
  }

  async getOut(game: IGame, autoConfirm = false) {
    if (
      !autoConfirm &&
      !confirm(`Deseja realmente sair da mesa de ${game.title} - ${game.name}?`)
    ) {
      return;
    }
    const players = R.without([this.userService.getCleanUser()], game.players);
    await this.gameService.save({ id: game.id, players });
  }
}
