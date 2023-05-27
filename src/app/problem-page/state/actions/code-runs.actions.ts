import { createAction, props } from '@ngrx/store';
import { CodeSubmissionsActionsTypes } from '../action-types/code-runs.action-types';
import { CodeRunResultExpanded, CodeSubmission } from 'src/models';

export const initiateGetCodeRunsHistory = createAction(
    CodeSubmissionsActionsTypes.GETTING_CODE_RUNS_HISTORY_INITIATED,
    props<{ codeProblemUUID: string }>()
);

export const gettingCodeRunsHistorySucceeded = createAction(
    CodeSubmissionsActionsTypes.GETTING_CODE_RUNS_HISTORY_SUCCEEDED,
    props<{ codeRunsHistory: CodeRunResultExpanded[] }>()
);

export const gettingCodeRunsHistoryError = createAction(
    CodeSubmissionsActionsTypes.GETTING_CODE_RUNS_HISTORY_ERROR,
    props<{ error: Error }>()
);

export const addingCodeRun = createAction(
    CodeSubmissionsActionsTypes.ADDING_CODE_RUN,
    props<{ codeRunResult: CodeRunResultExpanded }>()
);

export const initiateGettingAllCodeSubmissions = createAction(
    CodeSubmissionsActionsTypes.GETTING_ALL_CODE_SUBMISSIONS_INITIATED,
);

export const gettingAllCodeSubmissionsSucceeded = createAction(
    CodeSubmissionsActionsTypes.GETTING_ALL_CODE_SUBMISSIONS_SUCCEEDED,
    props<{ codeSubmissions: CodeRunResultExpanded[] }>()
)

export const gettingAllCodeSubmissionsError = createAction(
    CodeSubmissionsActionsTypes.GETTING_ALL_CODE_SUBMISSION_ERROR,
    props<{error: Error}>()
)
