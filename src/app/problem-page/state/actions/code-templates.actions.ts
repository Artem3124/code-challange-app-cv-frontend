import { createAction, props } from '@ngrx/store';
import { CodeTemplatesActions } from '../action-types/code-templates.action-types';
import { Dictionary } from 'src/shared/data-types/dictionary.data-type';

export const initiateFetchingCodeTemplates = createAction(
  CodeTemplatesActions.FETCHING_CODE_TEMPLATES_INITIATED,
  props<{ problemUUID: string }>()
);
export const successFetchingCodeTemplates = createAction(
  CodeTemplatesActions.FETCHING_CODE_TEMPLATES_DONE,
  props<{ dict: Dictionary<string> }>()
);
export const errorFetchingCodeTemplates = createAction(
  CodeTemplatesActions.FETCHING_CODE_TEMPLATES_ERROR,
  props<{ error: Error }>()
);
