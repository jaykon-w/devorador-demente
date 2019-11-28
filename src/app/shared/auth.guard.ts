import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  isLogged = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private userService: UserService,
  ) {
    this.afAuth.authState
      .pipe(
        tap(e => this.userService.user.next(e)),
        map(e => !!e),
        tap(e => {
          if (e) {
            this.router.navigate(['/event']);
          }
        }),
      )
      .subscribe();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(e => !!e),
      tap(e => {
        if (!e) {
          this.router.navigate(['/login']);
        }
      }),
    );
  }
}
