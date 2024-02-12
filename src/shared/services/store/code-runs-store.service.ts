import { Injectable } from "@angular/core";
import { CodeSubmissionHttpService } from "../http/code-submission.service";
import { CurrentProblemState } from "src/app/problem-page/state";
import { Store } from "@ngrx/store";
import { initiateGetCodeRunsHistory, initiateGettingAllCodeSubmissions } from "src/app/problem-page/state/actions/code-runs.actions";
import { CodeRunResultExpanded } from "src/models";
import { Observable } from "rxjs";
import { CodeRunsHistoryState, selectCodeRunsHistory, selectCodeRunsState } from "src/app/problem-page/state/selectors/code-runs.selector";

@Injectable()
export class CodeRunsStoreService { 

    constructor(private store: Store<CodeRunsHistoryState>) {}

    initiateGettingCodeSubmissions(problemUUID: string) { 
        this.store.dispatch(initiateGetCodeRunsHistory({ codeProblemUUID: problemUUID }))
    }

    getSubmissionHistory(): Observable<CodeRunResultExpanded[]> { 
        return this.store.select(selectCodeRunsHistory);
    }

    initiateGettingAllCodeSubmissions() { 
        this.store.dispatch(initiateGettingAllCodeSubmissions());
    }
}