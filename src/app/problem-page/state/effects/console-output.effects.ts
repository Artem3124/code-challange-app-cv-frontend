import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs';
import { addingCodeRun } from 'src/app/problem-page/state/actions/code-runs.actions';
import {
  errorGettingCodeRunProgress,
  initializedGettingCodeRunProgress,
  successGettingCodeRunProgress,
} from 'src/app/problem-page/state/actions/console-output.actions';
import { CodeRunProgress } from 'src/models';
import { CodeSubmissionHttpService } from 'src/shared/services/http/code-submission.service';

@Injectable()
export class ConsoleOutputEffects {
   getCodeRunProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initializedGettingCodeRunProgress),
      exhaustMap((action) =>
        this.codeSubmissionsHttp.checkSubmissionStatus(action.problemUUID).pipe(
          map((response: CodeRunProgress) => {
            if (!response) { 
              throw Error('Code run response is undefined');
            }

            return successGettingCodeRunProgress({ codeRunProgress: response });
          }),
          catchError(async (error: Error) =>
            errorGettingCodeRunProgress({ error: error })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private codeSubmissionsHttp: CodeSubmissionHttpService
  ) {}
}
