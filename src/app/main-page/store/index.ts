import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CodeProblem } from "src/models";

export interface MainPageState {
  problemList: CodeProblem[];
}

const featureKey = 'mainPageState'

export const selectState = createFeatureSelector<MainPageState>(featureKey);

export const getProblemList = createSelector(selectState, (state) => state.problemList);
