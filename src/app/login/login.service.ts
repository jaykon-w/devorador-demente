import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';

const errorHandler = (err: Error) => {
  alert('Error!' + err.message);
};

@Injectable()
export class LoginService {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}
  logginWithFacebook() {
    return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).catch(errorHandler);
  }

  logginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).catch(errorHandler);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
}
