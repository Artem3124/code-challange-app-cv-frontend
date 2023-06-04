import { RouterModule } from "@angular/router";
import { ChallengesHomeComponent } from "./challenges-home/challenges-home.component";
import { NgModule } from "@angular/core";
import { ChallengeComponent } from "./challenge/challenge.component";
import { ChallengeCreateComponent } from "./challenge-create/challenge-create.component";
import { UserChallengesComponent } from "./user-challenges/user-challenges.component";
import { ChallengeReviewListComponent } from "./challenge-review-list/challenge-review-list.component";
import { AttemptReviewComponent } from "./attempt-review/attempt-review.component";

const routes = [
    {
        path: '',
        component: ChallengesHomeComponent,
        children: [],
    },
    {
        path: 'create',
        component: ChallengeCreateComponent,
    },
    {
        path: 'item/:id',
        component: ChallengeComponent,
    },
    {
        path: 'my',
        component: UserChallengesComponent,
    },
    {
        path: 'attempts/:id',
        component: ChallengeReviewListComponent,
    },
    {
        path: 'review/:id',
        component: AttemptReviewComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChallengesRoutingModule {}
