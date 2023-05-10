import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { MainPageState, getProblemList } from "src/app/main-page/store";
import { initiateFetchingProblemList, insertDataToProblemState, searchProblem } from "src/app/main-page/store/actions/problems.actions";
import { CodeProblem } from "src/models";

@Injectable()
export class ProblemListStoreService {
  constructor(private store: Store<MainPageState>) {}

  private problemListState$: Observable<CodeProblem[]> = this.store.select(getProblemList);

  sendProblemState(codeProblem: CodeProblem) { 
    this.store.dispatch(insertDataToProblemState({problem: codeProblem}));
  }

  findProblem(uuid: string) { 
    return this.store.dispatch(searchProblem({problemUUID: uuid}));
  }

  initiateProblemListFetching() { 
    return this.store.dispatch(initiateFetchingProblemList());
  }

  getProblemList(): Observable<CodeProblem[]> { 
    return this.problemListState$;
  }
}