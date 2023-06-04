import { Pipe, PipeTransform } from "@angular/core";
import { Challenge, ChallengeAttempt, ChallengeSubmitState } from "src/models";

@Pipe({
    name: 'challengeStateIcon',
})

export class ChallengeStateIconPipe implements PipeTransform {
    transform(challenge: Challenge): ChallengeStateIcon | null {
        if (!challenge?.userAttempt) {
            return null;
        }

        return this.getChallengeStateIcon(challenge.userAttempt);
    }

    getChallengeStateIcon(challenge: ChallengeAttempt): ChallengeStateIcon | null {
        if (!challenge.submittedDateTimeUtc) {
            return { name: 'clock_loader_60', color: '#457E9D', tooltip: 'In progress' };
        }
        switch (challenge.state) {
            case ChallengeSubmitState.Approved:
                return { name: 'check_circle', color: 'green', tooltip: 'Passed' };
            case ChallengeSubmitState.Rejected:
                return { name: 'cancel', color: 'red', tooltip: 'Failed' };
            case ChallengeSubmitState.InReview:
                return { name: 'schedule', color: '#457E9D', tooltip: 'In review' };
            default: return null;
        }
    }
}

export interface ChallengeStateIcon {
    name: string;
    color: string;
    tooltip: string;
}