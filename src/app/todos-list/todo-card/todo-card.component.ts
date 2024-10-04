import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {
  @Input()
  todo_input: any;

  @Output()
  deleteTodo_card = new EventEmitter();

  onDeleteTodo(todoId: number) {
    this.deleteTodo_card.emit(todoId);
  }
}
