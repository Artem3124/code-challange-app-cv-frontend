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
  imports: [CommonModule, FormsModule, ConsoleOutputModule],
  providers: [],
})
export class ProblemPageModule {}
