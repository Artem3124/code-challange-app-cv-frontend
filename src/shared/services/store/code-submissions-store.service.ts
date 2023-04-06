import { Injectable } from "@angular/core";
import { CodeSubmissionHttpService } from "../http/code-submission.service";
import { CurrentProblemState, selectSubmissionProblemHistory } from "src/app/problem-page/state";
import { Store } from "@ngrx/store";
import { initiateGetCodeRunsHistory } from "src/app/problem-page/state/actions/code-runs.actions";
import { CodeRunResultExpanded } from "src/models";
import { Observable } from "rxjs";

@Injectable()
export class CodeRunsStoreService { 

  private submissionHistory$: Observable<CodeRunResultExpanded[]> = this.store.select(selectSubmissionProblemHistory)

  constructor(private codeSubmissionHttp: CodeSubmissionHttpService, private store: Store<CurrentProblemState>) {}

  initiateGettingCodeSubmissions(problemUUID: string) { 
    this.store.dispatch(initiateGetCodeRunsHistory({ codeProblemUUID: problemUUID }))
  }

  getSubmissionHistory() { 
    this.store.select(selectSubmissionProblemHistory);
  }
}