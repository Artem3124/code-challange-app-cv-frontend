import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Challenge, ChallengeAttempt, User } from "src/models";
import { ChallengeService } from "src/shared/services/http/challenge.service";
import { UserService } from "src/shared/services/http/user.service";

@Component({
    selector: 'challenge-review-list',
    templateUrl: 'challenge-review-list.component.html',
    styleUrls: [
        '../../../shared/styles/custom-form.scss',
        '../../../shared/styles/global-elements.scss',
    ]
})

export class ChallengeReviewListComponent implements OnInit {
    challenge: Challenge;
    users: User[];
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private challengeService: ChallengeService,
        private userService: UserService,
    ) {

    }

    ngOnInit(): void {
        this.userService.get()
            .subscribe({
                next: res => this.users = res,
            })
        this.activatedRoute.paramMap.subscribe({
            next: res => {
                const id = res.get('id');
                if (!id) {
                    return;
                }
                this.challengeService.get(id)
                    .subscribe({
                        next: c => this.challenge = c,
                    })
            }
        })
    }

    getUser(attempt: ChallengeAttempt): User {
        return this.users?.find(u => u.uuid === attempt.userUUID) as User;
    }
}