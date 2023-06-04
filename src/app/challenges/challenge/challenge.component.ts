import { AfterViewInit, Component, HostBinding, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import dayjs from "dayjs";
import { Observable, Subject, of } from "rxjs";
import { Challenge, ChallengeAttempt, ChallengeSubmitRequest, CodeRunResult, CodeSubmission, CompilationError, TestCaseResult } from "src/models";
import CodeLanguage from "src/models/enums/coding-languages.enum";
import { ChallengeService } from "src/shared/services/http/challenge.service";
import { CodeTemplateHttpService } from "src/shared/services/http/code-template.service";
import { ChallengeStoreService } from "../state/challenge-store.service";
import { RunType } from "src/models/enums/run-type.enum";
import { CodeRunStage } from "src/models/enums/code-run-stage.enum";
import { CodeRunOutcome } from "src/models/enums/code-run-outcome.enum";
import { CodeSubmissionHttpService } from "src/shared/services/http/code-submission.service";
import { ConsoleOutputStoreService } from "src/shared/services/store/console-output-store.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'challenge',
    templateUrl: './challenge.component.html',
    styleUrls: ['./challenge.component.scss', '../../../shared/styles/global-elements.scss']
})

export class ChallengeComponent implements OnInit, AfterViewInit {
    @HostBinding('style') display = 'display: grid'; 
    @Input() challenge: Challenge;

    @ViewChild('submitConfirmationModal') submitConfirmationModal: any;

    $selectedCodeLanguage: Subject<CodeLanguage> = new Subject<CodeLanguage>();
    $codeTemplate: Subject<string> = new Subject<string>();
    codeTemplates: { [key: string]: string } = {};
    sourceCode: string;
    outputErrorView: CompilationError[] | TestCaseResult;
    codeRunOutcome: CodeRunOutcome;
    codeRunStage: CodeRunStage;
    selectedCodeLanguage: CodeLanguage;

    constructor(
        private codeSubmissionService: CodeSubmissionHttpService,
        private activatedRoute: ActivatedRoute,
        private codeTemplatesService: CodeTemplateHttpService,
        private challengeService: ChallengeService,
        private consoleOutputStore: ConsoleOutputStoreService,
        private modalService: NgbModal,
        private router: Router,
    ) {}

    ngOnInit(): void {
        if (this.challenge) {
            this.codeTemplatesService.getCodeTemplatesForChallenge(this.challenge.uuid)
                .subscribe({
                    next: res => {
                        console.log({res});
                        res?.forEach(t => this.codeTemplates[t.codeLanguage] = t.template);
                        this.sourceCode = this.challenge.userAttempt?.sourceCode ?? '';
                        if (this.challenge.userAttempt && this.challenge.userAttempt.codeLanguage > 0) {
                            this.onCodeLanguageChange(this.challenge.userAttempt?.codeLanguage);
                        }
                        else {
                            this.onCodeLanguageChange(this.challenge.allowedLanguages[0]);
                        }
                    },
                });
        } else
        this.activatedRoute.paramMap.subscribe({
            next: res => {
                const id = res.get('id');
                if (!id) {
                    return;
                }
                this.challengeService.getAll().subscribe({
                    next:c => {
                        const challenge = c?.find(c => c.uuid === id);
                        if (!challenge) {
                            return;
                        }
                        this.challenge = challenge;
                        this.codeTemplatesService.getCodeTemplatesForChallenge(id)
                        .subscribe({
                            next: res => {
                                res?.forEach(t => this.codeTemplates[t.codeLanguage] = t.template);
                                this.sourceCode = challenge.userAttempt?.sourceCode ?? '';
                                if (challenge.userAttempt && challenge.userAttempt.codeLanguage > 0) {
                                    this.onCodeLanguageChange(challenge.userAttempt?.codeLanguage);
                                }
                                else {
                                    this.onCodeLanguageChange(this.challenge.allowedLanguages[0]);
                                }
                            },
                        });
                    }
                });
            }
        })
    }

    ngAfterViewInit(): void {
        
    }

    onCodeLanguageChange(codeLanguage: CodeLanguage): void {
        if (this.selectedCodeLanguage === codeLanguage) {
            return;
        }

        this.$selectedCodeLanguage.next(codeLanguage);
        const code = this.challenge.userAttempt?.sourceCode?.length && this.challenge.userAttempt?.codeLanguage === codeLanguage
            ? this.challenge.userAttempt.sourceCode
            : this.codeTemplates[codeLanguage];
        this.$codeTemplate.next(code);
        this.selectedCodeLanguage = codeLanguage;
    }

    onSourceCodeUpdated(value: string): void {
        this.sourceCode = value;
    }

    isDisabled(): boolean {
        return !!this.challenge?.userAttempt?.submittedDateTimeUtc;
    }

    onTimeOut(): void {
        if (!this.challenge.userAttempt?.submittedDateTimeUtc) {
            this.submitChallenge().subscribe();
        }
    }

    submitChallenge(): Observable<void> {
        const payload: ChallengeSubmitRequest = {
            challengeUUID: this.challenge.uuid,
            sourceCode: this.sourceCode,
            codeLanguage: this.selectedCodeLanguage,
        }
        return this.challengeService.submit(payload);
    }

    confirm(runType: RunType) {
        if (runType === RunType.Submit) {
            this.open(this.submitConfirmationModal);
        }
        else {
            this.submitCode(runType);
        }
    }

    closeModalAndSubmit(modal: any): void {
        modal.close();
        this.submitCode(RunType.Submit);
    }

    open(content: any): void {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    submitCode(runType: RunType) {

        this.consoleOutputStore.defaultResultView();
        this.codeRunStage = CodeRunStage.Queued;
        const codeSubmissionRequest: CodeSubmission = {
            codeProblemUUID: this.challenge.uuid,
            codeLanguage: this.selectedCodeLanguage,
            sourceCode: this.sourceCode,
            runType: runType,
        };        
        this.codeSubmissionService.submitChallengeCode(codeSubmissionRequest).subscribe({
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
                        if (codeRunResult !== null) {
                            if (codeRunResult.codeRunOutcomeId !== CodeRunOutcome.CompilationError || this.challenge.allowInvalidSyntaxSubmit) {
                                this.submitChallenge().subscribe();
                                setTimeout(() => this.router.navigate(['./challenges']), 2000); 
                            }

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
}