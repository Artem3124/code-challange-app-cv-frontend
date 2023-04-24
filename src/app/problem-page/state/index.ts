import { createFeatureSelector } from '@ngrx/store';
import { CodeRunsHistoryState } from 'src/app/problem-page/state/selectors/code-runs.selector';
import { CodeTemplatesDictionary } from 'src/app/problem-page/state/selectors/code-template.selector';
import { CodeRunProgressState } from 'src/app/problem-page/state/selectors/console-output.selector';
import { CurrentProblemDataState } from 'src/app/problem-page/state/selectors/problem.selector';
import { SourceCodeDictionary } from 'src/app/problem-page/state/selectors/source-code.selector';

export interface CurrentProblemState {
  codeProblemDescriptionState: CurrentProblemDataState,
  codeRunsHistory: CodeRunsHistoryState,
  sourceCodeState: SourceCodeDictionary,
  codeTemplates: CodeTemplatesDictionary,
  codeRunProgress: CodeRunProgressState,
}

export const featureKey = 'problemState'

export const selectProblemState = createFeatureSelector<CurrentProblemState>(featureKey);
