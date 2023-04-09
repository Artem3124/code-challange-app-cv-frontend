import { MainPageState } from "../main-page/store";
import { CurrentProblemState } from "../problem-page/state";

export interface AppState { 
  mainPageState: MainPageState;
  currentProblemState: CurrentProblemState;
}
