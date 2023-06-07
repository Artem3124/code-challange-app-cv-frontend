import { createReducer, on } from '@ngrx/store';
import {
  setCodeRunProgress,
  setCodeRunResult,
  setCodeRunStage,
  successGettingCodeRunProgress,
} from 'src/app/problem-page/state/actions/console-output.actions';
import { CodeRunProgressState } from 'src/app/problem-page/state/selectors/console-output.selector';
import { CodeRunStage } from 'src/models/enums/code-run-stage.enum';
import { CodeRunResult } from 'src/models';

const initialState: CodeRunProgressState = {
  stage: CodeRunStage.Unset,
  result: null,
};

export const consoleOutputReducer = createReducer(
  initialState,
  on(successGettingCodeRunProgress, setCodeRunProgress, (state, action) => {
    let result: CodeRunResult | null = null;

    if (action.codeRunProgress.result) {
      result = action.codeRunProgress.result;
    }

    return {
      ...state,
      stage: action.codeRunProgress.stage,
      result: result,
    };
  }),
  on(setCodeRunStage, (state, action) => {
    return {
      ...state,
      stage: action.codeRunStage,
    };
  }),
  on(setCodeRunResult, (state, action) => {
    return {
      ...state,
      result: action.codeRunResult,
    };
  })
);
