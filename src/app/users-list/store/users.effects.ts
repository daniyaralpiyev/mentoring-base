import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UsersApiService } from "../../service/users-api.service";
import { UsersActions } from "./users.actions";

export const loadUsers = createEffect(
  (actions$ = inject(Actions), usersService = inject(UsersApiService)) => {
    return actions$.pipe(
      ofType(UsersActions.load),
      switchMap(() =>
        usersService.getUsers().pipe(
          map((users) => UsersActions.loadSuccess({ users })),
          catchError((error) => of(UsersActions.loadError({ error })))
        )
      )
    );
  },
  { functional: true }
);
