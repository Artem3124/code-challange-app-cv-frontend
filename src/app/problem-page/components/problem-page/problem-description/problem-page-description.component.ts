import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CodeProblem, VoteRequest } from 'src/models';
import ProblemDescriptionView from 'src/models/view/problem-description-view.model';
import { ProblemStoreService } from 'src/shared/services/store/problem-store.service';

@Component({
    selector: 'problem-description',
    templateUrl: 'problem-page-description.component.html',
    styleUrls: [
        'problem-page-description.component.scss',
        '../../../../../shared/styles/global-elements.scss',
        '../../../../../shared/styles/fonts.scss',
        '../../../../../shared/styles/custom-environment.scss',
    ],
})
export class ProblemPageDescriptionComponent implements OnInit {
    constructor(
    private problemPageStore: ProblemStoreService,
    ) {}

    ngOnInit(): void {
        this.problemPageStore.getProblemState().subscribe({
            next: (response: CodeProblem | null) => {
                if (response === null) {
                    return;
                }

                this.descriptionState = this.convertToDescription(response);
            },
            error: (err: Error) => console.error(err),
        });

        this.problemPageStore.getVotes().subscribe({
          next: (votes: number[]) => {
            this.descriptionState!.rating = votes[0] - votes[1];
          }
        })
    }

    private convertToDescription(
        codeProblem: CodeProblem
    ): ProblemDescriptionView {
        return {
            problemComplexity: codeProblem.complexityTypeId,
            title: codeProblem.name,
            body: codeProblem.description,
            sampleInput: codeProblem.examples[0]?.input,
            sampleOutput: codeProblem.examples[0]?.output,
            constraints: codeProblem.constraints.join('\n'),
            tags: codeProblem.tags,
            rating: codeProblem.upVotesCount - codeProblem.downVotesCount,
            uuid: codeProblem.uuid,
        };
    }

    descriptionState: ProblemDescriptionView | null;

    upVote() { 
      const request: VoteRequest = { 
        voteUp: true,
        codeProblemUUID: this.descriptionState?.uuid!
      }

      this.problemPageStore.setVote(request);
    }

    downVote() { 
      const request: VoteRequest = { 
        voteUp: false, 
        codeProblemUUID: this.descriptionState?.uuid!
      }

      this.problemPageStore.setVote(request);
    }
}
