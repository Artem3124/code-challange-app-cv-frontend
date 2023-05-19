import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CodeProblemView, User } from "src/models";

export interface AuthenticationState { 
  user: User | null;
  lastResolvedProblems: CodeProblemView[];
  lastUnresolvedProblems: CodeProblemView[];
}

const featureAuthKey = 'authState';

export const selectState = createFeatureSelector<AuthenticationState>(featureAuthKey);

export const selectAuthState = createSelector(selectState, (state) => state.user);

export const isAuthenticated = createSelector(selectState, (state) => state.user === null ? false : true);
