import { Component, OnInit } from "@angular/core";
import { Challenge } from "src/models";
import CodeLanguage from "src/models/enums/coding-languages.enum";
import { ChallengeService } from "src/shared/services/http/challenge.service";
import { CodeLanguageService } from "src/shared/services/http/code-language.service";
import { ChallengeStoreService } from "../state/challenge-store.service";

@Component({
    selector: 'challenges-home',
    templateUrl: './challenges-home.component.html'
})

export class ChallengesHomeComponent implements OnInit {

    selectedChallenge: Challenge;
    challenges: Challenge[];
    codeLanguages: CodeLanguage[] = [];

    constructor (
        private codeLanguagesService: CodeLanguageService,
        private challengeService: ChallengeService,
        private challengeStoreService: ChallengeStoreService,
    ) {}

    ngOnInit(): void {
        this.codeLanguagesService.get()
            .subscribe({
                next: res => this.codeLanguages = res,
            });
        this.challengeService.getAll()
            .subscribe({
                next: c => {
                    this.challengeStoreService.set(c);
                    this.challenges = c;
                },
            });
    }

    onChallengeSelected(challenge: Challenge): void {
        this.selectedChallenge = challenge;
    }
}
