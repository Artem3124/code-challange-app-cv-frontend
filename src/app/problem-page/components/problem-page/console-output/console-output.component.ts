import { Component, Input, OnInit } from '@angular/core';
import { TestCaseResult, CompilationError } from 'src/models';
import { CodeRunOutcome } from 'src/models/enums/code-run-outcome.enum';
import { CodeRunStage } from 'src/models/enums/code-run-stage.enum';

@Component({
  selector: 'console-output',
  templateUrl: './console-output.component.html',
  styleUrls: [
    './console-output.component.scss',
    '../../../../../shared/styles/global-elements.scss',
  ],
})
export class ConsoleOutputComponent {
  constructor() {}

  @Input() codeRunStage: CodeRunStage = CodeRunStage.Unset;
  @Input() codeRunOutcome: CodeRunOutcome =  CodeRunOutcome.Unknown;
  @Input() errorFlow: TestCaseResult | CompilationError[];
}
