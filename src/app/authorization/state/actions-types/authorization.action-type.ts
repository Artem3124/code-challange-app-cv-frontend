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
}
