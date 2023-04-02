import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, catchError, map } from "rxjs";
import { AuthHttpService } from "../http/authentication.service";
import { HttpBase } from "../http/http-base.service";
import { HttpClient } from "@angular/common/http";
import { User } from "src/models";

@Injectable({
  providedIn: 'root'
}) export class AuthGuard implements CanActivate {

  constructor(private authService: AuthHttpService, private router: Router) {
  }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.isSignIn();
  } 

  private isSignIn(): Observable<boolean> { 
    console.log('guard works');
    
    return this.isSignIn().pipe(
      map((isSignIn: boolean) => {
        console.log('guard')
        console.log(isSignIn);
        return isSignIn ?
           true :
        
        
         false;
      }),
      catchError(async (err: Error) => {
        console.error(err);
      return false;
    }),
      )
  }
  
}