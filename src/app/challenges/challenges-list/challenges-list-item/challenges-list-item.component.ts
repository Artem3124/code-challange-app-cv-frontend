import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import dayjs from "dayjs";
import { Location } from '@angular/common'; 

import { Challenge, ChallengeSubmitState } from "src/models";
import { ChallengeService } from "src/shared/services/http/challenge.service";
import { ChallengeStoreService } from "../../state/challenge-store.service";

@Component({
    selector: 'challenges-list-item',
    templateUrl: './challenges-list-item.component.html',
    styleUrls: [
        './challenges-list-item.component.scss',
        '../../../../shared/styles/custom-form.scss',
        '../../../../shared/styles/global-elements.scss'
    ],
})

export class ChallengesListItemComponent implements OnInit {
    @Input() view = 0;
    @Input() challenge: Challenge;
    @Input() userUUID: string;

    @Output() onOpen: EventEmitter<Challenge> = new EventEmitter<Challenge>();

    @ViewChild('test') modal: any;
    labelId: string;
    modalId: string;

    showModal: boolean = false;
    constructor (
        private router: Router,
        private modalService: NgbModal,
        private challengeService: ChallengeService,
    ) {}

    ngOnInit(): void {
        this.labelId = `attendanceConfirmationModalLabel${this.challenge.uuid}`;
        this.modalId = `attendanceConfirmationModal${this.challenge.uuid}`;
    }

    isVisible(challenge: Challenge): boolean {
        return !challenge.isPrivate || (!!challenge.allowedUsers && challenge.allowedUsers.includes(this.userUUID));
    }

    isInProgress(): boolean {
        return !!this.challenge.userAttempt;
    }

    isDisabled(): boolean {
        if (!this.challenge.userAttempt) {
            return false;
        }
        
        return dayjs(this.challenge.userAttempt.startedDateTimeUtc).utc().add(this.challenge.timeLimitMinutes, 'minute').isBefore(dayjs().utc())
            || !!this.challenge.userAttempt.submittedDateTimeUtc;
    }

    open(content: any): void {
        if (!this.isInProgress()) {
            this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
        }
        else {
            this.start(null);
        }
    }

    start(modal: any): void {
        if (!this.isInProgress()) {
            this.challengeService.start(this.challenge.uuid).subscribe();
        }

        modal?.close();

        this.router.navigate([this.getNavigationRoute(), this.challenge.uuid]);
        this.onOpen.emit(this.challenge);
    }

    waitingForReview(): number {
        return this.challenge?.attempts?.filter(c => c.state === ChallengeSubmitState.InReview)?.length;
    }

    getNavigationRoute(): string {
        return this.view === 0 ? './challenges/item' : './challenges/attempts';
    }
}
