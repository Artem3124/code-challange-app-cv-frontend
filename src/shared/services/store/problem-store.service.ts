import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setVoteInitiated } from 'src/app/main-page/store/actions/problems.actions';
import { CurrentProblemDataState, selectCodeProblem, selectVotes } from 'src/app/problem-page/state/selectors/problem.selector';
import { CodeProblem, VoteRequest } from 'src/models';

@Injectable()
export class ProblemStoreService {
    constructor(private store: Store<CurrentProblemDataState>) {}

    getProblemState(): Observable<CodeProblem | null> {
        return this.store.select(selectCodeProblem);
    }

    setVote(request: VoteRequest) { 
      this.store.dispatch(setVoteInitiated({request}));
    }

    getVotes(): Observable<number[]> { 
      return this.store.select(selectVotes);
    }
}
