import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  gettingAllCodeSubmissionsError,
  gettingAllCodeSubmissionsSucceeded,
  gettingCodeRunsHistoryError,
  gettingCodeRunsHistorySucceeded,
  initiateGetCodeRunsHistory,
  initiateGettingAllCodeSubmissions,
} from '../actions/code-runs.actions';
import { catchError, exhaustMap, map } from 'rxjs';
import { CodeRunResultHttpService } from 'src/shared/services/http/code-run-results.service';
import { CodeRunResultExpanded } from 'src/models';
import { Injectable } from '@angular/core';
import { CodeRunOutcome } from 'src/models/enums/code-run-outcome.enum';

@Injectable({
  providedIn: 'root',
})
export class ProblemStateEffects {
  getProblemCodeRuns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initiateGetCodeRunsHistory),
      exhaustMap((action) =>
        this.codeRunsHttp.getCodeRunResultsHistory(action.codeProblemUUID).pipe(
          map((response: CodeRunResultExpanded[]) => {
            console.log(response);
            return gettingCodeRunsHistorySucceeded({
              codeRunsHistory: response,
            });
          }),
          catchError(async (error: Error) =>
            gettingCodeRunsHistoryError({ error })
          )
        )
      )
    )
  );

  getAllSubmissions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initiateGettingAllCodeSubmissions),
      exhaustMap(() => {
        return this.codeRunsHttp.getAllCodeSubmissions().pipe(
          map((response: CodeRunResultExpanded[]) => {
            return gettingAllCodeSubmissionsSucceeded({
              codeSubmissions: response,
            });
          }),
          catchError(async (error: Error) =>
            gettingAllCodeSubmissionsError({ error })
          )
        );
      })
    );
  });

  //make obtaining all code submissions through the code runs system
  //and just return an action that activates the reducer in profile store
  // management system

  constructor(
    private actions$: Actions,
    private codeRunsHttp: CodeRunResultHttpService
  ) {}
}
