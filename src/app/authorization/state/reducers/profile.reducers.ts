import { createReducer, on } from '@ngrx/store';
import {
  authorized,
  loginFailed,
  loginSucceeded,
  registrationFailed,
  registrationSucceeded,
  setProfileViewProblem,
  setResolvedProblem,
  setUnresolvedProblems,
  unauthorized,
} from 'src/app/authorization/state/actions/profile.actions';
import { ProfileState } from 'src/app/authorization/state/selectors/profile.selector';
import { gettingAllCodeSubmissionsSucceeded } from 'src/app/problem-page/state/actions/code-runs.actions';
import { CodeProblemView, User } from 'src/models';

const initialState: ProfileState = {
  user: null,
  lastResolvedProblems: [],
  lastUnresolvedProblems: [],
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
    (state) => {
      return {
        ...state,
        user: null,
      };
    }
  ),
  on(setProfileViewProblem, (state, action) => { 
    return { 
      ...state,
      lastResolvedProblems: action.resolvedProblems,
    }
  }),
);
