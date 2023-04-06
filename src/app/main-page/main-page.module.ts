import { NgModule } from '@angular/core';
import { ProblemsListComponent } from './components/main-page/problems-list/problems-list.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProblemPageComponent } from '../problem-page/components/problem-page/problem-page.component';
import { ProblemPageModule } from '../problem-page/problem-page.module';
import { CodeProblemHttpService } from 'src/shared/services/http/code-problem.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainPageRoutingModule } from './main-page.routing';
import { ProblemListStoreService } from 'src/shared/services/store/problem-list-store.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProblemListEffects } from './store/effects/problem-list.effect';
import { problemListReducer } from './store/reducers/problem-list.reducer';

@NgModule({
  declarations: [ProblemsListComponent, MainPageComponent, PageHeaderComponent],
  providers: [CodeProblemHttpService, ProblemListStoreService],
  exports: [MainPageComponent],
  imports: [
    MainPageRoutingModule,
    ProblemPageModule,
    CommonModule,
    StoreModule.forFeature('mainPageState', problemListReducer),
    EffectsModule.forFeature(ProblemListEffects),
  ],
})
export class MainPageModule {}
