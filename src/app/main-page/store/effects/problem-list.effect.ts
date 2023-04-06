import { Injectable } from '@angular/core';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { MainPageState, getProblemList } from '..';
import {
  doneFetchingCodeProblems,
  errorFetchingProblemList,
  initiateFetchingProblemList,
  insertDataToProblemState,
  searchProblem,
  testAction,
} from '../actions/problem-list.action';
import {
  catchError,
  concat,
  exhaustMap,
  filter,
  find,
  map,
  withLatestFrom,
} from 'rxjs';
import { selectCodeProblemState } from 'src/app/problem-page/state';
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

        if (!problem) {
          return testAction();
        }

        return insertDataToProblemState({ problem: problem });
      })
    )
  );

  getProblemList$ = createEffect(() =>
    this.actions$.pipe( 
      ofType(initiateFetchingProblemList),
      exhaustMap(() =>
        this.problemListHttp.getAllProblems().pipe(
          map((list: CodeProblem[]) => {
            return doneFetchingCodeProblems({ problemsList: list });
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
    private problemListHttp: CodeProblemHttpService
  ) {}
}
