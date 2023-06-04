import { createReducer, on } from "@ngrx/store";
import { Challenge } from "src/models"
import { setChallenges } from "./challenge.actions";

export interface ChallengeState {
    challenges: Challenge[] | null;
}

const initialState: ChallengeState = {
    challenges: null,
}

export const challengeReducer = createReducer(
    initialState,
    on(setChallenges, (state, action) => {
        return {
            ...state,
            challenges: action.challenges,
        };
    })
)