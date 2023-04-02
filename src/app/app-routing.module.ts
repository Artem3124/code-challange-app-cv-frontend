import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemPageComponent } from './problem-page/components/problem-page/problem-page.component';
import { LoginComponent } from './authorization/components/login/login.component';
import { RegisterComponent } from './authorization/components/register/register.component';
import { AuthorizationPageComponent } from './authorization/components/authorization-page/authorization-page.component';
import { MainPageComponent } from './main-page/components/main-page/main-page.component';
import { ProblemsListComponent } from './main-page/components/problems-list/problems-list.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./authorization/authorization.module').then(
        (module) => module.AuthorizationModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./main-page/main-page.module').then(
        (module) => module.MainPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
