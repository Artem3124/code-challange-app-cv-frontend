import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  initiateFetchingCodeProblem,
} from 'src/app/main-page/store/actions/problems.actions';
import { CurrentProblemDataState, selectCodeProblem, selectProblemDataState } from 'src/app/problem-page/state/selectors/problem.selector';
import { CodeProblem } from 'src/models';

@Injectable()
export class ProblemStoreService {
  constructor(private store: Store<CurrentProblemDataState>) {}

  getProblemState(): Observable<CodeProblem | null> {
    return this.store.select(selectCodeProblem);
  }
}
