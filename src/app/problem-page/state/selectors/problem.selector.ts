import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CodeProblem, VoteRequest } from 'src/models';
import { CurrentProblemState, selectProblemState } from '..';
import CodeLanguage from 'src/models/enums/coding-languages.enum';

export interface CurrentProblemDataState {
  codeProblem: CodeProblem | null;
}

export const selectProblemDataState = createSelector(
  selectProblemState,
  (state: CurrentProblemState): CurrentProblemDataState =>
    state.codeProblemDescriptionState
);

export const selectCodeProblem = createSelector(
  selectProblemDataState,
  (state: CurrentProblemDataState): CodeProblem | null => {
    return state.codeProblem;
  }
);

export const selectVotes = createSelector(
  selectProblemDataState,
  (state: CurrentProblemDataState): number[] => {
    return [state.codeProblem?.upVotesCount!, state.codeProblem?.downVotesCount!];
  }
)
