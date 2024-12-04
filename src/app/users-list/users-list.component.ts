import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "../service/users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../service/users.service";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
import { CreateUserInterface, UserInterface } from "../interfaces/user-interfaces";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CreateUserFormBtnAddDialogComponent } from "./create-user-button/create-user-button.component";
import { Store } from "@ngrx/store";
import { UsersActions } from "./store/users.actions";
import { selectUsers } from "./store/users.selectors";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserFormComponent, MatButtonModule, MatIconModule, CreateUserFormBtnAddDialogComponent],
  // changeDetection: ChangeDetectionStrategy.OnPush для реактивных данных RXJS
  // с это функцией OnPush работа кода и сайта с данными идет намного быстрее
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly usersApiService = inject(UsersApiService);
  readonly usersService = inject(UsersService);
  private readonly store = inject(Store); // инжектим store
  public readonly users$ = this.store.select(selectUsers);

  constructor() {
    this.store.dispatch(UsersActions.load()); // дублируем setUsers с помощью this.store.dispatch()
  }

  public deleteUser(id: number) {
    // this.usersService.deleteUser(id);
    this.store.dispatch(UsersActions.delete({ id })); // дублируем deleteUser с помощью this.store.dispatch()
  }

  public editUser(user: UserInterface) {
    // this.usersService.editUser({
    //   ...user,
    //   company: {
    //     name: user.company.name,
    //   }
    // });
    this.store.dispatch(UsersActions.edit({ user })); // дублируем editUser с помощью this.store.dispatch()
  }

  public createUser(formData: CreateUserInterface) {
    // this.usersService.createUser({
    //   id: new Date().getTime(),
    //   name: formData.name,
    //   email: formData.email,
    //   website: formData.website,
    //   company: {
    //     name: formData.company.name,
    //   },
    // });
    this.store.dispatch(UsersActions.create({ // дублируем createUser с помощью this.store.dispatch()
      user: {
        id: new Date().getTime(),
        name: formData.name,
        email: formData.email,
        website: formData.website,
        company: {
          name: formData.company.name,
        },
      }
    }))
  }
}
