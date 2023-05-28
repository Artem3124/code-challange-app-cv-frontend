import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActiveSelectorMenu } from 'src/shared/directives/active-selector-menu.directive';
import { RarityIconModule } from 'src/assets/svg/rarity-icon/rarity-icon.component';
import { ProblemComplexityPipeModule } from 'src/shared/pipes/problem-complexity.pipe';
import { CommonModule } from '@angular/common';
import { ReducerManager, StoreModule } from '@ngrx/store';
import { codeProblemReducer as codeProblemDescriptionState } from './state/reducers/problem.reducer';
import { ProblemStoreService } from 'src/shared/services/store/problem-store.service';
import { EffectsModule } from '@ngrx/effects';
import { CodeRunResultHttpService } from 'src/shared/services/http/code-run-results.service';
import { CodeRunsStoreService } from 'src/shared/services/store/code-runs-store.service';
import { SourceCodeStoreService } from 'src/shared/services/store/source-code-store.service';
import { CodeTemplateStoreService } from 'src/shared/services/store/code-template.service';
import { sourceCodeReducer as sourceCodeState } from 'src/app/problem-page/state/reducers/source-code.reducer';
import { codeTemplateReducer as codeTemplates } from 'src/app/problem-page/state/reducers/code-templates.reducer';
import { PageHeaderModule } from 'src/app/page-header/page-header.component';
import { CodeEditorSettingsComponent } from 'src/app/problem-page/components/problem-page/code-editor-settings/code-editor-settings';
import { CodeEditorComponent } from 'src/app/problem-page/components/problem-page/code-editor/code-editor.component';
import { ConsoleOutputSettingsComponent } from 'src/app/problem-page/components/problem-page/console-output-settings/console-output-settings.component';
import { ProblemPageDescriptionComponent } from 'src/app/problem-page/components/problem-page/problem-description/problem-page-description.component';
import { ProblemPageComponent } from 'src/app/problem-page/components/problem-page/problem-page.component';
import { CodeRunsHistoryComponent } from 'src/app/problem-page/components/problem-page/submission-history/code-runs-history.component';
import { ConsoleOutputModule } from 'src/app/problem-page/console-output.module';
import { CodingLanguagesPipe } from 'src/shared/pipes/coding-languages.pipe';
import { ProblemPageRoutingModule } from 'src/app/problem-page/problem-page.routing';
import { ProblemTagComponent } from 'src/app/problem-tag/problem-tag.component';
import { codeRunsReducer as codeRunsHistory } from 'src/app/problem-page/state/reducers/code-runs.reducer'
import { problemStateEffects } from 'src/app/state/effects';
import { CodeRunComponent } from 'src/app/problem-page/components/problem-page/submission-history/code-run/code-run.component';
import { CodeRunOutcomeDirective } from 'src/shared/directives/output-style.directive';
import { ConsoleOutputStoreService } from 'src/shared/services/store/console-output-store.service';
import { consoleOutputReducer as codeRunProgress } from 'src/app/problem-page/state/reducers/console-output.reducer';
import { ManageableIconModule } from 'src/shared/directives/icon/manageable-icon.module';
import { StringToCodeLanguagePipe } from './components/problem-page/code-editor-settings/string-to-code-language.pipe';
import { UtcToLocalDateTimePipe } from './components/problem-page/submission-history/code-run/utc-to-local-date-time.pipe';


@NgModule({
    declarations: [
        CodeRunsHistoryComponent,
        CodingLanguagesPipe,
        ActiveSelectorMenu,
        CodeEditorComponent,
        ProblemPageComponent,
        CodeEditorSettingsComponent,
        ConsoleOutputSettingsComponent,
        ProblemPageDescriptionComponent,
        ProblemTagComponent,
        CodeRunComponent,
        CodeRunOutcomeDirective,
        StringToCodeLanguagePipe,
        UtcToLocalDateTimePipe,
    ],
    imports: [
        ReactiveFormsModule,
        RarityIconModule,
        ProblemComplexityPipeModule,
        ManageableIconModule,
        PageHeaderModule,
        CommonModule,
        FormsModule,
        ConsoleOutputModule,
        ProblemPageRoutingModule,
        EffectsModule.forFeature(problemStateEffects),
        StoreModule.forFeature('problemState', {
            codeProblemDescriptionState,
            codeRunsHistory,
            sourceCodeState,
            codeTemplates,
            codeRunProgress,
        }),
    ],
    providers: [
        ProblemStoreService,
        ReducerManager,
        CodeRunResultHttpService,
        CodeRunsStoreService,
        SourceCodeStoreService,
        CodeTemplateStoreService,
        ConsoleOutputStoreService,
    ],
})
export class ProblemPageModule {}
