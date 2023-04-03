import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
}) export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptor works');

    return next.handle(req).pipe(tap(() => { }, 
      (err: Error) => { 
        console.error(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401 && err.status !== 404) {
            return;
          }
          
         //this.router.navigate([['', { outlets: { authRouter: ['login'] } }]]);
        }
      }
    ))
  }

  

}