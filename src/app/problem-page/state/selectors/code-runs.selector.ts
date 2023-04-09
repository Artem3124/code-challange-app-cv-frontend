import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CodeRunResultExpanded } from 'src/models';
import { CurrentProblemState, selectProblemState } from '..';

export interface CodeRunsHistoryState {
  codeRuns: CodeRunResultExpanded[];
}

export const selectCodeRunsState = createSelector(
  selectProblemState,
  (state: CurrentProblemState): CodeRunsHistoryState => state.codeRunsHistory
);

export const selectCodeRunsHistory = createSelector(
  selectCodeRunsState,
  (state: CodeRunsHistoryState): CodeRunResultExpanded[] => state.codeRuns
);
