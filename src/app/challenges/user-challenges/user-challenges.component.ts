import { Component, OnInit } from "@angular/core";
import { Challenge } from "src/models";
import { ChallengeService } from "src/shared/services/http/challenge.service";
import { AuthStoreService } from "src/shared/services/store/auth-store.service";

@Component({
    selector: 'user-challenges',
    templateUrl: './user-challenges.component.html',
    styleUrls: [
        '../../../shared/styles/fonts.scss',
        '../../../shared/styles/global-elements.scss',
    ]
})

export class UserChallengesComponent implements OnInit {
    challenges: Challenge[];

    constructor(
        private authStore: AuthStoreService,
        private challengeService: ChallengeService,
    ) {

    }

    ngOnInit(): void {
        this.authStore.getUser()
            .subscribe({
                next: user => {
                    this.challengeService.getAll()
                    .subscribe({
                        next: res => this.challenges = res.filter(c => c.hostUUID === user?.uuid),
                    });
                }
            })

    }

    selectChallenge(challenge: Challenge): void {

    }
}