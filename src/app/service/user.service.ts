import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IUser {
  name: string;
  email: string;
  isAdmin: boolean | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userSubject$ = new BehaviorSubject<IUser | null>(null)
  public readonly user$ = this.userSubject$.asObservable()

  private user: IUser = {
    name: 'Daniyar',
    email: 'piranha0590@gmail.com',
    isAdmin: null,
  }

  public loginAsAdmin() {
    this.userSubject$.next({ ...this.user, isAdmin: true });
    console.log('Вошли как Админ');
  }

  public loginAsUser() {
    this.userSubject$.next({ ...this.user, isAdmin: false });
    console.log('Вошли как Пользователь');
  }

  public get isAdmin() {
    return this.userSubject$.value?.isAdmin;
  }

  public logout() {
    this.userSubject$.next(null);
    console.log(this.userSubject$);
  }
}
