import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AuthorizationActionTypes } from 'src/app/authorization/state/actions-types/profile.action-type';
import {
  CodeProblemView,
  LoginRequest,
  RegistrationRequest,
  User,
  UserStatistic,
} from 'src/models';

export const getStatisticInitiated = createAction(
  AuthorizationActionTypes.GET_STATISTIC
);

export const getStatisticSucceeded = createAction(
  AuthorizationActionTypes.GET_STATISTIC_SUCCEEDED,
  props<{ statistics: UserStatistic }>()
);

export const getStatisticError = createAction(
  AuthorizationActionTypes.GET_STATISTIC_ERROR,
  props<{ error: Error }>()
);

export const logoutInitiated = createAction(
  AuthorizationActionTypes.LOGOUT_INITIATED
);

export const logoutSucceeded = createAction(
  AuthorizationActionTypes.LOGIN_SUCCEEDED
);

export const logoutError = createAction(
  AuthorizationActionTypes.LOGOUT_ERROR,
  props<{ error: Error }>()
);

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

export const setProfileViewProblem = createAction(
  AuthorizationActionTypes.SET_RESOLVED_PROBLEMS,
  props<{
    resolvedProblems: CodeProblemView[];
    unresolvedProblems: CodeProblemView[];
  }>()
);

export const settingResolvedProblemError = createAction(
  AuthorizationActionTypes.SETTING_RESOLVED_PROBLEMS_ERROR,
  props<{ error: Error }>()
);
