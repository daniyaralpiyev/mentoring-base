import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { TodosApiService } from '../service/todos-api.service';
import { TodosService } from '../service/todos.service';
import { CreateTodoFormComponent } from '../create-todo-form/create-todo-form.component';
import { TodoInterface } from '../interfaces/todo-interfaces';
import { CreateTodoFormBtnAddDialogComponent } from './create-todo-button/create-todo-button.component';
import { Store } from "@ngrx/store";
import { selectTodos } from "./store/todos.selectors";
import { TodosActions } from "./store/todos.actions";

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodoFormComponent, CreateTodoFormBtnAddDialogComponent],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush делает работу с данными намного быстрее
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
  readonly todosApiService = inject(TodosApiService);
  readonly todosService = inject(TodosService);
  private readonly store = inject(Store);
  public readonly todos$ = this.store.select(selectTodos);

  constructor() {
    this.store.dispatch(TodosActions.load());
  }

  deleteTodo(id: number) {
    // this.todosService.deleteTodo(id);
    this.store.dispatch(TodosActions.delete({ id }));
  }

  editTodo(todo: TodoInterface) {
    // this.todosService.editTodo({
    //   ...todo,
    // });
    this.store.dispatch(TodosActions.edit({ todo }));
  }

  createTodo(formData: TodoInterface) {
    // this.todosService.createTodo({
    //   userId: formData.userId,
    //   id: new Date().getTime(),
    //   title: formData.title,
    //   completed: formData.completed,
    // });
    this.store.dispatch(TodosActions.create({
      todo: {
        userId: formData.userId,
        id: new Date().getTime(),
        title: formData.title,
        completed: formData.completed,
      }
    }))
  }
}
