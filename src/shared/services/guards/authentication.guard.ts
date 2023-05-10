import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthHttpService } from '../http/authentication.service';
import { AuthStoreService } from 'src/shared/services/store/auth-store.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authStore: AuthStoreService
  ) {
    this.authStore.initiateAuthCheck();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.isSignIn();
  }

  // private isSignIn(): Observable<boolean> {
  //   return this.authService.isSignIn().pipe(
  //     map((isSignIn: boolean) => {
  //       if (isSignIn) {
  //         this.router.navigate(['/home']);
  //         return false;
  //       }

  //       return true;
  //     })
  //     )
  // }

  private isSignIn(): Observable<boolean> { 
    return this.authStore.isSignIn().pipe(
      map((isSignIn: boolean) => { 
        if (isSignIn) { 
          this.router.navigate(['/home']);
          return false;
        }

        return true;
      })
    )
  }
}
