import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateTodoFormDialogComponent } from '../todos-list/create-todo-form-dialog/create-todo-form-dialog.component';
import { TodoInterface } from '../interfaces/todo-interfaces';
import { HoverShadow } from '../directives/hover-shadow.directive';

@Component({
  selector: 'app-create-todo-form',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatIconModule, HoverShadow],
  templateUrl: './create-todo-form.component.html',
  styleUrls: ['./create-todo-form.component.scss']
})
export class CreateTodoFormComponent {

  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  @Output()
  public createTodo = new EventEmitter<TodoInterface>();

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateTodoFormDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: TodoInterface) => {
      if (result) {
        this.createTodo.emit(result);
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

