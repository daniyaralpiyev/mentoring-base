import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { UserInterface } from "../../interfaces/user-interfaces";
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    standalone: true,
    imports: [MatIconModule]
})
export class UserCardComponent {
    @Input()
    user!: UserInterface;

    // @Output() — декоратор, выбрасывает событие в наружу
    @Output()
    // EventEmitter — это класс Angular, он же обработчик события который создает событие
    // deleteUser используем в файле html и в файле html закидываем в круглые скобки(deleteUser_card)="здесь он будет вызывать другую переменную"
    deleteUser = new EventEmitter();

    // onDeleteUser используем в файле html user-card.component.html
    onDeleteUser(userId: number) {
        // emit() выбрасывает и запускает событие и передаёт данные через userId родительскому компоненту.
        this.deleteUser.emit(userId);
    }

    // этот код взяли из сайта angular material из вкладки Dialog для диалогового окна
    // MatDialog импортировали выше из angular material и так же переменную dialog используем ниже в методе openDialog()
    readonly dialog = inject(MatDialog);

    @Output()
    // используем в users-list.component.html
    editUser = new EventEmitter();

    // метод openDialog взяли из сайта angular material из вкладки Dialog
    openDialog(): void {
        // EditUserDialogComponent это имя нашего компонента который сами создали
        // this.dialog.open() открывает компонент EditUserDialogComponent и внутрь передаем данные (вкратце this.dialog.open() открывает модалку)
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
            data: { user: this.user },
        });

        // здесь когда компонент EditUserDialogComponent будет закрываться через subscribe отлавливаем событие
        // и если во время закрытия передались данные то через emit передаем в наружний компонент
        dialogRef.afterClosed().subscribe(editResult => {
            if (editResult) {
                this.editUser.emit(editResult);
            };
        });
    }
}