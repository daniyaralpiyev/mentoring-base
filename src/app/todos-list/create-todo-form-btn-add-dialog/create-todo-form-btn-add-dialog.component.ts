import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoInterface } from '../../interfaces/todo-interfaces';
import { CreateTodoFormDialogComponent } from '../create-todo-form-dialog/create-todo-form-dialog.component';

@Component({
  selector: 'app-create-todo-form-btn-add-dialog',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './create-todo-form-btn-add-dialog.component.html',
  styleUrl: './create-todo-form-btn-add-dialog.component.scss'
})
export class CreateTodoFormBtnAddDialogComponent {

  readonly dialog = inject(MatDialog);

  private snackBar = inject(MatSnackBar);

  @Output()
  public createTodoBtn = new EventEmitter<TodoInterface>();

  openCreateBtnDialog(): void {
    const dialogRef = this.dialog.open(CreateTodoFormDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: TodoInterface) => {
      if (result) {
        this.createTodoBtn.emit(result);
        this.snackBar.open('Задача создана!', 'Ok', {
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
