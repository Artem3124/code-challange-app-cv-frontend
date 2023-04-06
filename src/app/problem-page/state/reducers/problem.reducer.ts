import { createReducer, on } from "@ngrx/store";
import { CurrentProblemState } from "..";
import { insertDataToProblemState } from "src/app/main-page/store/actions/problem-list.action";
import ProblemComplexity from "src/models/enums/problem-rarity.enum";
import { gettingCodeRunsHistorySucceeded } from "../actions/code-runs.actions";

export const initialState: CurrentProblemState = { 
  codeProblem: {
    uuid: 'string',
      name: 'string',
      complexityTypeId: ProblemComplexity.Easy,
      description: 'string',
      constraints: [],
      examples: [],
      tags: [],
      testSubjectName: 'string',
  },
  codeRunsHistory: []
}

export const codeProblemReducer = createReducer(
  initialState, 
  on(insertDataToProblemState, (state, action) => {
    return {
      ...state,
      codeProblem: action.problem,
    }
  })
)

export const codeRunsReducer = createReducer( 
  initialState, 
  on(gettingCodeRunsHistorySucceeded, (state, action) => {
    return {
      ...state,
      codeRunsHistory: action.codeRunsHistory,
    }
  })
)