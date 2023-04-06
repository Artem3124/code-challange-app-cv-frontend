import { MainPageState } from "../main-page/store";
import { CurrentProblemState } from "../problem-page/state";

export interface State { 
  mainPageState: MainPageState;
  currentProblemState: CurrentProblemState;
}