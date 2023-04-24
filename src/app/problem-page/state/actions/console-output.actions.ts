import { createAction, props } from '@ngrx/store';
import { ConsoleOutputActionTypes } from 'src/app/problem-page/state/action-types/console-output.action-types';
import { CodeRunProgress, CodeRunResult } from 'src/models';
import { CodeRunStage } from 'src/models/enums/code-run-stage.enum';

export const initializedGettingCodeRunProgress = createAction(
  ConsoleOutputActionTypes.GETTING_CODE_RUN_PROGRESS_INITIALIZED,
  props<{ problemUUID: string }>()
);

export const successGettingCodeRunProgress = createAction(
  ConsoleOutputActionTypes.GETTING_CODE_RUN_PROGRESS_SUCCEEDED,
  props<{ codeRunProgress: CodeRunProgress }>()
);

export const errorGettingCodeRunProgress = createAction(
  ConsoleOutputActionTypes.GETTING_CODE_RUN_PROGRESS_ERROR,
  props<{ error: Error }>()
);

export const setCodeRunProgress = createAction(
  ConsoleOutputActionTypes.SET_CODE_RUN_PROGRESS,
  props<{ codeRunProgress: CodeRunProgress }>()
);

export const setCodeRunStage = createAction(
  ConsoleOutputActionTypes.SET_CODE_RUN_STAGE,
  props<{ codeRunStage: CodeRunStage }>()
);

export const setCodeRunResult = createAction(
  ConsoleOutputActionTypes.SET_CODE_RESULT,
  props<{ codeRunResult: CodeRunResult | null }>()
);
