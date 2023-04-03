import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorizationPageComponent } from './components/authorization-page/authorization-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from 'src/shared/services/guards/authentication.guard';

const routes = RouterModule.forChild([
  {
    path: '',
    component: AuthorizationPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'register',
        children: [
          { path: '', component: RegisterComponent, outlet: 'authRouter' },
        ],
      },
      {
        path: 'login',
        children: [
          { path: '', component: LoginComponent, outlet: 'authRouter' },
        ],
      },
    ],
  },
]);

@NgModule({
  imports: [routes],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
