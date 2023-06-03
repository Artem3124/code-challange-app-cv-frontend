import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { catchError, exhaustMap, map } from 'rxjs';
import {
    authUnexpectedError,
    authorized,
    getStatisticError,
    getStatisticInitiated,
    getStatisticSucceeded,
    isAuthorizedCheck,
    loginFailed,
    loginInitiated,
    loginSucceeded,
    logoutError,
    logoutInitiated,
    logoutSucceeded,
    registrationFailed,
    registrationInitiated,
    registrationSucceeded,
} from 'src/app/authorization/state/actions/profile.actions';
import { User } from 'src/models';
import { ProfileHttpService } from 'src/shared/services/http/profile.service';
import { StatisticHttpService } from 'src/shared/services/http/statistic.service';

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
                    catchError(async (error: HttpErrorResponse) => {
                        this.toastr.error(error.error.message, "Error occurred, try again.");
                        return loginFailed({ error: error });
                      }
                    )
                )
            )
        )
    );

    $logout = createEffect(() =>
        this.actions$.pipe(
            ofType(logoutInitiated),
            exhaustMap(() =>
                this.authService.logout().pipe(
                    map(() => {
                        this.router.navigate(['/home']);
                        return logoutSucceeded();
                    }),
                    catchError(async (error: Error) => logoutError({ error: error }))
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
                    catchError(async (error: HttpErrorResponse) =>{
                      this.toastr.error(error.error.message, "Error occurred, try again.");
                      return registrationFailed({ error: error })
                    }
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

    $getStatistic = createEffect(() =>
        this.actions$.pipe(
            ofType(getStatisticInitiated),
            exhaustMap(() =>
                this.statisticService.statistic().pipe(
                    map((statistics) => getStatisticSucceeded({ statistics })),
                    catchError(async (error: Error) => {
                      this.toastr.error("Unexpected error occurred", "An error occurred getting user statistic")
                      return getStatisticError({ error })
                    })
                )
            )
        )
    );

    constructor(
    private actions$: Actions,
    private toastr: ToastrService,
    private authService: ProfileHttpService,
    private statisticService: StatisticHttpService,
    private router: Router
    ) {}
}
