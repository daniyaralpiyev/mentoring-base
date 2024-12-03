import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {TodosApiService} from "../../service/todos-api.service";
import {TodosActions} from "./todos.actions";
import {catchError, map, of, switchMap} from "rxjs";

export const loadTodos = createEffect(
  (actions$ = inject(Actions), todosService = inject(TodosApiService)) => {
    return actions$.pipe(
      ofType(TodosActions.load),
      switchMap(() =>
        todosService.getTodos().pipe(
          map((todos) => TodosActions.loadSuccess({todos})),
          catchError((error) => of(TodosActions.loadError({error})))
        )
      )
    );
  },
  {functional: true}
)
