import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthorizationModule } from '../authorization/authorization.module';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/shared/services/intererceptors/authentication.interceptor';
import { AuthGuard } from 'src/shared/services/guards/authentication.guard';
import { MainPageModule } from '../main-page/main-page.module';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ProblemPageModule } from '../problem-page/problem-page.module';
import { globalEffects } from 'src/app/state/effects';
import { authorizationReducer } from 'src/app/authorization/state/reducers/authorization.reducers';
import { AuthStoreService } from 'src/shared/services/store/auth-store.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    ProblemPageModule,
    MainPageModule,
    AuthorizationModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    StoreModule.forFeature('authState', authorizationReducer),
    EffectsModule.forFeature(globalEffects),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [
    AuthStoreService,
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
  exports: []
})
export class AppModule {}
