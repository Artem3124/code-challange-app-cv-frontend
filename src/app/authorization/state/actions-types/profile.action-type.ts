export enum AuthorizationActionTypes {
  LOGIN_INITIATED = '[Auth Component] Login initiated.',
  REGISTRATION_INITIATED = '[Auth Component] Registration initiated.',
  LOGIN_FAILED = '[Auth Component] Login Failed',
  REGISTRATION_FAILED = '[Auth Component] Registration Failed',
  LOGIN_SUCCEEDED = '[Auth Component] Login succeeded',
  REGISTRATION_SUCCEEDED = '[Auth Component] Registration succeeded',
  IS_AUTHORIZED_CHECK = '[Auth Component] Authorized check initiated',
  IS_AUTHORIZED = '[Auth Component] User authorized',
  UNAUTHORIZED = '[Auth Component] User unauthorized',
  UNEXPECTED_ERROR = '[Auth Component] Unexpected error while authorization',
  SET_RESOLVED_PROBLEMS = '[Profile component] Set resolved problems',
  SETTING_RESOLVED_PROBLEMS_ERROR = '[Profile component] Set resolved problems occurred in problems effect file',
  GET_RESOLVED_PROBLEMS = '[Profile component] Get resolved problems',
  SET_UNRESOLVED_PROBLEMS = '[Profile component] Set unresolved problems',
  SETTING_UNRESOLVED_PROBLEMS_ERROR = '[Profile component] Set unresolved problems occurred in problems effect file',
  GET_UNRESOLVED_PROBLEMS = '[Profile component] Get unresolved problems',
}
