import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ChallengeState } from "./challenge.reducer";

export const challengeSelector = createFeatureSelector<ChallengeState>('challengeState');

export const getChallenges = createSelector(
    challengeSelector,
    state => state?.challenges,
);
