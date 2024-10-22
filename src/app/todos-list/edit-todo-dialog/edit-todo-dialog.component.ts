import { NgIf, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TodoInterface } from '../../interfaces/todo-interfaces';


@Component({
  selector: 'app-edit-todo-dialog',
  standalone: true,
  imports: [NgIf, NgFor, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, MatDialogClose],
  templateUrl: './edit-todo-dialog.component.html',
  styleUrl: './edit-todo-dialog.component.scss'
})
export class EditTodoDialogComponent {

  readonly data = inject<{ todo: TodoInterface }>(MAT_DIALOG_DATA);

  public form = new FormGroup({
    id: new FormControl(this.data.todo.id),
    userId: new FormControl(this.data.todo.userId, [Validators.required, Validators.minLength(1), Validators.pattern("^[0-9]*$")]),
    title: new FormControl(this.data.todo.title, [Validators.required, Validators.minLength(1), Validators.pattern("^[a-zA-Zа-яА-Я0-9.,_\\- ]*$")]),
    completed: new FormControl(this.data.todo.completed, [Validators.required])
  });

  get todoWithUpdatedFields() { // получает все данные через mat-dialog-close который навешали к кнопке button в файле edit-user-dialog.component.html
    return {
      ...this.form.value, // возвращается обновленное значение формы
      id: this.data.todo.id, // так же добавляем к нему id который уже лежал в (MAT_DIALOG_DATA);
    };
  }
}
