import { createAction, props } from "@ngrx/store";
import { SourceCodeActions } from "../action-types/source-code.action-types";

export const setSourceCode = createAction(
  SourceCodeActions.SET_SOURCE_CODE,
  props<{ codeDictionary: {[codeType:string]: string} }>()
);