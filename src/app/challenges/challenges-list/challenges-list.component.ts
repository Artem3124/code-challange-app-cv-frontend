import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Challenge } from "src/models";
import CodeLanguage from "src/models/enums/coding-languages.enum";
import { ChallengesFilter } from "./challenges-filter/challenges-filter.component";

@Component({
    selector: 'challenges-list',
    templateUrl: './challenges-list.component.html',
    styleUrls: [
        '../../../shared/styles/fonts.scss',
        '../../../shared/styles/global-elements.scss',
    ]
})

export class ChallengesListComponent implements OnInit {
    @Input() challenges: Challenge[];
    @Input() codeLanguages: CodeLanguage[];

    @Output() onChallengeSelected: EventEmitter<Challenge> = new EventEmitter<Challenge>();

    filteredChallenges: Challenge[];

    ngOnInit(): void {
        this.clearFilter();
    }

    applyFilter(filter: ChallengesFilter): void {
        if (!filter) {
            return;
        }
        this.filteredChallenges = this.challenges;
        if (filter.name?.length) {
            this.filteredChallenges = this.filteredChallenges.filter(c => c.name.includes(filter.name));
        }

        if (filter.codeLanguages?.length) {
            this.filteredChallenges = this.filteredChallenges.filter(c => filter.codeLanguages.every(l => c.allowedLanguages.includes(l)));
        }
    }

    clearFilter(): void {
        this.filteredChallenges = this.challenges;
    }

    selectChallenge(challenge: Challenge): void {
        this.onChallengeSelected.emit(challenge);
    }
}
