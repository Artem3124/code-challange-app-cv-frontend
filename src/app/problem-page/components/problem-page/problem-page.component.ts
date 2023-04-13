import { AfterViewInit, Component, OnInit } from '@angular/core';
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
import { Dictionary } from 'src/shared/data-types/dictionary.data-type';
import { CodeSubmissionHttpService } from 'src/shared/services/http/code-submission.service';
import { CodeTemplateHttpService } from 'src/shared/services/http/code-template.service';
import { CodeRunsStoreService } from 'src/shared/services/store/code-runs-store.service';
import { CodeTemplateStoreService } from 'src/shared/services/store/code-template.service';
import { ProblemListStoreService } from 'src/shared/services/store/problem-list-store.service';
import { ProblemStoreService } from 'src/shared/services/store/problem-store.service';
import { SourceCodeStoreService } from 'src/shared/services/store/source-code-store.service';

@Component({
  selector: 'problem-page-component',
  templateUrl: './problem-page.component.html',
  styleUrls: [
    './problem-page.component.scss',
    '../../../../shared/styles/global-elements.scss',
  ],
})
export class ProblemPageComponent implements OnInit, AfterViewInit {
  constructor(
    private codeSubmissionHttp: CodeSubmissionHttpService,
    private router: Router,
    private problemDataStore: ProblemStoreService,
    private problemStore: ProblemListStoreService,
    private sourceCodeStore: SourceCodeStoreService,
    private codeTemplateStore: CodeTemplateStoreService,
  ) {
    this.codeTemplateStore.initiateCodeTemplatesGetting(this.codeProblemUUID);
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
  activeComponent: string = this.router.url.slice(46, 49);
  sourceCode: string;
  codeRunStage: CodeRunStage = CodeRunStage.Unset;
  codeRunOutcome: CodeRunOutcome = CodeRunOutcome.Unknown;
  currentLanguage: CodeLanguage = CodeLanguage.csharp;
  outputErrorView: CompilationError[] | TestCaseResult;
  codeProblemState: CodeProblem;
  descriptionCodeProblemState: ProblemDescriptionView;
  awaitingForSubmissionResults: boolean = false;

  ngOnInit(): void {
    this.subscribeSourceCode(this.currentLanguage);
    this.subscribeCodeProblem();
  }

  ngAfterViewInit(): void {
    this.getCodeTemplateOrSetExisting();
  }
  
  private subscribeCodeProblem() {
    this.problemDataStore.getProblemState().subscribe(
      {
        next: (problem: CodeProblem | null) => { 
          if (problem === null) { 
            return;
          }

          this.codeProblemState = problem;
        }
      }
    )
  }

  private subscribeSourceCode(codeLanguage: CodeLanguage) { 
    this.sourceCodeStore.getSourceCode().subscribe({
      next: (sourceCodeDict) => { 
        if (sourceCodeDict === null) { 
          return;
        }
        this.sourceCode = sourceCodeDict[codeLanguage]
      }
    })
  }

  getCodeTemplateOrSetExisting() {
    var savedSourceCode = localStorage.getItem(this.currentLanguage.toString());
    
    if (savedSourceCode)
    {
      this.codeTemplateObserver.next(savedSourceCode);
      return;
    }

    this.codeTemplateStore.getCodeTemplates().subscribe({
      next: (templates: Dictionary<string> | null) => {
        if (templates === null) { 
          return;
        }

        this.codeTemplateObserver.next(templates[this.currentLanguage]);
      },
      error: (err: Error) => console.error(err)
    })
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
    this.codeRunStage = CodeRunStage.Queued;

    console.log(this.codeProblemState)

    var codeSubmissionRequest = {
      codeProblemUUID: this.codeProblemState.uuid,
      codeLanguage: this.currentLanguage,
      sourceCode: this.sourceCode,
      runType: runType,
    };

    console.log(codeSubmissionRequest);

    this.codeSubmissionHttp.submitCode(codeSubmissionRequest).subscribe({
      next: (data: string) => {
        this.codeRunOutcome = CodeRunOutcome.Unknown;

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

  setActive(componentName: string) { 
    this.activeComponent = componentName;
  }
}
