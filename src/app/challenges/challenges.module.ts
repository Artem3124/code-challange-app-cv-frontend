import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengesRoutingModule } from './challenges-routing';
import { PageHeaderModule } from '../page-header/page-header.component';
import { ChallengesHomeComponent } from './challenges-home/challenges-home.component';
import { ChallengesListComponent } from './challenges-list/challenges-list.component';
import { ChallengesListItemComponent } from './challenges-list/challenges-list-item/challenges-list-item.component';
import { ProblemPageModule } from '../problem-page/problem-page.module';
import { ChallengeStateIconPipe } from './challenges-list/challenges-list-item/challenge-state-icon.pipe';
import { ChallengesFilterComponent } from './challenges-list/challenges-filter/challenges-filter.component';
import { FindIconModule } from 'src/assets/svg/find-icon/find-icon.component';
import { CodeLanguageToString } from './challenges-list/code-language-tag/code-language-to-string.pipe';
import { CodeLanguageTagComponent } from './challenges-list/code-language-tag/code-language-tag.component';
import { ChallengeTimerComponent } from './challenge-timer/challenge-timer.component';
import { MinutesToDateTimePipe } from './challenges-list/challenges-list-item/minutes-to-datetime.pipe';
import { ChallengeComponent } from './challenge/challenge.component';
import { ChallengeCodeEditorComponent } from './challenge-code-editor/challenge-code-editor.component';
import { RouterModule } from '@angular/router';
import { ChallengeCreateComponent } from './challenge-create/challenge-create.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ChallengeEditorComponent } from './challenge-editor/challenge-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ParameterInputComponent } from './parameter-input/parameter-input.component';
import { TypeInputComponent } from './type-input/type-input.component';
import { UserListItem } from './user-list-item/user-list-item.component';
import { UserList } from './user-list/user-list';
import { ChallengeListNavbarComponent } from './challenge-list-navbar/challenge-list-navbar.component';
import { UserChallengesComponent } from './user-challenges/user-challenges.component';
import { ChallengeReviewListComponent } from './challenge-review-list/challenge-review-list.component';
import { ChallengeReviewListItemComponent } from './challenge-review-list/challenge-review-list-item/challenge-review-list-item.component';
import { AttemptStateIconPipe } from './challenge-review-list/challenge-review-list-item/attempt-state-icon.pipe';
import { AttemptReviewComponent } from './attempt-review/attempt-review.component';

@NgModule({
  declarations: [
    ChallengesHomeComponent,
    ChallengesListComponent,
    ChallengesListItemComponent,
    ChallengeStateIconPipe,
    CodeLanguageToString,
    CodeLanguageTagComponent,
    ChallengesFilterComponent,
    ChallengeTimerComponent,
    MinutesToDateTimePipe,
    ChallengeComponent,
    ChallengeCodeEditorComponent,
    ChallengeCreateComponent,
    ChallengeEditorComponent,
    ParameterInputComponent,
    TypeInputComponent,
    UserListItem,
    UserList,
    ChallengeListNavbarComponent,
    UserChallengesComponent,
    ChallengeReviewListComponent,
    ChallengeReviewListItemComponent,
    AttemptStateIconPipe,
    AttemptReviewComponent,
  ],
  imports: [
    CommonModule,
    ChallengesRoutingModule,
    PageHeaderModule,
    ProblemPageModule,
    FindIconModule,
    RouterModule,
    CKEditorModule,
    ReactiveFormsModule,
  ]
})
export class ChallengesModule { }
