import { Component } from '@angular/core';
import { UserService } from '../shared/user.service';
import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public appPages = [
    {
      title: 'Eventos',
      url: '/event',
      icon: 'contacts',
    }
  ];

  version = environment.version;
  loggedUser = this.userService.user;

  constructor(private userService: UserService, private loginService: LoginService) {
  }

  logout() {
    if (!confirm('Deseja realmente deslogar do sistema?')) return;
    this.loginService.logout();
  }
}
