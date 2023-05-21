import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs';
import {
  authUnexpectedError,
  authorized,
  isAuthorizedCheck,
  loginFailed,
  loginInitiated,
  loginSucceeded,
  registrationFailed,
  registrationInitiated,
  registrationSucceeded,
} from 'src/app/authorization/state/actions/profile.actions';
import { User } from 'src/models';
import { AuthHttpService } from 'src/shared/services/http/authentication.service';

@Injectable()
export class ProfileEffects {
  $login = createEffect(() =>
    this.actions$.pipe(
      ofType(loginInitiated),
      exhaustMap((action) =>
        this.authService.login(action.loginRequest).pipe(
          map((response: User) => {
            this.router.navigate(['/home']);
            return loginSucceeded({ user: response });
          }),
          catchError(async (error: HttpErrorResponse) =>
            loginFailed({ error: error })
          )
        )
      )
    )
  );

  $register = createEffect(() =>
    this.actions$.pipe(
      ofType(registrationInitiated),
      exhaustMap((action) =>
        this.authService.register(action.registrationRequest).pipe(
          map(() => {

            this.router.navigate(['/login']);

            return registrationSucceeded();
          }),
          catchError(async (error: HttpErrorResponse) =>
            registrationFailed({ error: error })
          )
        )
      )
    )
  );

  $isAuthorized = createEffect(() =>
    this.actions$.pipe(
      ofType(isAuthorizedCheck),
      exhaustMap(() =>
        this.authService.user().pipe(
          map((response) => {
            return authorized({ user: response });
          }),
          catchError(async (error: HttpErrorResponse) =>
            authUnexpectedError({ error })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthHttpService,
    private router: Router,
  ) {}
}
