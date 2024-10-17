import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MyErrorStateMatcher } from '../utils/error-state-matcher';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserInterface } from '../interfaces/user-interfaces';
import { CreateUserFormDialogComponent } from '../users-list/create-user-form-dialog/create-user-form-dialog.component';

@Component({
  selector: 'app-create-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, CreateUserFormDialogComponent],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.scss'
})
export class CreateUserFormComponent {


  matcher = new MyErrorStateMatcher();

  @Output()
  createUser = new EventEmitter<CreateUserInterface>();

  readonly dialog = inject(MatDialog);

  openCreateDialog(): void {
    // открываем модалку. Ничего внутрь не передаем, а зачем нам передавать data { user }? мы же его только создаем. То, что ты передашь будет = undefined.
    const dialogRef = this.dialog.open(CreateUserFormDialogComponent);

    dialogRef.afterClosed().subscribe((result: CreateUserInterface) => {
      if (result) { // если результат true (то-есть данные пришли), тогда эмитим(отправляем) эти данные в users-list
        this.createUser.emit(result);
        console.log('если result true, передаем эти данные:', result)
      };
    });
  }
}
