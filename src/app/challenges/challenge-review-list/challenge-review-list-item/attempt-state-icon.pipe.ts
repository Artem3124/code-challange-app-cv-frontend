import { Pipe, PipeTransform } from "@angular/core";
import { ChallengeAttempt, ChallengeSubmitState } from "src/models";

@Pipe({
    name: 'attemptStateIcon'
})

export class AttemptStateIconPipe implements PipeTransform {
    transform(attempt: ChallengeAttempt) {
        switch (attempt.state) {
            case ChallengeSubmitState.Approved:
                return { name: 'check_circle', color: 'green', tooltip: 'Approved' };
            case ChallengeSubmitState.Rejected:
                return { name: 'cancel', color: 'red', tooltip: 'Rejected' };
            case ChallengeSubmitState.InReview:
                return { name: 'schedule', color: '#457E9D', tooltip: 'Waiting for review' };
            default: return null;
        }
    }
}