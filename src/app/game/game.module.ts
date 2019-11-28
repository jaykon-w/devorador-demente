import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GamePage } from './game.page';
import { GameService } from './game.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  declarations: [GamePage],
  entryComponents: [GamePage],
  providers: [
    GameService,
  ]
})
export class GamePageModule {}
