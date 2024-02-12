import { Component } from '@angular/core';
import { IconWithBackgroundState } from 'src/models/icon/icon-with-background-state.model';

@Component({
    selector: 'completed-problem-output',
    templateUrl: './completed-problem-output.component.html',
    styleUrls: [
        './completed-problem-output.component.scss',
        '../../../../../../../../shared/styles/fonts.scss',
        '../../../../../../../../shared/styles/custom-environment.scss',
        '../../../../../../../../shared/styles/global-elements.scss',
    ],
})
export class CompletedProblemOutputComponent {
    constructor() {}

    setCompletedProblemIconState(): IconWithBackgroundState {
        return {
            backgroundColor: '#E7E6DF',
            strokeColor: '#379A3C',
            size: 50,
            lengthSizeMultiplier: 0.867469,
        };
    }
}
