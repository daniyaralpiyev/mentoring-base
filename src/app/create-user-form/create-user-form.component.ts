import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserInterface } from '../interfaces/user-interfaces';
import { CreateUserFormDialogComponent } from '../users-list/create-user-form-dialog/create-user-form-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, CreateUserFormDialogComponent, MatSnackBarModule],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.scss'
})
export class CreateUserFormComponent {

  @Output()
  public createUser = new EventEmitter<CreateUserInterface>();

  readonly dialog = inject(MatDialog);

  private snackBar = inject(MatSnackBar);

  openCreateDialog(): void {
    // открываем модалку. Ничего внутрь не передаем, а зачем нам передавать data { user }? мы же его только создаем. То, что ты передашь будет = undefined.
    const dialogRef = this.dialog.open(CreateUserFormDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: CreateUserInterface | undefined) => {
      // если результат true (то-есть данные пришли), тогда эмитим(отправляем) эти данные в users-list
      if (result) {
        this.createUser.emit(result);
        console.log('если result true, передаем эти данные:', result)
        this.snackBar.open('Пользователь создан', 'Ok', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Отмена создания', 'Ok', {
          duration: 3000
        });
      }
    });
  }
}
