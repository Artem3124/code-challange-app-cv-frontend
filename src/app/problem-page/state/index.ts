import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CodeProblem, CodeRunResultExpanded } from 'src/models';
import ProblemComplexity from 'src/models/enums/problem-rarity.enum';

export interface CurrentProblemState {
  codeProblem: CodeProblem;
  codeRunsHistory: CodeRunResultExpanded[];
}

const featureKey = 'problemState'

export const selectState = createFeatureSelector<CurrentProblemState>(featureKey);

export const selectCodeProblemState = createSelector(selectState, state => state.codeProblem);

export const selectSubmissionProblemHistory = createSelector(selectState, state => state.codeRunsHistory);
