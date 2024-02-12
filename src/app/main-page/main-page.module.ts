import { NgModule } from '@angular/core';
import { ProblemsListComponent } from './components/main-page/problems-list/problems-list.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PageHeaderModule } from '../page-header/page-header.component';
import { CodeProblemHttpService } from 'src/shared/services/http/code-problem.service';
import { CommonModule } from '@angular/common';
import { MainPageRoutingModule } from './main-page.routing';
import { ProblemListStoreService } from 'src/shared/services/store/problem-list-store.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProblemListEffects } from './store/effects/problems.effects';
import { problemListReducer } from './store/reducers/problem-list.reducer';
import { globalEffects, mainPageEffects } from 'src/app/state/effects';
import { ProblemComplexityPipe, ProblemComplexityPipeModule } from 'src/shared/pipes/problem-complexity.pipe';
import { ProblemsFilterComponent } from 'src/app/main-page/components/main-page/problems-list/filter-component/filter.component';
import { RarityIconComponent } from 'src/assets/svg/rarity-icon/rarity-icon.component';
import { ProblemListModule } from 'src/app/main-page/components/main-page/problems-list/problems-list.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [MainPageComponent],
    providers: [CodeProblemHttpService, ProblemListStoreService],
    exports: [MainPageComponent],
    imports: [
        ProblemComplexityPipeModule,
        ProblemListModule,
        PageHeaderModule,
        MainPageRoutingModule,
        CommonModule,
        StoreModule.forFeature('mainPageState', problemListReducer),
        EffectsModule.forFeature(mainPageEffects),
    ],
})
export class MainPageModule {}
