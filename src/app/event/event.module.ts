import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { EventPage } from './event.page';
import { EventDetailPage } from './detail/event.detail.page';
import { EventService } from './event.service';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';
import { GamePageModule } from '../game/game.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePageModule,
    IonicHeaderParallaxModule,
    RouterModule.forChild([
      {
        path: '',
        component: EventPage
      },
      {
        path: ':id',
        component: EventDetailPage
      },
      // {
      //   path: '',
      //   component: EventCreatePage
      // },
      {
        path: '**',
        redirectTo: ''
      }
    ])
  ],
  declarations: [EventPage, EventDetailPage],
  providers: [
    EventService,
  ]
})
export class EventPageModule {}
