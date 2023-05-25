import { Injectable } from "@angular/core";
import { HttpBase } from "./http-base.service";
import { LoginRequest, RegistrationRequest, User, UserStatistic } from "src/models";
import { Observable, catchError, map } from "rxjs";

@Injectable()
export class ProfileHttpService {
  constructor(private http: HttpBase) {}

  private readonly controllerPath = 'Authorization'

  login(loginRequest: LoginRequest): Observable<User> { 
    return this.http.post<LoginRequest, User>(loginRequest, `${this.controllerPath}/login`);
  }

  logout(): Observable<void> { 
    return this.http.get<void>(`${this.controllerPath}/logout`);
  }

  register(registerRequest: RegistrationRequest):Observable<void> { 
    return this.http.post<RegistrationRequest, void>(registerRequest, `${this.controllerPath}/register`);
  }

  user() { 
    return this.http.get<User>(`${this.controllerPath}`);
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