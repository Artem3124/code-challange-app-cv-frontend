import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { CompilationError, TestCaseResult } from 'src/models';
import { CodeRunOutcome } from 'src/models/enums/code-run-outcome.enum';
import { CodeRunStage } from 'src/models/enums/code-run-stage.enum';
import { IconWithBackgroundState } from 'src/models/icon/icon-with-background-state.model';

export interface SimpleViewOutputActions {
  isAnimate?: boolean;
  isErrorIcon?: boolean;
  header: string;
  isSucceededIcon?: boolean;
  isAwaitingIcon?: boolean;
  iconState?: IconWithBackgroundState;
  isSimpleViewOutput?: boolean;
}

@Injectable()
@Pipe({
    name: 'outcomeTypeToSimpleView',
    pure: true,
})
export class CodeStageToSimpleViewPipe implements PipeTransform {
    private awaitingIconState: IconWithBackgroundState = {
        size: 60,
        strokeColor: '#535153',
        backgroundColor: '#E7E6DF',
        lengthSizeMultiplier: 0.8795,
    };

    private succeededIconState: IconWithBackgroundState = {
        backgroundColor: '#E7E6DF',
        strokeColor: '#379A3C',
        size: 50,
        lengthSizeMultiplier: 0.867469,
    };

    private errorIconState: IconWithBackgroundState = {
        size: 60,
        strokeColor: '#D14A4A',
        backgroundColor: '#E7E6DF',
        lengthSizeMultiplier: 0.8795,
    };

    transform(
        inputStage: CodeRunStage,
        inputOutcome: CodeRunOutcome
    ): SimpleViewOutputActions | null {
        switch (inputOutcome) {
        case CodeRunOutcome.Succeeded: {
            return {
                header: 'Problem resolved successfully',
                isSucceededIcon: true,
                iconState: this.succeededIconState,
            };
        }
        case CodeRunOutcome.TimeLimitExceeded: {
            return {
                header: 'Time limit exceeded',
                isErrorIcon: true,
                iconState: this.errorIconState,
            };
        }
        case CodeRunOutcome.MemoryLimitExceeded: {
            return {
                header: 'Memory limit exceeded',
                isErrorIcon: true,
                iconState: this.errorIconState,
            };
        }
        case CodeRunOutcome.TestFailed: 
        case CodeRunOutcome.CompilationError:
        case CodeRunOutcome.RuntimeError: {
            return null;
        }
        }

        switch (inputStage) {
        case CodeRunStage.Unset: {
            return {
                header: 'Run your code to see the output',
                isAwaitingIcon: true,
                iconState: this.awaitingIconState,
            };
        }
        case CodeRunStage.Queued: {
            return {
                header: 'Code is queued for running...',
                isAnimate: true,
                isAwaitingIcon: true,
                iconState: this.awaitingIconState,
            };
        }
        case CodeRunStage.Compiling: {
            return {
                header: 'Compiling code...',
                isAnimate: true,
                isAwaitingIcon: true,
                iconState: this.awaitingIconState,
            };
        }
        case CodeRunStage.Testing: {
            return {
                header: 'Testing code...',
                isAnimate: true,
                isAwaitingIcon: true,
                iconState: this.awaitingIconState,
            };
        }
        case CodeRunStage.Completed: {
            return null;
        }
        }
    }
}
