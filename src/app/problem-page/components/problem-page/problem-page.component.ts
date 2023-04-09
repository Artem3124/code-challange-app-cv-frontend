import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
  CodeProblem,
  CodeProblemTemplate,
  CodeRunProgress,
  CodeRunResult,
  CompilationError,
  TestCaseResult,
} from 'src/models';
import { CodeRunOutcome } from 'src/models/enums/code-run-outcome.enum';
import { CodeRunStage } from 'src/models/enums/code-run-stage.enum';
import CodeLanguage from 'src/models/enums/coding-languages.enum';
import { RunType } from 'src/models/enums/run-type.enum';
import ProblemDescriptionView from 'src/models/view/problem-description-view.model';
import { CodeProblemHttpService } from 'src/shared/services/http/code-problem.service';
import { CodeSubmissionHttpService } from 'src/shared/services/http/code-submission.service';
import { CodeTemplateHttpService } from 'src/shared/services/http/code-template.service';
import { CodeRunsStoreService } from 'src/shared/services/store/code-runs-store.service';
import { ProblemListStoreService } from 'src/shared/services/store/problem-list-store.service';
import { SourceCodeStoreService } from 'src/shared/services/store/source-code.service';

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
    private codeSubmissionHttp: CodeSubmissionHttpService,
    private codeTemplateHttp: CodeTemplateHttpService,
    private router: Router,
    private problemStore: ProblemListStoreService,
    private runsStore: CodeRunsStoreService,
    private sourceCodeStore: SourceCodeStoreService,
  ) {
    this.runsStore.initiateGettingCodeSubmissions(this.codeProblemUUID);
    this.problemStore.findProblem(this.codeProblemUUID);
  }

  readonly codeProblemUUID: string = this.router.url.slice(9, 45);

  currentLanguageObserver: Subject<CodeLanguage> =
    new Subject<CodeLanguage>();
  codeTemplateObserver: Subject<string> = new Subject<string>();

  availableLanguages: Array<CodeLanguage> = [
    CodeLanguage.csharp,
    CodeLanguage.javascript,
    CodeLanguage.c_cpp,
  ];

  sourceCode: string;
  codeRunStage: CodeRunStage = CodeRunStage.Unset;
  codeRunOutcome: CodeRunOutcome = CodeRunOutcome.Unknown;
  currentLanguage: CodeLanguage;
  outputErrorView: CompilationError[] | TestCaseResult;
  codeProblemState: CodeProblem;
  descriptionCodeProblemState: ProblemDescriptionView;
  awaitingForSubmissionResults: boolean = false;

  ngOnInit(): void {
    this.subscribeSourceCode(this.currentLanguage);
    this.getCodeTemplate(this.codeProblemUUID);
  }

  private subscribeSourceCode(codeLanguage: CodeLanguage) { 
    this.sourceCodeStore.getSourceCodeState().subscribe({
      next: (sourceCodeDict) => { 
        if (sourceCodeDict === null) { 
          return;
        }

        this.sourceCode = sourceCodeDict[codeLanguage]
      }
    })
  }

  getCodeTemplate(codeProblemUUID: string) {
    this.codeTemplateHttp.getCodeTemplate(codeProblemUUID, 1).subscribe({
      next: (codeTemplate: CodeProblemTemplate) => {
        console.log(codeTemplate);
        this.sourceCode = codeTemplate.template;
        this.codeTemplateObserver.next(codeTemplate.template);
      },
      error: (err: Error) => console.error(err),
    });
  }

  redirectTo(route: string) { 
    this.router.navigate([route]);
  }

  setCurrentLanguage(language: CodeLanguage) {
    console.log(CodeLanguage[language]);
    this.currentLanguage = language;
    this.currentLanguageObserver.next(language);
  }

  setSourceCodeState(codeEditorState: string) {
    this.sourceCodeStore.setSourceCodeState(codeEditorState, this.currentLanguage);
  }

  submitCode(runType: RunType) {
    this.awaitingForSubmissionResults = true;

    var codeSubmissionRequest = {
      codeProblemUUID: this.codeProblemState.uuid,
      codeLanguage: this.currentLanguage,
      sourceCode: this.sourceCode,
      runType: runType,
    };

    this.sourceCodeStore.getSourceCodeState()

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
}
