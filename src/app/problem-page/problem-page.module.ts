import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActiveSelectorMenu } from 'src/shared/directives/active-selector-menu.directive';
import { ConsoleOutputModule } from './console-output.module';
import { PageHeaderComponent } from '../page-header/page-header.component';
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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/shared/services/intererceptors/authentication.interceptor';

@NgModule({
  declarations: [
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
  exports: [ProblemPageComponent],
  imports: [FormsModule, ConsoleOutputModule],
  providers: [],
})
export class ProblemPageModule {}
