import { AuthenticationState } from "src/app/authorization/state/selectors/authorization.selector";
import { MainPageState } from "../main-page/store";
import { CurrentProblemState } from "../problem-page/state";

export interface AppState { 
  mainPageState: MainPageState;
  currentProblemState: CurrentProblemState;
  authState: AuthenticationState;
}
