import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { searchProblem } from "src/app/main-page/store/actions/problem-list.action";
import { CurrentProblemState, selectState, selectCodeProblemState } from "src/app/problem-page/state";
import { CodeProblem } from "src/models";

@Injectable()
export class ProblemStoreService {
  constructor(private store: Store<CurrentProblemState>) {}

  private problem$: Observable<CodeProblem> = this.store.select(selectCodeProblemState);
  
  getProblemState(): Observable<CodeProblem> { 
    return this.problem$;
  }
}