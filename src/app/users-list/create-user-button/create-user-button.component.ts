import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUserInterface } from '../../interfaces/user-interfaces';
import { CreateUserFormDialogComponent } from '../create-user-form-dialog/create-user-form-dialog.component';

@Component({
  selector: 'app-create-user-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './create-user-button.component.html',
  styleUrl: './create-user-button.component.scss'
})
export class CreateUserFormBtnAddDialogComponent {

  readonly dialog = inject(MatDialog);

  private snackBar = inject(MatSnackBar);

  @Output()
  public createUserBtn = new EventEmitter<CreateUserInterface>();

  openCreateBtnAddDialog(): void {
    // открываем модалку. Ничего внутрь не передаем, а зачем нам передавать data { user }? мы же его только создаем. То, что ты передашь будет = undefined.
    const dialogRef = this.dialog.open(CreateUserFormDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: CreateUserInterface) => {
      // если результат true (то-есть данные пришли), тогда эмитим(отправляем) эти данные в users-list
      if (result) {
        this.createUserBtn.emit(result);
        console.log('если result true, передаем эти данные:', result)
        this.snackBar.open('Пользователь создан!', 'Ok', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Отмена создания!', 'Ok', {
          duration: 3000
        });
      }
    });
  }
}
