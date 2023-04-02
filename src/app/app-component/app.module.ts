import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProblemPageModule } from '../problem-page/problem-page.module';
import { AppComponent } from './app.component';
import { CodeProblemHttpService } from 'src/shared/services/http/code-problem.service';
import { AuthorizationModule } from '../authorization/authorization.module';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/shared/services/intererceptors/authentication.interceptor';
import { AuthGuard } from 'src/shared/services/guards/authentication.guard';
import { MainPageModule } from '../main-page/main-page.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    AuthorizationModule,
    MainPageModule,
  ],
  providers: [
    CodeProblemHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (router: Router) => {
        return new AuthInterceptor(router);
      },
      multi: true,
      deps: [Router],
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
