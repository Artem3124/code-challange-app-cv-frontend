import { createReducer, on } from "@ngrx/store";
import { doneFetchingCodeProblem, insertDataToProblemState } from "src/app/main-page/store/actions/problems.actions";
import { CurrentProblemDataState } from "../selectors/problem.selector";

const initialState: CurrentProblemDataState = { 
    codeProblem: null,
}

export const codeProblemReducer = createReducer(
    initialState, 
    on(insertDataToProblemState, doneFetchingCodeProblem, (state, action) => {
        return {
            ...state,
            codeProblem: action.problem,
        }
    })
)
