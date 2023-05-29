import { createReducer, on } from '@ngrx/store';
import {
  doneFetchingCodeProblem,
  getVotesCompleted,
  insertDataToProblemState,
  setVoteCompleted,
} from 'src/app/main-page/store/actions/problems.actions';
import { CurrentProblemDataState } from '../selectors/problem.selector';
import { Vote, VoteRequest } from 'src/models';

const initialState: CurrentProblemDataState = {
  codeProblem: null,
};

export const codeProblemReducer = createReducer(
  initialState,
  on(getVotesCompleted, (state, action) => {
    const problem = state.codeProblem;

    var upVotes: Vote[] = [];
    var downVotes: Vote[] = [];

    action.votes.forEach((vote) => {
      if (vote.upVote) {
        upVotes.push(vote);
      } else {
        downVotes.push(vote);
      }
    });

    console.log({ upvotes: upVotes, downvotes: downVotes });

    return {
      ...state,
      codeProblem: {
        ...problem!,
        upVotesCount: upVotes.length,
        downVotesCount: downVotes.length,
      },
    };
  }),
  on(insertDataToProblemState, doneFetchingCodeProblem, (state, action) => {
    return {
      ...state,
      codeProblem: action.problem,
    };
  })
);
