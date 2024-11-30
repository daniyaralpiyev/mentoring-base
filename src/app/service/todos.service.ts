import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { TodosApiService } from './todos-api.service';
import { TodoInterface } from "../interfaces/todo-interfaces";

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private readonly todosSubject$ = new BehaviorSubject<TodoInterface[]>([]);
  public readonly todos$ = this.todosSubject$.asObservable();
  private readonly localStorageService = inject(LocalStorageService);
  private readonly todosApiService = inject(TodosApiService);
  private readonly localStorageTodoKey = 'todos';

  private setTodos(todosData: TodoInterface[]): void {
    this.localStorageService.saveDataToLocalStorage<TodoInterface[]>(this.localStorageTodoKey, todosData);

    this.todosSubject$.next(todosData);
  }

  public loadTodos() {
    const localStorageTodos = this.localStorageService.getDataFromLocalStorage<TodoInterface[]>(
      this.localStorageTodoKey
    );

    if (localStorageTodos) {
      this.todosSubject$.next(localStorageTodos);
    } else {
      this.todosApiService.getTodos().subscribe((todoData: TodoInterface[]) => {
        this.setTodos(todoData.slice(1, 11));
      });
    }
  }

  public editTodo(todo: TodoInterface): void {
    const index = this.todosSubject$.value.findIndex(el => el.id === todo.id);

    this.todosSubject$.value[index] = todo;
    this.setTodos(this.todosSubject$.value);
  }

  public createTodo(todo: TodoInterface): void {
    const todoExisting = this.todosSubject$.value.find(
      currentElement => currentElement.title === todo.title
    );

    if (todoExisting === undefined) {
      const newTodo = [...this.todosSubject$.value, todo];
      this.setTodos(newTodo);
    } else alert('Такой todo уже есть');
  }

  public deleteTodo(id: number): void {
    const newArrayTodos = this.todosSubject$.value.filter(todo => todo.id !== id);
    const findTodo = this.todosSubject$.value.find(todo => todo.id === id);

    if (findTodo) {
      this.setTodos(newArrayTodos);
    }

    if (!this.todosSubject$.value.length) {
      this.localStorageService.removeLocalStorage(this.localStorageTodoKey);
    }
  }
}
