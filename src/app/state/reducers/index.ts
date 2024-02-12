import { authorizationReducer } from "src/app/authorization/state/reducers/profile.reducers";
import { challengeReducer } from "src/app/challenges/state/challenge.reducer";
import { codeProblemReducer } from "src/app/problem-page/state/reducers/problem.reducer";

export const reducers = { 
    codeProblemState: codeProblemReducer,
    authState: authorizationReducer,
    challengeState: challengeReducer,
}