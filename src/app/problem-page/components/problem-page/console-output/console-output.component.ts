import { Component, Input, OnInit } from '@angular/core';
import {
    TestCaseResult,
    CompilationError,
    CodeRunResult,
} from 'src/models';
import { CodeRunOutcome } from 'src/models/enums/code-run-outcome.enum';
import { CodeRunStage } from 'src/models/enums/code-run-stage.enum';
import { ConsoleOutputStoreService } from 'src/shared/services/store/console-output-store.service';

@Component({
    selector: 'console-output',
    templateUrl: './console-output.component.html',
    styleUrls: [
        './console-output.component.scss',
        '../../../../../shared/styles/global-elements.scss',
    ],
})
export class ConsoleOutputComponent implements OnInit {
    constructor(private consoleOutputStore: ConsoleOutputStoreService) {}
    ngOnInit(): void {
        this.consoleOutputStore.getRunStage().subscribe({
            next: (codeRunStage: CodeRunStage) => this.codeRunStage = codeRunStage,
        });

        this.consoleOutputStore.getRunResult().subscribe({
            next: (codeRunResult: CodeRunResult | null) => {
                if (codeRunResult === null) {
                    this.codeRunOutcome = CodeRunOutcome.Unknown
                    return;
                }

                this.codeRunOutcome = codeRunResult.codeRunOutcomeId;
                this.handleRunOutcomeOutput(codeRunResult);
            },
        });
    }

  @Input() codeRunStage: CodeRunStage = CodeRunStage.Unset;
  @Input() codeRunOutcome: CodeRunOutcome = CodeRunOutcome.Unknown;
  @Input() errorFlow: TestCaseResult | CompilationError[];

  private handleRunOutcomeOutput(codeRunResult: CodeRunResult) {
      switch (codeRunResult.codeRunOutcomeId) {
      case CodeRunOutcome.CompilationError:
          return (this.errorFlow =
          this.convertToCompilationErrorOutput(codeRunResult));
      case CodeRunOutcome.TestFailed || CodeRunOutcome.RuntimeError:
          return (this.errorFlow =
          this.convertToRuntimeOrTestFailedErrorOutput(codeRunResult));
      default:
          return (this.codeRunOutcome = codeRunResult.codeRunOutcomeId!);
      }
  }

  private convertToCompilationErrorOutput(
      codeRunResult: CodeRunResult
  ): CompilationError[] {
      return codeRunResult.compilationErrors!;
  }

  private convertToRuntimeOrTestFailedErrorOutput(codeRunResult: CodeRunResult): TestCaseResult {
      const testCaseResult: TestCaseResult = codeRunResult.failedTest!;

      return testCaseResult;
  }
}
