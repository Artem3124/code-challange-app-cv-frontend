import { createSelector } from "@ngrx/store";
import { selectProblemState } from "src/app/problem-page/state";
import { CodeRunResult } from "src/models";
import { CodeRunStage } from "src/models/enums/code-run-stage.enum";

export interface CodeRunProgressState { 
  stage: CodeRunStage,
  result: CodeRunResult | null,
}

export const selectRunProgressState = createSelector(selectProblemState, (state) => state.codeRunProgress);

export const selectRunStage = createSelector(selectRunProgressState, (state) => state.stage);

export const selectRunResult = createSelector(selectRunProgressState, (state) => state.result);