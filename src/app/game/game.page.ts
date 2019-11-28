import { Component, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GameService, IGame } from './game.service';
import { EventService } from '../event/event.service';

@Component({
  selector: 'app-game',
  templateUrl: 'game.page.html',
  styleUrls: ['game.page.scss'],
})
export class GamePage {
  @Input() editing = false;

  private $game: IGame = {
    maxPlayers: 1,
  } as IGame;

  form: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private gameService: GameService,
    private loadingController: LoadingController,
  ) {
    this.createForm();
  }

  @Input()
  get game(): IGame {
    return this.$game;
  }
  set game(game: IGame) {
    const { name, title, img, startTime, description, maxPlayers, id, master, players } = game;
    Object.assign(this.$game, {
      name,
      title,
      img,
      startTime,
      description,
      maxPlayers,
      id,
      master,
      players,
    });
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: [this.$game.name, Validators.required],
      title: [this.$game.title, Validators.required],
      img: [this.$game.img, Validators.required],
      startTime: [this.$game.startTime, Validators.required],
      description: [this.$game.description, Validators.required],
      maxPlayers: [this.$game.maxPlayers, Validators.required],
    });
  }

  dismissModal() {
    this.modalController.dismiss({});
  }

  async save() {
    if (this.form.invalid) {
      return alert('Você precisa preencher o formulário corretamente');
    }

    const loading = await this.loadingController.create({
      message: 'Salvando',
    });
    await loading.present();
    const game = this.editing
      ? { ...this.$game, ...this.form.value }
      : this.gameService.create(this.form.value);

    try {
      await this.gameService.save(game);
      this.modalController.dismiss({ game });
    } catch (err) {
      alert(err);
    }

    loading.dismiss();
  }
}
