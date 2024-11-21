import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { TodoInterface } from "../interfaces/todo-interfaces";

@Injectable({ providedIn: 'root' })
export class TodosApiService {

    readonly apiService = inject(HttpClient);

    getTodos() {
        return this.apiService.get<TodoInterface[]>('https://jsonplaceholder.typicode.com/todos');
    }
}