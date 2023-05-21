import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CodeProblemView, User } from "src/models";

export interface ProfileState { 
  user: User | null;
  lastResolvedProblems: CodeProblemView[];
  lastUnresolvedProblems: CodeProblemView[];
}

const featureAuthKey = 'authState';

const selectState = createFeatureSelector<ProfileState>(featureAuthKey);

export const selectAuthState = createSelector(selectState, (state) => state.user);

export const isAuthenticated = createSelector(selectState, (state) => state.user === null ? false : true);

export const selectResolvedProblems = createSelector(selectState, (state) => state.lastResolvedProblems);

export const selectUnresolvedProblems = createSelector(selectState, (state) => state.lastUnresolvedProblems);
