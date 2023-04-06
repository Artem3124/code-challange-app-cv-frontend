import { createReducer, on } from "@ngrx/store"
import { MainPageState } from ".."
import { doneFetchingCodeProblems } from "../actions/problem-list.action"

export const initialState: MainPageState = { 
  problemList: [],
}

export const problemListReducer = createReducer(
  initialState,
  on(doneFetchingCodeProblems, (state, action) => {
    return {
      ...state,
      problemList: action.problemsList,
    };
  })
);

