import { createAction, props } from "@ngrx/store";
import { CodeSubmissionsActionsTypes } from "../action-types/code-runs.action-types";
import { CodeRunResultExpanded } from "src/models";

export const initiateGetCodeRunsHistory = createAction(
  CodeSubmissionsActionsTypes.GETTING_CODE_RUNS_HISTORY_INITIATED,
  props<{ codeProblemUUID: string }>()
);

export const gettingCodeRunsHistorySucceeded = createAction( 
  CodeSubmissionsActionsTypes.GETTING_CODE_RUNS_HISTORY_SUCCEEDED,
  props<{ codeRunsHistory: CodeRunResultExpanded[] }>()
)

export const gettingCodeRunsHistoryError = createAction(
  CodeSubmissionsActionsTypes.GETTING_CODE_RUNS_HISTORY_ERROR,
  props<{ error: Error }>()
)
