import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { LoginService } from '../login/login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        children: [
          {
            path: '',
            loadChildren: () => import('../event/event.module').then(m => m.EventPageModule),
          }
        ]
      },
      {
        path: '**',
        redirectTo: '',
      }
    ])
  ],
  declarations: [HomePage],
  providers: [LoginService]
})
export class HomePageModule {}
