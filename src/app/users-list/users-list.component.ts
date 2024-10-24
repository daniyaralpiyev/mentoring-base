import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
import { CreateUserInterface, UserInterface } from "../interfaces/user-interfaces";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CreateUserFormBtnAddDialogComponent } from "./create-user-button/create-user-button.component";

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    standalone: true,
    imports: [NgFor, NgIf, UserCardComponent, AsyncPipe, CreateUserFormComponent, MatButtonModule, MatIconModule, CreateUserFormBtnAddDialogComponent],
    // changeDetection: ChangeDetectionStrategy.OnPush для реактивных данных RXJS
    // с это функцией OnPush работа кода и сайта с данными идет намного быстрее
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
    readonly usersApiService = inject(UsersApiService);
    readonly usersService = inject(UsersService); // передали из файла users.service.ts

    constructor() {
        // подписка => получение данных методом getUsers из файла users-api.service.ts
        this.usersApiService.getUsers().subscribe((response: any) => {
            // подписка => установка и загрузка данных методом setUsers из файла users.service.ts
            this.usersService.setUsers(response);
        });

        // this.usersService.users$.subscribe(
        //     users => users
        // );
    }

    deleteUser(id: number) {
        // удаление id используя метод deleteUser из файла users.service.ts
        this.usersService.deleteUser(id);
    }

    // находит и заменят определенные данные
    editUser(user: UserInterface) {
        this.usersService.editUser({
            ...user,
            company: {
                name: user.company.name,
            }
        });
    }

    public createUser(formData: CreateUserInterface) {
        this.usersService.createUser({
            id: new Date().getTime(),
            name: formData.name,
            email: formData.email,
            website: formData.website,
            company: {
                name: formData.company.name,
            },
        });
    }
}
