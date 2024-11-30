import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { TodoInterface } from "../interfaces/todo-interfaces";

@Injectable({ providedIn: 'root' })
export class TodosApiService {

    private readonly apiService = inject(HttpClient);

    public getTodos() {
        return this.apiService.get<TodoInterface[]>('https://jsonplaceholder.typicode.com/todos');
    }
}