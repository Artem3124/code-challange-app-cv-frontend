import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
    initializedGettingCodeRunProgress,
    setCodeRunProgress,
    setCodeRunResult,
} from 'src/app/problem-page/state/actions/console-output.actions';
import {
    CodeRunProgressState,
    selectRunProgressState,
    selectRunResult,
    selectRunStage,
} from 'src/app/problem-page/state/selectors/console-output.selector';
import { CodeRunResult } from 'src/models';
import { CodeRunStage } from 'src/models/enums/code-run-stage.enum';

@Injectable()
export class ConsoleOutputStoreService {
    constructor(private consoleOutputStore: Store<CodeRunProgressState>) {}

    initializeGettingCodeRunProgress(problemUUID: string) {
        this.consoleOutputStore.dispatch(
            initializedGettingCodeRunProgress({ problemUUID })
        );
    }

    setRunResultView(runResult: CodeRunResult | null): void {
        return this.consoleOutputStore.dispatch(
            setCodeRunResult({ codeRunResult: runResult })
        );
    }

    getRunStage(): Observable<CodeRunStage> {
        return this.consoleOutputStore.select(selectRunStage);
    }

    getRunResult(): Observable<CodeRunResult | null> {
        return this.consoleOutputStore.select(selectRunResult);
    }

    getCodeCodeRunProgress() {
        return this.consoleOutputStore.select(selectRunProgressState);
    }

    defaultResultView() {
        return this.consoleOutputStore.dispatch(setCodeRunProgress({ codeRunProgress: {stage: CodeRunStage.Unset, result: null}}))
    }
}
