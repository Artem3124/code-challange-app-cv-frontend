import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: '**', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
