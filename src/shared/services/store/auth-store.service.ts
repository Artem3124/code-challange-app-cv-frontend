import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  authorized,
  isAuthorizedCheck,
  loginInitiated,
  registrationInitiated,
} from 'src/app/authorization/state/actions/authorization.actions';
import {
  AuthenticationState,
  isAuthenticated,
  selectAuthState,
} from 'src/app/authorization/state/selectors/authorization.selector';
import { LoginRequest, RegistrationRequest, User } from 'src/models';

@Injectable()
export class AuthStoreService {
  isSignIn(): Observable<boolean> {
    return this.store.select(isAuthenticated);
  }

  getUser(): Observable<User | null> {
    return this.store.select(selectAuthState);
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

  constructor(private store: Store<AuthenticationState>) {}
}
