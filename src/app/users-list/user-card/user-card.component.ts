import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { UserInterface } from "../../interfaces/user-interfaces";
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { DeleteUserDialogComponent } from "../delete-user-dialog/delete-user-dialog.component";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomUpperCasePipe } from "../../pipes/upper-case.pipe";
import { RedDirective } from "../../directives/red.directive";

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    standalone: true,
    imports: [MatIconModule, MatSnackBarModule, CustomUpperCasePipe, RedDirective]
})
export class UserCardComponent {
    @Input()
    public user!: UserInterface;

    // @Output() — декоратор, выбрасывает событие в наружу
    @Output()
    // EventEmitter — это класс Angular, он же обработчик события который создает событие
    // deleteUser используем в файле html и в файле html закидываем в круглые скобки(deleteUser_card)="здесь он будет вызывать другую переменную"
    public deleteUser = new EventEmitter<number>();

    @Output()
    // используем в users-list.component.html
    editUser = new EventEmitter<UserInterface>();

    // этот код взяли из сайта angular material из вкладки Dialog для диалогового окна
    // MatDialog импортировали выше из angular material и так же переменную dialog используем ниже в методе openDialog()
    readonly dialog = inject(MatDialog);

    private snackBar = inject(MatSnackBar);


    openDeleteDialog(): void {
        const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
            width: '500px',
            data: { user: this.user },
        });

        dialogRef.afterClosed().subscribe((result: Boolean | undefined) => {
            if (result) {
                this.deleteUser.emit(this.user.id);
                this.snackBar.open('Пользователь удален!', 'Ok', {
                    duration: 3000
                });
            } else {
                this.snackBar.open('Отмена удаления!', 'Ok', {
                    duration: 3000
                });
            }
        });
    }

    // метод openDialog взяли из сайта angular material из вкладки Dialog
    openEditDialog(): void {
        // EditUserDialogComponent это имя нашего компонента который сами создали
        // this.dialog.open() открывает компонент EditUserDialogComponent и внутрь передаем данные (вкратце this.dialog.open() открывает модалку)
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
            width: '500px',
            data: { user: this.user },
        });

        // здесь когда компонент EditUserDialogComponent будет закрываться через subscribe отлавливаем событие
        // и если во время закрытия передались данные то через emit передаем в наружний компонент
        dialogRef.afterClosed().subscribe(editResult => {
            if (editResult) {
                this.editUser.emit(editResult);
                this.snackBar.open('Пользователь изменен!', 'Ok', {
                    duration: 3000
                });
            } else {
                this.snackBar.open('Отмена изменения!', 'Ok', {
                    duration: 3000
                });
            };
        });
    }
}