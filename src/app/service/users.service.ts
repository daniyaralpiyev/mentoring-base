import {inject, Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CreateUserInterface, UserInterface } from '../interfaces/user-interfaces';
import {UsersApiService} from "./users-api.service";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly usersSubject$ = new BehaviorSubject<UserInterface[]>([]);
  public readonly users$ = this.usersSubject$.asObservable();
  private readonly localStorageService = inject(LocalStorageService);
  private readonly usersApiService = inject(UsersApiService);
  private readonly localStorageUsersKey = 'users';

  private setUsers(usersData: UserInterface[]) {
    this.localStorageService.saveDataToLocalStorage<UserInterface[]>(
      this.localStorageUsersKey, usersData
    );

    this.usersSubject$.next(usersData);
  }

  public loadUsers(): void {
    const localStorageUsers =
      this.localStorageService.getDataFromLocalStorage<UserInterface[]>('users');

    if (localStorageUsers) {
      this.usersSubject$.next(localStorageUsers);
    } else {
      this.usersApiService.getUsers().subscribe((users: UserInterface[]) => {
        this.setUsers(users);
      });
    }
  }

  public editUser(user: UserInterface) :void{
    const index = this.usersSubject$.value.findIndex(el => el.id === user.id);

    this.usersSubject$.value[index] = user;
    this.setUsers(this.usersSubject$.value);
  }

  public createUser(user: CreateUserInterface) {
    const userExisting = this.usersSubject$.value.find(
      currentElement => currentElement.email === user.email
    );
    if (userExisting === undefined) {
      const newUser = [...this.usersSubject$.value, user];
      this.setUsers(newUser);
    } else alert('Такой Email уже есть');
  }

  public deleteUser(userId: number):void {
    const newArrayUsers = this.usersSubject$.value.filter(
      user => user.id !== userId
    );
    const findUser = this.usersSubject$.value.find(
      user => user.id === userId
    );

    if (findUser) {
      this.setUsers(newArrayUsers);
    }

    if (!this.usersSubject$.value.length) {
      this.localStorageService.removeLocalStorage(this.localStorageUsersKey);
    }
  }
}
