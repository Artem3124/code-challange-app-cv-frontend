import { Component, Input } from "@angular/core";
import { CompilationError, TestCaseResult } from "src/models";
import { CodeRunOutcome } from "src/models/enums/code-run-outcome.enum";

@Component({
    selector: 'detailed-view-output',
    templateUrl: './detailed-view-output.component.html',
    styleUrls: ['./detailed-view-output.component.scss',
        '../../../../../../shared/styles/fonts.scss',
    ]
}) export class DetailedViewOutputComponent {
    constructor() {}

  @Input() codeRunOutcome: CodeRunOutcome;
  @Input() errorFlow: CompilationError[] | TestCaseResult;
}