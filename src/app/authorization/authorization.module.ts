import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/sidebar/sidebar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthHttpService } from 'src/shared/services/http/authentication.service';
import { AuthorizationPageComponent } from './components/authorization-page/authorization-page.component';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthValidator } from 'src/shared/services/validators/auth.validator';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { authorizationReducer } from 'src/app/authorization/state/reducers/profile.reducers';
import { globalEffects } from 'src/app/state/effects';

@NgModule({
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    AuthorizationPageComponent,
  ],
  exports: [AuthorizationPageComponent],
  providers: [AuthHttpService, AuthValidator],
})
export class AuthorizationModule {}
