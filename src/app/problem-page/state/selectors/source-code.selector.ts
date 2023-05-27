import { createSelector } from '@ngrx/store';
import {
  selectProblemState,
  CurrentProblemState,
} from 'src/app/problem-page/state';
import CodeLanguage from 'src/models/enums/coding-languages.enum';
import { Dictionary } from 'src/shared/data-types/dictionary.data-type';

export interface SourceCodeDictionary {
  sourceCode: Dictionary<string> | null;
  sourceCodeLanguage: CodeLanguage | null;
  readonlySourceCode: Dictionary<string> | null;
  readonlySourceCodeLanguage: CodeLanguage | null;
}

const selectSourceCodeState = createSelector(
  selectProblemState,
  (state: CurrentProblemState): SourceCodeDictionary => state.sourceCodeState
);

export const selectSourceCode = createSelector(
  selectSourceCodeState,
  (state: SourceCodeDictionary): Dictionary<string> | null => state.sourceCode
);

export const selectReadonlyCode = createSelector(
  selectSourceCodeState,
  (state: SourceCodeDictionary): Dictionary<string> | null =>
    state.readonlySourceCode
);

export const selectReadonlyCodeLanguage = createSelector(
  selectSourceCodeState,
  (state: SourceCodeDictionary): CodeLanguage | null => state.readonlySourceCodeLanguage
)

export const selectCodeLanguage = createSelector(
  selectSourceCodeState,
  (state: SourceCodeDictionary): CodeLanguage | null => state.sourceCodeLanguage
)