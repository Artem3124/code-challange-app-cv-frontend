import { ProfileState } from "src/app/authorization/state/selectors/profile.selector";
import { MainPageState } from "../main-page/store";
import { CurrentProblemState } from "../problem-page/state";
import { ChallengeState } from "../challenges/state/challenge.reducer";

export interface AppState { 
  mainPageState: MainPageState;
  currentProblemState: CurrentProblemState;
  authState: ProfileState;
  challengeState: ChallengeState;
}
