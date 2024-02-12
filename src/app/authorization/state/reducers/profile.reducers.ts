import { createReducer, on } from '@ngrx/store';
import {
    authUnexpectedError,
    authorized,
    getStatisticSucceeded,
    loginFailed,
    loginSucceeded,
    logoutError,
    logoutSucceeded,
    registrationFailed,
    registrationSucceeded,
    setProfileViewProblem,
    unauthorized,
} from 'src/app/authorization/state/actions/profile.actions';
import { ProfileState } from 'src/app/authorization/state/selectors/profile.selector';
import { CodeProblemView } from 'src/models';

const initialState: ProfileState = {
    user: null,
    lastResolvedProblems: null,
    lastUnresolvedProblems: null,
    resolvedProblemsStatistic: null,
};

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
        logoutSucceeded,
        logoutError,
        authUnexpectedError,
        (state) => {
            return {
                ...state,
                user: null,
            };
        }
    ),
    on(getStatisticSucceeded, (state, action) => {
        return {
            ...state,
            resolvedProblemsStatistic: action.statistics,
        };
    }),
    on(setProfileViewProblem, (state, action) => {
        return {
            ...state,
            lastResolvedProblems: action.resolvedProblems,
            lastUnresolvedProblems: action.unresolvedProblems,
        };
    })
);
