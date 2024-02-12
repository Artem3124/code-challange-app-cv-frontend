import { Component, Input } from '@angular/core';

@Component({
    selector: 'tag-component',
    templateUrl: './problem-tag.component.html',
    styleUrls: ['./problem-tag.component.scss', '../../shared/styles/fonts.scss'],
}) 
export class ProblemTagComponent {
    constructor() {}

  @Input() tagName: string[];
}
