import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/shared/services/guards/authentication.guard';

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
  {
    path: 'problem/:id',
    loadChildren: () =>
      import('./problem-page/problem-page.module').then(
        (module) => module.ProblemPageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./user-profile/user-profile.module').then(
        (module) => module.UserProfileModule
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
