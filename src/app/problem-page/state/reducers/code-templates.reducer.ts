import { createReducer, on } from '@ngrx/store';
import { SourceCodeDictionary } from '../selectors/source-code.selector';
import { successFetchingCodeTemplates } from '../actions/code-templates.actions';

const initialState: SourceCodeDictionary = {
  sourceCode: null,
};

export const sourceCodeReducer = createReducer(
  initialState,
  on(successFetchingCodeTemplates, (state, action) => {
    return {
      ...state,
      dict: action.dict,
    };
  })
);
