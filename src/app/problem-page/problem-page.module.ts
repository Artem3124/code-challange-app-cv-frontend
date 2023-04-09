import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActiveSelectorMenu } from 'src/shared/directives/active-selector-menu.directive';
import { ConsoleOutputModule } from './console-output.module';
import { CodeEditorComponent } from './components/problem-page/code-editor/code-editor.component';
import { ProblemPageComponent } from './components/problem-page/problem-page.component';
import { CodeEditorSettingsComponent } from './components/problem-page/code-editor-settings/code-editor-settings';
import { ConsoleOutputSettingsComponent } from './components/problem-page/console-output-settings/console-output-settings.component';
import { ProblemPageDescriptionComponent } from './components/problem-page/problem-description/problem-page-description.component';
import { RarityIconComponent } from 'src/assets/svg/rarity-icon/rarity-icon.component';
import { ManageableIconColor } from 'src/shared/directives/icon/manageable-icon-color.directive';
import { ProblemTagComponent } from '../problem-tag/problem-tag.component';
import { ProblemComplexityPipe } from 'src/shared/pipes/problem-complexity.pipe';
import { CodingLanguagesPipe } from './pipes/coding-languages.pipe';
import { CommonModule } from '@angular/common';
import { ReducerManager, StoreModule } from '@ngrx/store';
import { codeProblemReducer as codeProblemDescriptionState } from './state/reducers/problem.reducer';
import { ProblemStoreService } from 'src/shared/services/store/problem-store.service';
import { EffectsModule } from '@ngrx/effects';
import { ProblemListEffects } from '../main-page/store/effects/problems.effects';
import { ProblemPageRoutingModule } from './problem-page.routing';
import { PageHeaderModule } from '../page-header/page-header.component';
import { CodeRunsHistoryComponent } from './components/problem-page/submission-history/code-runs-history.component';
import { ProblemStateEffects } from './state/effects/code-runs.effect';
import { CodeRunResultHttpService } from 'src/shared/services/http/code-run-results.service';
import { CodeRunsStoreService } from 'src/shared/services/store/code-runs-store.service';
import { codeRunsReducer as codeRunsHistory } from './state/reducers/code-runs.reducer';

@NgModule({
  declarations: [
    CodeRunsHistoryComponent,
    CodingLanguagesPipe,
    ProblemComplexityPipe,
    RarityIconComponent,
    ActiveSelectorMenu,
    CodeEditorComponent,
    ManageableIconColor,
    ProblemPageComponent,
    CodeEditorSettingsComponent,
    ConsoleOutputSettingsComponent,
    ProblemPageDescriptionComponent,
    ProblemTagComponent,
  ],
  exports: [],
  imports: [
    PageHeaderModule,
    CommonModule,
    FormsModule,
    ConsoleOutputModule,
    ProblemPageRoutingModule,
    EffectsModule.forFeature(ProblemStateEffects),
    StoreModule.forFeature('problemState', {
      codeProblemDescriptionState,
      codeRunsHistory,
    }),
  ],
  providers: [
    ProblemStoreService,
    ReducerManager,
    CodeRunResultHttpService,
    CodeRunsStoreService,
  ],
})
export class ProblemPageModule {}
