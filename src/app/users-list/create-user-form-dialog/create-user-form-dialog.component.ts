import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../utils/error-state-matcher';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CreateUserInterface } from '../../interfaces/user-interfaces';

@Component({
  selector: 'app-create-user-form-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogModule],
  templateUrl: './create-user-form-dialog.component.html',
  styleUrl: './create-user-form-dialog.component.scss'
})
export class CreateUserFormDialogComponent {

  public readonly data = inject<{ user: CreateUserInterface }>(MAT_DIALOG_DATA); // бесполезная фигня, мы никакие данные не получаем. Мы же не изменяем уже существующего пользователя 
  // и не удаляем его по айди, как мы можем что-то передать, если на момент открытия модалки - его еще не существует. Надеюсь мысль уловил.


  @Output()
  public createUserFormDialog = new EventEmitter();

  public form = new FormGroup({

    name: new FormControl('', [Validators.required, Validators.minLength(1)]), // убрал пару валидаторов, что бы не вводить постоянно по 10 символов.
    email: new FormControl('', [Validators.required, Validators.minLength(1)]),
    website: new FormControl('', [Validators.required, Validators.minLength(1)]),
    company: new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    }),
  });

  matcher = new MyErrorStateMatcher();

}
