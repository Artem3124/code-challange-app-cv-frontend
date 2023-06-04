import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Challenge, ChallengeAttempt, ChallengeSubmitState, ChallengeUpdateRequest, User } from "src/models";
import { ChallengeService } from "src/shared/services/http/challenge.service";
import { UserService } from "src/shared/services/http/user.service";

@Component({
    selector: 'attempt-review',
    templateUrl: './attempt-review.component.html',
    styleUrls: [
        '../../../shared/styles/custom-form.scss',
        '../../../shared/styles/global-elements.scss',
    ]
})

export class AttemptReviewComponent implements OnInit {
    attempt: ChallengeAttempt;
    user: User;
    challenge: Challenge;
    ChallengeSubmitState = ChallengeSubmitState;

    constructor(
        private userService: UserService,
        private challengeService: ChallengeService,
        private activatedRoute: ActivatedRoute,
        private toastService: ToastrService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.activatedRoute.paramMap
            .subscribe({
                next: params => {
                    const id = params.get('id');
                    if (!id) {
                        return;
                    }

                    this.challengeService.getAttempt(id)
                        .subscribe({
                            next: res => {
                                this.attempt = res;
                                this.challengeService.getAll()
                                    .subscribe({
                                        next: c => { 
                                            this.challenge = c.find(c => c.attempts?.some(a => a.uuid === this.attempt.uuid)) as Challenge;
                                            this.challenge.userAttempt = this.attempt;
                                        }
                                    });
                                this.userService.get()
                                    .subscribe({
                                        next: users => this.user = users.find(u => u.uuid === this.attempt.userUUID) as User,
                                    });
                            }
                        });
                }
            });
    }

    back(): void {
        this.router.navigate(['/challenges/attempts/', this.challenge.uuid]);
    }

    sendFeedback(state: ChallengeSubmitState): void {
        this.challengeService.patch(this.attempt.uuid, {state})
            .subscribe({
                next: () => {
                    this.toastService.success('Feedback sent');
                    setTimeout(() => this.back(), 2000);
                },
                error: () => this.toastService.error('Unknown error'),
            });
    }
}