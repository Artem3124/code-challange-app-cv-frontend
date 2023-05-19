import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AuthorizationActionTypes } from 'src/app/authorization/state/actions-types/profile.action-type';
import { CodeRunResultExpanded, LoginRequest, RegistrationRequest, User } from 'src/models';

export const loginInitiated = createAction(
  AuthorizationActionTypes.LOGIN_INITIATED,
  props<{ loginRequest: LoginRequest }>()
);

export const registrationInitiated = createAction(
  AuthorizationActionTypes.REGISTRATION_INITIATED,
  props<{ registrationRequest: RegistrationRequest }>()
);
export const loginFailed = createAction(
  AuthorizationActionTypes.LOGIN_FAILED,
  props<{ error: HttpErrorResponse }>()
);

export const registrationFailed = createAction(
  AuthorizationActionTypes.REGISTRATION_FAILED,
  props<{ error: HttpErrorResponse }>()
);
export const loginSucceeded = createAction(
  AuthorizationActionTypes.LOGIN_SUCCEEDED,
  props<{ user: User }>()
);
export const registrationSucceeded = createAction(
  AuthorizationActionTypes.REGISTRATION_SUCCEEDED
);
export const isAuthorizedCheck = createAction(
  AuthorizationActionTypes.IS_AUTHORIZED_CHECK
);
export const authorized = createAction(
  AuthorizationActionTypes.IS_AUTHORIZED,
  props<{ user: User }>()
);
export const unauthorized = createAction(AuthorizationActionTypes.UNAUTHORIZED);

export const authUnexpectedError = createAction(
  AuthorizationActionTypes.UNEXPECTED_ERROR,
  props<{ error: Error }>()
);

export const initiateGettingAllCodeSubmissions = createAction(
  AuthorizationActionTypes.GETTING_ALL_CODE_SUBMISSIONS_INITIATED,
);

export const gettingAllCodeSubmissionsSucceeded = createAction(
  AuthorizationActionTypes.GETTING_ALL_CODE_SUBMISSIONS_SUCCEEDED,
  props<{ codeSubmissions: CodeRunResultExpanded[] }>()
)

export const gettingAllCodeSubmissionsError = createAction(
  AuthorizationActionTypes.GETTING_ALL_CODE_SUBMISSION_ERROR,
  props<{error: Error}>()
)