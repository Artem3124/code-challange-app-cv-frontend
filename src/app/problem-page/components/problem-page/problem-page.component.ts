import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
    CodeProblem,
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
import { AuthStoreService } from 'src/shared/services/store/auth-store.service';
import { CodeTemplateStoreService } from 'src/shared/services/store/code-template.service';
import { ConsoleOutputStoreService } from 'src/shared/services/store/console-output-store.service';
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
export class ProblemPageComponent implements OnInit, AfterViewInit, OnDestroy {
    constructor(
    private codeSubmissionHttp: CodeSubmissionHttpService,
    private router: Router,
    private problemDataStore: ProblemStoreService,
    private problemStore: ProblemListStoreService,
    private sourceCodeStore: SourceCodeStoreService,
    private codeTemplateStore: CodeTemplateStoreService,
    private consoleOutputStore: ConsoleOutputStoreService,
    ) {
        this.codeTemplateStore.initiateCodeTemplatesGetting(this.codeProblemUUID);
        this.problemStore.findProblem(this.codeProblemUUID);
    }
    ngOnDestroy(): void {
        localStorage.clear();// make the dictionary of problems with dictionary of languages for each problemuuid included
    }

    readonly codeProblemUUID: string = this.router.url.slice(9, 45);

    currentLanguageObserver: Subject<CodeLanguage> = new Subject<CodeLanguage>();
    codeTemplateObserver: Subject<string> = new Subject<string>();

    availableLanguages: Array<CodeLanguage> = [];
    activeComponent: string = this.router.url.slice(46, 49);
    sourceCode: string;
    codeRunStage: CodeRunStage = CodeRunStage.Unset;
    codeRunOutcome: CodeRunOutcome = CodeRunOutcome.Unknown;
    currentLanguage: CodeLanguage = CodeLanguage.csharp;
    outputErrorView: CompilationError[] | TestCaseResult;
    codeProblemState: CodeProblem;
    descriptionCodeProblemState: ProblemDescriptionView;
    awaitingForSubmissionResults = false;

    ngOnInit(): void {
        this.subscribeSourceCode(this.currentLanguage);
        this.subscribeCodeProblem();
    }

    ngAfterViewInit(): void {
        this.getCodeTemplateOrSetExisting();
    }

    private subscribeCodeProblem() {
        this.problemDataStore.getProblemState().subscribe({
            next: (problem: CodeProblem | null) => {
                if (problem === null) {
                    return;
                }

                this.codeProblemState = problem;
            },
        });
    }

    private subscribeSourceCode(codeLanguage: CodeLanguage) {
        this.sourceCodeStore.getSourceCode().subscribe({
            next: (sourceCodeDict) => {
                if (sourceCodeDict === null) {
                    return;
                }
                this.sourceCode = sourceCodeDict[codeLanguage];
            },
        });
    }

    getCodeTemplateOrSetExisting() {
        const savedSourceCode = localStorage.getItem(this.currentLanguage.toString());

        this.codeTemplateStore.getCodeTemplates().subscribe({
            next: (templates: Dictionary<string> | null) => {
                if (templates === null) {
                    return;
                }

                this.availableLanguages = Object.keys(templates).map(
                    (language: number | string): number => {
                        return parseInt(language as string);
                    }
                );

                console.log(this.availableLanguages);

                if (savedSourceCode) {
                    this.codeTemplateObserver.next(savedSourceCode);
                    return;
                }

                this.codeTemplateObserver.next(templates[this.currentLanguage]);
            },
            error: (err: Error) => console.error(err),
        });
    }

    redirectTo(route: string) {
        this.router.navigate([route]);
    }

    setCurrentLanguage(language: CodeLanguage) {
        this.subscribeSourceCode(language);
        this.currentLanguage = language;
        this.currentLanguageObserver.next(language);
    }

    setSourceCodeState(codeEditorState: string) {
        this.sourceCodeStore.setSourceCodeState(
            codeEditorState,
            this.currentLanguage
        );
    }

    submitCode(runType: RunType) {
        this.consoleOutputStore.defaultResultView(); // check wheather it works properly or not 
        this.codeRunStage = CodeRunStage.Queued;
        const codeSubmissionRequest = {
            codeProblemUUID: this.codeProblemState.uuid,
            codeLanguage: this.currentLanguage,
            sourceCode: this.sourceCode,
            runType: runType,
        };

        console.log(codeSubmissionRequest);

        this.codeSubmissionHttp.submitCode(codeSubmissionRequest).subscribe({
            next: (problemUUID: string) => {
                this.codeRunOutcome = CodeRunOutcome.Unknown;

                if (!problemUUID) {
                    throw new Error();
                }

                const getRunStatusInterval = setInterval(() => {
                    this.consoleOutputStore.initializeGettingCodeRunProgress(problemUUID);
                }, 1000);

                this.consoleOutputStore.getRunResult().subscribe({
                    next: (codeRunResult: CodeRunResult | null) => {
                        console.log('subsc');

                        if (codeRunResult !== null) {
                            return clearInterval(getRunStatusInterval);
                        }
                    },
                });
            },
            error: (err: Error) => {
                console.error(err);
            },
        });
    }

    setActive(componentName: string) {
        this.activeComponent = componentName;
    }
}
