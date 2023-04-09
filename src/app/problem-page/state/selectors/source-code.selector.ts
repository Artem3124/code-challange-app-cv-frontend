import { createSelector } from '@ngrx/store';
import { CurrentProblemState, selectProblemState } from '..';
import { Dictionary } from 'src/shared/data-types/dictionary.data-type';

export interface SourceCodeDictionary {
  sourceCode: Dictionary<string> | null;
}

const selectSourceCodeState = createSelector(
  selectProblemState,
  (state: CurrentProblemState): SourceCodeDictionary => state.sourceCodeState
);

export const selectSourceCode = createSelector(
  selectSourceCodeState,
  (state: SourceCodeDictionary): Dictionary<string> | null =>
    state.sourceCode
);
