import { createReducer, on } from "@ngrx/store";
import { gettingCodeRunsHistorySucceeded } from "../actions/code-runs.actions";
import { CodeRunsHistoryState } from "../selectors/code-runs.selector";

const initialState: CodeRunsHistoryState = {
  codeRuns: []
}

export const codeRunsReducer = createReducer( 
  initialState, 
  on(gettingCodeRunsHistorySucceeded, (state, action) => {
    return {
      ...state,
      codeRuns: action.codeRunsHistory,
    }
  })
)