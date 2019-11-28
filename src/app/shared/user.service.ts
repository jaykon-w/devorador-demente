import { Injectable } from '@angular/core';
import { UserInfo } from 'firebase';
import { BehaviorSubject } from 'rxjs';

export type IUser = UserInfo;

@Injectable()
export class UserService {
  user: BehaviorSubject<UserInfo | boolean> = new BehaviorSubject(false);

  getCleanUser(): IUser {
    const { displayName, email, phoneNumber, photoURL, providerId, uid } = this.user
      .value as UserInfo;
    return {
      displayName,
      email,
      phoneNumber,
      photoURL,
      providerId,
      uid,
    };
  }
}
