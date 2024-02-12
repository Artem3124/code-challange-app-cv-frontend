import { createAction, props } from "@ngrx/store";
import { Challenge } from "src/models";

export const setChallenges = createAction(
    'SET_CHALLENGES',
    props<{challenges: Challenge[]}>()
);
