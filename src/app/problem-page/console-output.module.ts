import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import AwaitingIconComponent from 'src/assets/svg/awaiting-icon/awaiting-icon.component';
import { AwaitIconAnimation } from 'src/assets/svg/awaiting-icon/awatin-icon-animate.directive';
import { CompletedProblemIconComponent } from 'src/assets/svg/succeeded-icon.component/succeeded-icon.component';
import ManageableSvgPathSize from 'src/shared/directives/icon/manageable-icon-size.directive';
import { ConsoleOutputComponent } from './components/problem-page/console-output/console-output.component';
import { CompileErrorOutputComponent } from './components/problem-page/console-output/detailed-view-output/components/compile-error-output/compile-error-output.component';
import { RuntimeErrorOutputComponent } from './components/problem-page/console-output/detailed-view-output/components/runtime-error-output/runtime-error-output.component';
import { AwaitingCodeSubmissionComponent } from './components/problem-page/console-output/simple-view-output/components/awaitng-code-submission-output/awaiting-code-submission.component';
import { CompletedProblemOutputComponent } from './components/problem-page/console-output/simple-view-output/components/completed-problem-output/completed-problem-output.component';
import { SimpleViewOutputComponent } from './components/problem-page/console-output/simple-view-output/simple-view-output.component';
import { ErrorIconComponent } from 'src/assets/svg/error-icon/error-icon.component';
import { CodeStageToDetailedViewPipe } from './components/problem-page/console-output/detailed-view-output/pipes/detailed-view-output.pipe';
import { CodeStageToSimpleViewPipe } from './components/problem-page/console-output/simple-view-output/pipes/simple-view-output.pipe';
import { DetailedViewOutputComponent } from './components/problem-page/console-output/detailed-view-output/detailed-view-output.component';
import { RuntimeErrorViewPipe } from './components/problem-page/console-output/detailed-view-output/components/runtime-error-output/pipes/runtime-error-view.pipe';
import { CompileErrorViewPipe } from './components/problem-page/console-output/detailed-view-output/components/compile-error-output/pipes/compile-error-view.pipe';
import { CommonModule } from '@angular/common';
import { ManageableIconModule } from 'src/shared/directives/icon/manageable-icon.module';

@NgModule({
  declarations: [
    CompileErrorViewPipe,
    RuntimeErrorViewPipe,
    DetailedViewOutputComponent,
    CodeStageToSimpleViewPipe,
    CodeStageToDetailedViewPipe,
    ErrorIconComponent,
    SimpleViewOutputComponent,
    ConsoleOutputComponent,
    RuntimeErrorOutputComponent,
    CompileErrorOutputComponent,
    AwaitingCodeSubmissionComponent,
    AwaitingIconComponent,
    AwaitIconAnimation,
    CompletedProblemIconComponent,
    CompletedProblemOutputComponent,
  ],
  exports: [ConsoleOutputComponent],
  imports: [FormsModule, CommonModule, ManageableIconModule],
  providers: [],
})
export class ConsoleOutputModule {}
