import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CodeProblemHttpService } from 'src/shared/services/http/code-problem.service';
import { AuthorizationModule } from '../authorization/authorization.module';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/shared/services/intererceptors/authentication.interceptor';
import { AuthGuard } from 'src/shared/services/guards/authentication.guard';
import { MainPageModule } from '../main-page/main-page.module';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'
import { codeProblemReducer, codeRunsReducer } from '../problem-page/state/reducers/problem.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ProblemListEffects } from '../main-page/store/effects/problem-list.effect';
import { reducers } from '../state/reducers';
import { ProblemStateEffects } from '../problem-page/state/effects/code-runs.effect';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    AuthorizationModule,
    MainPageModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(ProblemListEffects),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
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
