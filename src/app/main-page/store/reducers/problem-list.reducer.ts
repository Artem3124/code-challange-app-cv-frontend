import { createReducer, on } from "@ngrx/store"
import { MainPageState } from ".."
import { doneFetchingCodeProblemList } from "../actions/problems.actions"

export const initialState: MainPageState = { 
  problemList: [],
}

export const problemListReducer = createReducer(
  initialState,
  on(doneFetchingCodeProblemList, (state, action) => {
    return {
      ...state,
      problemList: action.problemsList,
    };
  })
);

