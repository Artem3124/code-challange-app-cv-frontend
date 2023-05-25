import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ListModule } from 'src/app/main-page/components/main-page/problems-list/list-component/list.module';
import { PageHeaderModule } from 'src/app/page-header/page-header.component';
import { LastResolvedProblemsComponent } from 'src/app/user-profile/components/last-resolved-problems/last-resolved-problems.component';
import { PercentageChartComponent } from 'src/app/user-profile/components/problems-solved-percentage/percantage-chart/percentage-chart.component';
import { ParseIntPipe } from 'src/app/user-profile/components/problems-solved-percentage/pipe/parse-int.pipe';
import { ProblemsSolvedPercentage } from 'src/app/user-profile/components/problems-solved-percentage/problems-solved-percentage.component';
import { ProfileComponent } from 'src/app/user-profile/components/profile-section/profile-section.component';
import { UnresolvedProblemsComponent } from 'src/app/user-profile/components/unresolved-problems/unresolved-problems.component';
import { UserProfileComponent } from 'src/app/user-profile/components/user-profile.component';
import { UserProfileRouterModule } from 'src/app/user-profile/user-profile.routing';
import { StatisticHttpService } from 'src/shared/services/http/statistic.service';

@NgModule({
  imports: [
    ListModule,
    CommonModule,
    RouterModule,
    PageHeaderModule,
    UserProfileRouterModule,
    NgApexchartsModule,
    MatProgressBarModule,
    
  ],
  declarations: [
    UserProfileComponent,
    ProfileComponent,
    LastResolvedProblemsComponent,
    UnresolvedProblemsComponent,
    ProblemsSolvedPercentage,
    PercentageChartComponent,
    ParseIntPipe,
  ],
  providers: [
    StatisticHttpService,
  ]
})
export class UserProfileModule {}
