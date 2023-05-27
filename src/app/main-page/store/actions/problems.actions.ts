import { createAction, props } from '@ngrx/store';
import { CodeProblem } from 'src/models';
import { ProblemsActions } from '../action-types/problems.action-types';
import { HttpErrorResponse } from '@angular/common/http';

export const insertDataToProblemState = createAction(
    ProblemsActions.INSERT_TO_PROBLEM_STATE,
    props<{ problem: CodeProblem }>()
);

export const searchProblem = createAction(
    ProblemsActions.SEARCH_CERTAIN_PROBLEM,
    props<{ problemUUID: string }>()
);

export const initiateFetchingProblemList = createAction(
    ProblemsActions.INITIATE_FETCHING_CODE_PROBLEMS,
)

export const doneFetchingCodeProblemList = createAction(
    ProblemsActions.DONE_FETCHING_CODE_PROBLEMS,
    props<{ problemsList: CodeProblem[]}>()
)

export const errorFetchingProblemList = createAction(
    ProblemsActions.ERROR_FETCHING_CODE_PROBLEMS,
    props<{error: Error}>()
)

export const initiateFetchingCodeProblem = createAction(
    ProblemsActions.INITIATE_FETCHING_CODE_PROBLEM,
    props<{problemUUID: string}>()
) 

export const doneFetchingCodeProblem = createAction(
    ProblemsActions.DONE_FETCHING_CODE_PROBLEM,
    props<{problem: CodeProblem}>()
)

export const errorFetchingCodeProblem = createAction(
    ProblemsActions.ERROR_FETCHING_CODE_PROBLEM,
    props<{error: HttpErrorResponse}>()
)

export const testAction = createAction(
    "dfasfa"
)
