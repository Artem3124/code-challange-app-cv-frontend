import { createSelector } from '@ngrx/store';
import { CurrentProblemState, selectProblemState } from '..';
import { Dictionary } from 'src/shared/data-types/dictionary.data-type';

export interface CodeTemplatesDictionary {
  codeTemplates: Dictionary<string> | null;
}

export const selectCodeTemplatesState = createSelector(
  selectProblemState,
  (state: CurrentProblemState): CodeTemplatesDictionary => state.codeTemplates
);

export const selectCodeTemplates = createSelector(
  selectCodeTemplatesState,
  (state: CodeTemplatesDictionary): Dictionary<string> | null =>
    state.codeTemplates
);
