import { authorizationReducer } from "src/app/authorization/state/reducers/authorization.reducers";
import { codeProblemReducer } from "src/app/problem-page/state/reducers/problem.reducer";

export const reducers = { 
  codeProblemState: codeProblemReducer,
  authState: authorizationReducer,
}