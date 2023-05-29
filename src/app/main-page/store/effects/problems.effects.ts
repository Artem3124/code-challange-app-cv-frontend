import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MainPageState, getProblemList } from '..';
import {
  doneFetchingCodeProblem,
  doneFetchingCodeProblemList,
  errorFetchingCodeProblem,
  errorFetchingProblemList,
  getVotesCompleted,
  getVotesError,
  initiateFetchingCodeProblem,
  initiateFetchingProblemList,
  insertDataToProblemState,
  searchProblem,
  setVoteCompleted,
  setVoteError,
  setVoteInitiated,
} from '../actions/problems.actions';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs';
import {
  CodeProblem,
  CodeProblemView,
  CodeRunResultExpanded,
  Vote,
  VoteRequest,
} from 'src/models';
import { Store } from '@ngrx/store';
import { CodeProblemHttpService } from 'src/shared/services/http/code-problem.service';
import { HttpErrorResponse } from '@angular/common/http';
import { gettingAllCodeSubmissionsSucceeded } from 'src/app/problem-page/state/actions/code-runs.actions';
import {
  setProfileViewProblem,
  settingResolvedProblemError,
} from 'src/app/authorization/state/actions/profile.actions';
import { CodeRunOutcome } from 'src/models/enums/code-run-outcome.enum';
import { ProblemVotesHttpService } from 'src/shared/services/http/problem-votes.service';

@Injectable({
  providedIn: 'root',
})
export class ProblemListEffects {
  setVote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setVoteInitiated),
      exhaustMap((action) => 
        this.problemVotesHttp.setVotes(action.request).pipe(
          map(() => {
            return setVoteCompleted({codeProblemUUID: action.request.codeProblemUUID});
          }),
          catchError(async (error: Error) => setVoteError({error}))
        )
      )
    )
  );

  getVotes$ = createEffect(() =>
  this.actions$.pipe(
    ofType(setVoteCompleted),
    exhaustMap((action) => 
      this.problemVotesHttp.getVotes(action.codeProblemUUID).pipe(
        map((votes: Vote[]) => {
          console.log(votes);
          return getVotesCompleted({votes});
        }),
        catchError(async (error: Error) => getVotesError({error}))
      )
    )
  ))

  findProblem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchProblem),
      withLatestFrom(this.store.select(getProblemList)),
      map(([action, problemListState]) => {
        const problem = problemListState.find(
          (problem: CodeProblem) => problem.uuid === action.problemUUID
        );

        if (!problem) {
          return initiateFetchingCodeProblem({
            problemUUID: action.problemUUID,
          });
        }

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

  getAllResolvedProblems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gettingAllCodeSubmissionsSucceeded),
      exhaustMap((action) =>
        this.store.select(getProblemList).pipe(
          map((data: CodeProblem[]) => {
            const uniqueResolvedProblemViews: CodeProblemView[] = data
              .filter((codeProblem) => {
                return action.codeSubmissions.some(
                  (codeSubmission: CodeRunResultExpanded) =>
                    codeProblem.uuid === codeSubmission.codeProblemUUID &&
                    codeSubmission.codeRunOutcomeId === CodeRunOutcome.Succeeded
                );
              })
              .map((resolvedProblem): CodeProblemView => {
                return {
                  name: resolvedProblem.name,
                  uuid: resolvedProblem.uuid,
                  complexityTypeId: resolvedProblem.complexityTypeId,
                  language: resolvedProblem.language,
                  state: resolvedProblem.state,
                  upVotesCount: resolvedProblem.upVotesCount,
                  downVotesCount: resolvedProblem.downVotesCount,
                };
              });

            const uniqueUnresolvedProblemViews: CodeProblemView[] = data
              .filter((codeProblem) => {
                const problemSubmissions = action.codeSubmissions.filter(
                  (s) => s.codeProblemUUID === codeProblem.uuid
                );
                return (
                  problemSubmissions.length &&
                  !problemSubmissions.some(
                    (s) => s.codeRunOutcomeId === CodeRunOutcome.Succeeded
                  )
                );
              })
              .map((unresolvedProblem): CodeProblemView => {
                return {
                  name: unresolvedProblem.name,
                  uuid: unresolvedProblem.uuid,
                  complexityTypeId: unresolvedProblem.complexityTypeId,
                  language: unresolvedProblem.language,
                  state: unresolvedProblem.state,
                  upVotesCount: unresolvedProblem.upVotesCount,
                  downVotesCount: unresolvedProblem.downVotesCount,
                };
              });

            return setProfileViewProblem({
              resolvedProblems: uniqueResolvedProblemViews,
              unresolvedProblems: uniqueUnresolvedProblemViews,
            });
          }),
          catchError(async (error: Error) =>
            settingResolvedProblemError({ error })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<MainPageState>,
    private problemHttp: CodeProblemHttpService,
    private problemVotesHttp: ProblemVotesHttpService,
  ) {}
}
