import { Component, Input } from '@angular/core';
import { CodeRunOutcome } from 'src/models/enums/code-run-outcome.enum';
import { CodeRunStage } from 'src/models/enums/code-run-stage.enum';

@Component({
    selector: 'simple-view-output',
    templateUrl: './simple-view-output.component.html',
    styleUrls: [
        './simple-view-output.component.scss',
        '../../../../../../shared/styles/fonts.scss',
    ],
})
export class SimpleViewOutputComponent {
    constructor() {}

  @Input() codeRunOutcome: CodeRunOutcome;
  @Input() codeRunStage: CodeRunStage;
}
