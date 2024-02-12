import { Component, Input } from "@angular/core";

@Component({
    selector: 'challenge-list-navbar',
    templateUrl: './challenge-list-navbar.component.html',
    styleUrls: [
        '../../../shared/styles/global-elements.scss',
        './challenge-list-navbar.component.scss',
    ]
})

export class ChallengeListNavbarComponent {
    @Input() activeComponent: number = 0;
}