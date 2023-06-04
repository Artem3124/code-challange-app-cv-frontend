import { Component, Input, OnInit } from "@angular/core";
import { ChallengeAttempt, User } from "src/models";

@Component({
    selector: 'challenge-review-list-item',
    templateUrl: './challenge-review-list-item.component.html',
    styleUrls: [
        '../../../../shared/styles/custom-form.scss',
        '../../../../shared/styles/global-elements.scss',
        './challenge-review-list-item.component.scss'
    ]
})

export class ChallengeReviewListItemComponent implements OnInit {
    @Input() user: User;
    @Input() attempt: ChallengeAttempt;

    ngOnInit(): void {
        
    }
}
