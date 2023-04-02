import { Component, Input } from '@angular/core';
import { CompilationError, TestCaseResult } from 'src/models';

@Component({
  selector: 'runtime-error-output',
  templateUrl: './runtime-error-output.component.html',
  styleUrls: [
    './runtime-error-output.component.scss',
    '../../../../../../../../shared/styles/global-elements.scss',
    '../../../../../../../../shared/styles/fonts.scss',
    '../../../../../../../../shared/styles/custom-environment.scss',
  ],
})
export class RuntimeErrorOutputComponent {
  constructor() {}

  @Input() testCaseNumber: number = 1;
  @Input() errorsInput: TestCaseResult | CompilationError[];

}
