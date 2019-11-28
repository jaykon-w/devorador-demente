import { Component } from '@angular/core';
import { AuthGuard } from '../shared/auth.guard';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from './login.service';

const errorHandler = (err: Error) => {
  alert('Error!' + err.message);
};

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  constructor(private router: Router, private loginService: LoginService) {}

  logginWithFacebook() {
    return this.loginService.logginWithFacebook();
  }

  logginWithGoogle() {
    return this.loginService.logginWithGoogle();
  }

  logout() {
    return this.loginService.logout();
  }
}
