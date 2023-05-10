import { createReducer, on } from '@ngrx/store';
import {
  authorized,
  loginFailed,
  loginSucceeded,
  registrationFailed,
  registrationSucceeded,
  unauthorized,
} from 'src/app/authorization/state/actions/authorization.actions';
import { AuthenticationState } from 'src/app/authorization/state/selectors/authorization.selector';
import { User } from 'src/models';

const initialState: AuthenticationState = {
  user: null,
}

export const authorizationReducer = createReducer(
  initialState,
  on(loginSucceeded, authorized, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(
    loginFailed,
    registrationSucceeded,
    registrationFailed,
    unauthorized,
    (state, action) => {
      return {
        ...state,
        user: null,
      };
    }
  )
);
