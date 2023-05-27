import { createAction, props } from "@ngrx/store";
import { SourceCodeActions } from "../action-types/source-code.action-types";
import { Dictionary } from "src/shared/data-types/dictionary.data-type";
import CodeLanguage from "src/models/enums/coding-languages.enum";

export const hardSetSourceCode = createAction(
  SourceCodeActions.HARD_SET_SOURCE_CODE,
  props<{ codeDictionary: Dictionary<string> }>()
);

export const checkCodeExisting = createAction(
  SourceCodeActions.CHECK_CODE_EXISTING,
  props<{ code: string, language: CodeLanguage }>()
)

export const setReadOnlyCode = createAction( 
  SourceCodeActions.SET_READONLY_CODE,
  props<{ code: string, language: CodeLanguage }>()
)

export const defaultReadOnlyCode = createAction( 
  SourceCodeActions.DEFAULT_READONLY_CODE
)

export const setCurrentLanguage = createAction( 
  SourceCodeActions.SET_CURRENT_LANGUAGE,
  props<{language: CodeLanguage | null}>()
)

export const setCurrentLanguageError = createAction( 
  SourceCodeActions.SET_CURRENT_LANGUAGE,
  props<{error: Error}>()
)
export const setCurrentReadonlyLanguage = createAction( 
  SourceCodeActions.SET_CURRENT_LANGUAGE,
  props<{language: CodeLanguage | null}>()
)
export const setCurrentReadonlyLanguageError = createAction( 
  SourceCodeActions.SET_CURRENT_LANGUAGE,
  props<{error: Error}>()
)
