import { createReducer, on } from '@ngrx/store';
import { successFetchingCodeTemplates } from '../actions/code-templates.actions';
import { CodeTemplatesDictionary } from 'src/app/problem-page/state/selectors/code-template.selector';

const initialState: CodeTemplatesDictionary = {
    codeTemplates: null,
};

export const codeTemplateReducer = createReducer(
    initialState,
    on(successFetchingCodeTemplates, (state, action) => {
        return {
            ...state,
            codeTemplates: action.dict,
        };
    })
);
