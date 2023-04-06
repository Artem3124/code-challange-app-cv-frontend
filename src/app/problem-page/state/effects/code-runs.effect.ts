import { Actions, createEffect, ofType } from '@ngrx/effects';
import { gettingCodeRunsHistoryError, gettingCodeRunsHistorySucceeded, initiateGetCodeRunsHistory } from '../actions/code-runs.actions';
import { catchError, exhaustMap, map } from 'rxjs';
import { CodeRunResultHttpService } from 'src/shared/services/http/code-run-results.service';
import { CodeRunResultExpanded } from 'src/models';

export class ProblemStateEffects {
  getProblemCodeRuns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initiateGetCodeRunsHistory),
      exhaustMap((action) =>
        this.codeRunsHttp.getCodeRunResultsHistory(action.codeProblemUUID).pipe(
          map((response: CodeRunResultExpanded[]) => {
            return gettingCodeRunsHistorySucceeded({ codeRunsHistory: response })
          }),
          catchError(async (error: Error) => gettingCodeRunsHistoryError({ error })),
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private codeRunsHttp: CodeRunResultHttpService
  ) {}
}
