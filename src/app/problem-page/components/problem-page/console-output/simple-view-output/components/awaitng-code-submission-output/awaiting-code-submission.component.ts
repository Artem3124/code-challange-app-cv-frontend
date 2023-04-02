import { Component, Input } from '@angular/core';
import { CodeRunStage } from 'src/models/enums/code-run-stage.enum';
import { IconWithBackgroundState } from 'src/models/icon/icon-with-background-state.model';

@Component({
  selector: 'awaiting-code-submission',
  styleUrls: [
    './awaiting-code-submission.component.scss',
    '../../../../../../../../shared/styles/global-elements.scss',
    '../../../../../../../../shared/styles/fonts.scss'
  ],
  templateUrl: './awaiting-code-submission.component.html',
})
export class AwaitingCodeSubmissionComponent {
  setAwaitingIconState(): IconWithBackgroundState {
    return {
      size: 60,
      strokeColor: '#535153',
      backgroundColor: '#E7E6DF',
      lengthSizeMultiplier: 0.8795,
    };
  }

  @Input() codeRunStage: CodeRunStage;

  constructor() {}
}
