import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from 'src/app/user-profile/components/user-profile.component';

const routes = RouterModule.forChild([
  { path: ''
  , component: UserProfileComponent },
]);

@NgModule({
  imports: [routes],
  exports: [RouterModule],
})
export class UserProfileRouterModule {}
