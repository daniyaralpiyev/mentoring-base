import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TodoInterface } from '../../interfaces/todo-interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTodoDialogComponent } from '../delete-todo-dialog/delete-todo-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {
  @Input()
  todo!: TodoInterface;

  readonly dialog = inject(MatDialog);

  private snackBar = inject(MatSnackBar);

  @Output()
  deleteUser = new EventEmitter<number>()

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteTodoDialogComponent, {
      width: '500px',
      data: { todo: this.todo }
    });

    dialogRef.afterClosed().subscribe((result: Boolean | undefined) => {
      if (result) {
        this.deleteUser.emit(this.todo.id)
        this.snackBar.open('Задача удалена!', 'Ok', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Отмена удаления!', 'Ok', {
          duration: 3000
        });
      }
    });
  }
}
