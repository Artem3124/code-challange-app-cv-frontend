import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  authorized,
  isAuthorizedCheck,
  loginInitiated,
  registrationInitiated,
} from 'src/app/authorization/state/actions/profile.actions';
import {
  ProfileState,
  isAuthenticated,
  selectAuthState,
  selectResolvedProblems,
  selectUnresolvedProblems,
} from 'src/app/authorization/state/selectors/profile.selector';
import { CodeProblemView, LoginRequest, RegistrationRequest, User } from 'src/models';

@Injectable()
export class AuthStoreService {
  isSignIn(): Observable<any> {
    console.log(this.store.select(isAuthenticated));
    
    return this.store.select(isAuthenticated);
  }

  getUser(): Observable<User | null> {
    return this.store.select(selectAuthState);
  }

  getResolvedProblems(): Observable<CodeProblemView[]> { 
    return this.store.select(selectResolvedProblems);
  }

  getUnresolvedProblems(): Observable<CodeProblemView[]> { 
    return this.store.select(selectUnresolvedProblems);
  }

  initiateAuthCheck() {
    this.store.dispatch(isAuthorizedCheck());
  }

  initiateRegistration(credentials: RegistrationRequest) {
    this.store.dispatch(
      registrationInitiated({ registrationRequest: credentials })
    );
  }

  initiateLogin(credentials: LoginRequest) {
    this.store.dispatch(loginInitiated({ loginRequest: credentials }));
  }

  constructor(private store: Store<ProfileState>) {}
}
