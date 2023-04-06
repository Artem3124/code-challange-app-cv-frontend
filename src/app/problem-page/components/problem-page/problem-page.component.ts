import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, map } from 'rxjs';
import {
  CodeProblem,
  CodeRunProgress,
  CodeRunResult,
  CompilationError,
  TestCaseResult,
} from 'src/models';
import { CodeRunOutcome } from 'src/models/enums/code-run-outcome.enum';
import { CodeRunStage } from 'src/models/enums/code-run-stage.enum';
import CodeLanguage from 'src/models/enums/coding-languages.enum';
import { ConsoleOutputType } from 'src/models/enums/console-output-type.enum';
import { RunType } from 'src/models/enums/run-type.enum';
import ProblemDescriptionView from 'src/models/view/problem-description-view.model';
import { CodeProblemHttpService } from 'src/shared/services/http/code-problem.service';
import { CodeSubmissionHttpService } from 'src/shared/services/http/code-submission.service';
import { CodeTemplateHttpService } from 'src/shared/services/http/code-template.service';
import { ProblemStoreService } from 'src/shared/services/store/problem-store.service';
import { CurrentProblemState, selectCodeProblemState } from '../../state';

@Component({
  selector: 'problem-page-component',
  templateUrl: './problem-page.component.html',
  styleUrls: [
    './problem-page.component.scss',
    '../../../../shared/styles/global-elements.scss',
  ],
})
export class ProblemPageComponent implements OnInit {
  constructor(
    private codeProblemHttp: CodeProblemHttpService,
    private codeSubmissionHttp: CodeSubmissionHttpService,
    private codeTemplateHttp: CodeTemplateHttpService,
    private router: Router,
    private problemStore: ProblemStoreService,
  ) {}

  readonly codeProblemUUID: string = this.router.url.slice(-36);

  currentLanguageObserver: Subject<CodeLanguage> =
    new Subject<CodeLanguage>();
  codeTemplateObserver: Subject<string> = new Subject<string>();

  availableLanguages: Array<CodeLanguage> = [
    CodeLanguage.csharp,
    CodeLanguage.javascript,
    CodeLanguage.c_cpp,
  ];

  codeProblemState: CodeProblem;
  descriptionCodeProblemState: ProblemDescriptionView;
  sourceCode: string;
  currentLanguage: CodeLanguage;
  awaitingForSubmissionResults: boolean = false;
  codeRunStage: CodeRunStage = CodeRunStage.Unset;
  codeRunOutcome: CodeRunOutcome = CodeRunOutcome.Unknown;
  outputErrorView: CompilationError[] | TestCaseResult;

  ngOnInit(): void {
    console.log(this.codeProblemUUID);
    this.fetchCodeProblem(this.codeProblemUUID);
    this.getCodeTemplate(this.codeProblemUUID);
  }

  getCodeTemplate(codeProblemUUID: string) {
    this.codeTemplateHttp.getCodeTemplate(codeProblemUUID, 1).subscribe({
      next: (codeTemplate: any) => {
        console.log(codeTemplate);
        this.sourceCode = codeTemplate;
        this.codeTemplateObserver.next(codeTemplate.template);
      },
      error: (err: Error) => console.error(err),
    });
  }

  fetchCodeProblem(codeProblemUUID: string): void {
    this.problemStore.getProblemState().subscribe({
      next: (response: CodeProblem) => {
        console.log(response);
        this.codeProblemState = response;
        this.descriptionCodeProblemState = this.convertToDescription(
          this.codeProblemState
        );
        console.log(this.descriptionCodeProblemState);
      },
      error: (err: Error) => {
        console.error(err);
      },
    });

    

    // this.codeProblemHttp
    //   .getCodeProblem(codeProblemUUID)
    //   .subscribe({
    //     next: (response: CodeProblem) => {
    //       console.log(response);
    //       this.codeProblemState = response;
    //       this.descriptionCodeProblemState = this.convertToDescription(
    //         this.codeProblemState
    //       );
    //       console.log(this.descriptionCodeProblemState);
    //     },
    //     error: (err: Error) => {
    //       console.error(err);
    //     },
    //   });
  }

  setCurrentLanguage(language: CodeLanguage) {
    console.log(CodeLanguage[language]);
    this.currentLanguage = language;
    this.currentLanguageObserver.next(language);
  }

  setSourceCodeState(codeEditorState: string) {
    console.log(codeEditorState);
    this.sourceCode = codeEditorState;
  }

  submitCode(runType: RunType) {
    this.awaitingForSubmissionResults = true;

    var codeSubmissionRequest = {
      codeProblemUUID: this.codeProblemState.uuid,
      codeLanguage: this.currentLanguage,
      sourceCode: this.sourceCode,
      runType: runType,
    };

    console.log(codeSubmissionRequest);

    this.codeSubmissionHttp.submitCode(codeSubmissionRequest).subscribe({
      next: (data: string) => {
        console.log(data);
        if (!data) {
          throw new Error();
        }

        var getRunStatusInterval = setInterval(() => {
          this.codeSubmissionHttp.checkSubmissionStatus(data).subscribe({
            next: (data: CodeRunProgress) => {
              console.log(data);

              this.codeRunStage = data.stage;

              if (data.result && this.codeRunStage === CodeRunStage.Completed) {
                console.log('result exists');
                this.codeRunOutcome = data.result.codeRunOutcomeId;
                this.handleRunOutcomeOutput(data);
                return clearInterval(getRunStatusInterval);
              }
            },
            error: (err: Error) => {
              console.error(err);
            },
          });
        }, 1000);
      },
      error: (err: Error) => {
        console.error(err);
      },
    });
  }

  handleRunOutcomeOutput(codeRunProgress: CodeRunProgress) {
    switch (codeRunProgress.result?.codeRunOutcomeId) {
      case CodeRunOutcome.CompilationError:
        return (this.outputErrorView = this.convertToCompilationErrorOutput(
          codeRunProgress.result
        ));
      case CodeRunOutcome.TestFailed && CodeRunOutcome.RuntimeError:
        return (this.outputErrorView = this.convertToRuntimeErrorOutput(
          codeRunProgress.result
        ));
      default:
        return (this.codeRunOutcome =
          codeRunProgress.result?.codeRunOutcomeId!);
    }
  }

  convertToCompilationErrorOutput(
    codeRunResult: CodeRunResult
  ): CompilationError[] {
    return codeRunResult.compilationErrors!;
  }

  convertToRuntimeErrorOutput(codeRunResult: CodeRunResult): TestCaseResult {
    var testCaseResult: TestCaseResult = codeRunResult.failedTest!;

    testCaseResult.actual = codeRunResult.exceptionMessage!;

    return testCaseResult;
  }

  private convertToDescription(
    codeProblem: CodeProblem
  ): ProblemDescriptionView {
    console.log(codeProblem);

    return {
      problemComplexity: codeProblem.complexityTypeId,
      title: codeProblem.name,
      body: codeProblem.description,
      sampleInput: codeProblem.examples[0].input,
      sampleOutput: codeProblem.examples[0].output,
      constraints: codeProblem.constraints.join('\n'),
      tags: codeProblem.tags,
    };
  }
}
