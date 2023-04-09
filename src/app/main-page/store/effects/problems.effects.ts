import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MainPageState, getProblemList } from '..';
import {
  doneFetchingCodeProblem,
  doneFetchingCodeProblemList,
  errorFetchingCodeProblem,
  errorFetchingProblemList,
  initiateFetchingCodeProblem,
  initiateFetchingProblemList,
  insertDataToProblemState,
  searchProblem,
  testAction,
} from '../actions/problems.actions';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs';
import { CodeProblem } from 'src/models';
import { Store } from '@ngrx/store';
import { CodeProblemHttpService } from 'src/shared/services/http/code-problem.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProblemListEffects {
  findProblem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchProblem),
      withLatestFrom(this.store.select(getProblemList)),
      map(([action, problemListState]) => {
        var problem = problemListState.find(
          (problem: CodeProblem) => problem.uuid === action.problemUUID
        );

          console.log(problem);

        if (!problem) {
          return initiateFetchingCodeProblem({ problemUUID: action.problemUUID   });
        }
        console.log(action.problemUUID);
        console.log(problem);

        return insertDataToProblemState({ problem: problem });
      })
    )
  );

  getProblem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initiateFetchingCodeProblem),
      exhaustMap((action) =>
        this.problemHttp.getCodeProblem(action.problemUUID).pipe(
          map((response: CodeProblem) => {
            return doneFetchingCodeProblem({ problem: response });
          }),
          catchError(async (error: Error) => {
            return errorFetchingCodeProblem({
              error: error as HttpErrorResponse,
            });
          })
        )
      )
    )
  );

  getProblemList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initiateFetchingProblemList),
      exhaustMap(() =>
        this.problemHttp.getAllProblems().pipe(
          map((list: CodeProblem[]) => {
            return doneFetchingCodeProblemList({ problemsList: list });
          }),
          catchError(async (err: Error) => {
            return errorFetchingProblemList({ error: err });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<MainPageState>,
    private problemHttp: CodeProblemHttpService
  ) {}
}
