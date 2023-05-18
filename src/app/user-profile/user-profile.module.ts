import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ListModule } from "src/app/main-page/components/main-page/problems-list/list-component/list.module";
import { PageHeaderModule } from "src/app/page-header/page-header.component";
import { LastResolvedProblemsComponent } from "src/app/user-profile/components/last-resolved-problems/last-resolved-problems.component";
import { ProfileComponent } from "src/app/user-profile/components/profile-section/profile-section.component";
import { UnresolvedProblemsComponent } from "src/app/user-profile/components/unresolved-problems/unresolved-problems.component";
import { UserProfileComponent } from "src/app/user-profile/components/user-profile.component";
import { UserProfileRouterModule } from "src/app/user-profile/user-profile.routing";

@NgModule({
  imports: [
    ListModule,
    CommonModule,
    RouterModule,
    PageHeaderModule,
    UserProfileRouterModule,
  ],
  declarations: [
    UserProfileComponent,
    ProfileComponent,
    LastResolvedProblemsComponent,
    UnresolvedProblemsComponent,
  ]
}) export class UserProfileModule {}