import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrentProblemDataState, selectCodeProblem } from 'src/app/problem-page/state/selectors/problem.selector';
import { CodeProblem } from 'src/models';

@Injectable()
export class ProblemStoreService {
    constructor(private store: Store<CurrentProblemDataState>) {}

    getProblemState(): Observable<CodeProblem | null> {
        return this.store.select(selectCodeProblem);
    }
}
