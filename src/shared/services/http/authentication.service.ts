import { Injectable } from "@angular/core";
import { HttpBase } from "./http-base.service";
import { LoginRequest, RegistrationRequest, User } from "src/models";
import { Observable, catchError, map } from "rxjs";

@Injectable()
export class AuthHttpService {
  constructor(private http: HttpBase) {}

  login(loginRequest: LoginRequest): Observable<User> { 
    return this.http.post<LoginRequest, User>(loginRequest, 'Authorization/login');
  }

  register(registerRequest: RegistrationRequest):Observable<void> { 
    return this.http.post<RegistrationRequest, void>(registerRequest, 'Authorization/register');
  }

  user() { 
    return this.http.get<User>('Authorization');
  }

  isSignIn(): Observable<boolean> { 
    console.log('service works');

    return this.user().pipe(
      map((user: User) => { 
        return user ? true : false;
      }),
      catchError(async (error: Error) => { 
        console.error(error)
        return false;
      })
      )
  }
}