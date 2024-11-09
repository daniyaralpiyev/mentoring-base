import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserInterface {
  name: string;
  email: string;
  isAdmin: boolean | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userSubject$ = new BehaviorSubject<UserInterface | null>(null)
  public readonly user$ = this.userSubject$.asObservable()

  private user: UserInterface = {
    name: 'Daniyar',
    email: 'piranha0590@gmail.com',
    isAdmin: null,
  }

  loginAsAdmin() {
    this.userSubject$.next({ ...this.user, isAdmin: true });
    console.log('Вошли как Админ');
  }

  loginAsUser() {
    this.userSubject$.next({ ...this.user, isAdmin: false });
    console.log('Вошли как Пользователь');
  }

  get isAdmin() {
    return this.userSubject$.value?.isAdmin;
  }

  logout() {
    this.userSubject$.next(null);
    console.log(this.userSubject$)
  }
}
