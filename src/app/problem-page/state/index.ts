import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CodeProblem, CodeRunResultExpanded } from 'src/models';
import ProblemComplexity from 'src/models/enums/problem-rarity.enum';
import { CodeRunsHistoryState } from './selectors/code-runs.selector';
import { CurrentProblemDataState } from './selectors/problem.selector';
import { SourceCodeDictionary } from './selectors/source-code.selector';
import { CodeTemplatesDictionary } from './selectors/code-template.selector';

export interface CurrentProblemState {
  codeProblemDescriptionState: CurrentProblemDataState,
  codeRunsHistory: CodeRunsHistoryState,
  sourceCodeState: SourceCodeDictionary,
  codeTemplates: CodeTemplatesDictionary,
}

export const featureKey = 'problemState'

export const selectProblemState = createFeatureSelector<CurrentProblemState>(featureKey);
